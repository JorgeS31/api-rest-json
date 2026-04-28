export default class WeatherAPI {
    constructor() {
       
        this.apiKey = '366095b38e377da219b0d81eb3837b8e'
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
        this.isTestMode = false; //
        this.language = 'es';
        this.units = 'metric'; // Celsius
        this.retryCount = 0;
        this.maxRetries = 3;
    }

    // ========== MÉTODO PRINCIPAL ==========
    async getWeather(city, country) {
        try {
            // Modo prueba - Sin API Key
            if (this.isTestMode) {
                console.log('🔧 [MODO PRUEBA] Obteniendo clima simulado para:', city, country);
                await this.simulateNetworkDelay();
                return this.generateMockData(city, country);
            }

            // Modo real - Con API Key
            if (!this.apiKey || this.apiKey === '') {
                console.warn('⚠️ API Key no configurada. Cambiando a modo prueba...');
                this.isTestMode = true;
                return this.getWeather(city, country);
            }

            console.log('🌐 [MODO REAL] Consultando API para:', city, country);
            const data = await this.fetchWithRetry(city, country);
            console.log('✅ Datos recibidos de OpenWeatherMap');
            return this.formatWeatherData(data);

        } catch (error) {
            console.error('❌ Error en getWeather:', error.message);
            
            // Si falla modo real, usar mock como fallback
            if (!this.isTestMode) {
                console.warn('⚠️ Fallback a datos de prueba...');
                return this.generateMockData(city, country);
            }
            
            throw new Error(this.getUserFriendlyError(error));
        }
    }

    // ========== FETCH CON REINTENTOS ==========
    async fetchWithRetry(city, country) {
        const url = `${this.baseURL}/weather?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&appid=${this.apiKey}&units=${this.units}&lang=${this.language}`;
        
        console.log('🔗 URL:', url.replace(this.apiKey, 'API_KEY_OCULTA'));

        while (this.retryCount < this.maxRetries) {
            try {
                const response = await fetch(url);

                // Errores HTTP específicos
                if (response.status === 401) {
                    throw new Error('API_KEY_INVALIDA');
                }
                if (response.status === 404) {
                    throw new Error('CIUDAD_NO_ENCONTRADA');
                }
                if (response.status === 429) {
                    this.retryCount++;
                    console.warn(`⏳ Límite excedido. Reintento ${this.retryCount}/${this.maxRetries}...`);
                    await this.delay(2000 * this.retryCount); // Espera progresiva
                    continue;
                }
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `HTTP ${response.status}`);
                }

                this.retryCount = 0; // Resetear contador
                return await response.json();

            } catch (error) {
                if (error.message === 'API_KEY_INVALIDA' || error.message === 'CIUDAD_NO_ENCONTRADA') {
                    throw error; // No reintentar estos errores
                }
                if (this.retryCount >= this.maxRetries) {
                    throw new Error('MAX_REINTENTOS');
                }
                throw error;
            }
        }
    }

    // ========== FORMATEAR DATOS DE LA API REAL ==========
    formatWeatherData(data) {
        if (!data || !data.main || !data.weather || !data.sys) {
            throw new Error('Datos de API incompletos o mal formateados');
        }

        return {
            city: data.name || 'Desconocida',
            country: data.sys.country || 'XX',
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: Math.round((data.wind?.speed || 0) * 3.6), // m/s a km/h
            windDirection: data.wind?.deg || 0,
            description: this.capitalizeFirst(data.weather[0]?.description || 'sin datos'),
            icon: data.weather[0]?.icon || '01d',
            tempMin: Math.round(data.main.temp_min),
            tempMax: Math.round(data.main.temp_max),
            visibility: ((data.visibility || 10000) / 1000).toFixed(1), // metros a km
            clouds: data.clouds?.all || 0,
            sunrise: data.sys.sunrise || null,
            sunset: data.sys.sunset || null,
            timezone: data.timezone || 0,
            coordinates: {
                lat: data.coord?.lat || 0,
                lon: data.coord?.lon || 0
            }
        };
    }

    // ========== GENERAR DATOS MOCK ==========
    generateMockData(city, country) {
        // Datos de clima por región para mayor realismo
        const regionalClimate = this.getRegionalClimate(country);
        
        // Variación aleatoria
        const tempVariation = Math.floor(Math.random() * 4) - 2;
        const temperature = regionalClimate.tempBase + tempVariation;
        
        return {
            city: city,
            country: country,
            temperature: temperature,
            feelsLike: temperature - Math.floor(Math.random() * 3),
            humidity: regionalClimate.humidity + Math.floor(Math.random() * 10) - 5,
            pressure: regionalClimate.pressure + Math.floor(Math.random() * 10) - 5,
            windSpeed: regionalClimate.windBase + Math.floor(Math.random() * 10),
            windDirection: Math.floor(Math.random() * 360),
            description: regionalClimate.description,
            icon: regionalClimate.icon,
            tempMin: temperature - 3,
            tempMax: temperature + 3,
            visibility: (8 + Math.random() * 4).toFixed(1),
            clouds: regionalClimate.clouds + Math.floor(Math.random() * 20),
            sunrise: Math.floor(Date.now() / 1000) - 21600, // 6am aprox
            sunset: Math.floor(Date.now() / 1000) + 21600,  // 6pm aprox
            timezone: this.getTimezoneByCountry(country),
            coordinates: this.getMockCoordinates(city, country)
        };
    }

    // ========== CLIMA REGIONAL SIMULADO ==========
    getRegionalClimate(country) {
        const climates = {
            'ES': { tempBase: 22, humidity: 55, pressure: 1016, windBase: 8, clouds: 30, description: 'cielo claro', icon: '01d' },
            'MX': { tempBase: 25, humidity: 60, pressure: 1013, windBase: 10, clouds: 40, description: 'pocas nubes', icon: '02d' },
            'AR': { tempBase: 18, humidity: 65, pressure: 1015, windBase: 15, clouds: 50, description: 'nubes dispersas', icon: '03d' },
            'CO': { tempBase: 20, humidity: 80, pressure: 1012, windBase: 5, clouds: 70, description: 'lluvia ligera', icon: '10d' },
            'PE': { tempBase: 19, humidity: 75, pressure: 1014, windBase: 12, clouds: 60, description: 'nublado', icon: '04d' },
            'CL': { tempBase: 16, humidity: 60, pressure: 1017, windBase: 20, clouds: 25, description: 'cielo claro', icon: '01d' },
            'US': { tempBase: 20, humidity: 50, pressure: 1015, windBase: 14, clouds: 35, description: 'pocas nubes', icon: '02d' },
            'GB': { tempBase: 12, humidity: 80, pressure: 1010, windBase: 18, clouds: 85, description: 'lluvia', icon: '10d' },
            'FR': { tempBase: 17, humidity: 60, pressure: 1016, windBase: 11, clouds: 45, description: 'parcialmente nublado', icon: '03d' },
            'JP': { tempBase: 21, humidity: 70, pressure: 1013, windBase: 9, clouds: 55, description: 'nublado', icon: '04d' },
            'AU': { tempBase: 28, humidity: 40, pressure: 1014, windBase: 16, clouds: 15, description: 'soleado', icon: '01d' },
            'DE': { tempBase: 14, humidity: 65, pressure: 1018, windBase: 13, clouds: 60, description: 'nublado', icon: '04d' },
            'IT': { tempBase: 23, humidity: 55, pressure: 1015, windBase: 10, clouds: 20, description: 'soleado', icon: '01d' },
            'RU': { tempBase: 5, humidity: 70, pressure: 1020, windBase: 15, clouds: 75, description: 'nieve ligera', icon: '13d' },
            'CN': { tempBase: 22, humidity: 65, pressure: 1014, windBase: 8, clouds: 50, description: 'neblina', icon: '50d' },
            'EG': { tempBase: 32, humidity: 25, pressure: 1011, windBase: 12, clouds: 5, description: 'soleado', icon: '01d' },
            'CA': { tempBase: 10, humidity: 55, pressure: 1017, windBase: 17, clouds: 40, description: 'pocas nubes', icon: '02d' }
        };
        
        return climates[country] || {
            tempBase: 20, humidity: 60, pressure: 1013, windBase: 10, clouds: 40,
            description: 'clima variable', icon: '03d'
        };
    }

    // ========== COORDENADAS MOCK POR CIUDAD ==========
    getMockCoordinates(city, country) {
        const coords = {
            'Madrid': { lat: 40.4168, lon: -3.7038 },
            'Barcelona': { lat: 41.3874, lon: 2.1686 },
            'México City': { lat: 19.4326, lon: -99.1332 },
            'Buenos Aires': { lat: -34.6037, lon: -58.3816 },
            'Bogotá': { lat: 4.7110, lon: -74.0721 },
            'Lima': { lat: -12.0464, lon: -77.0428 },
            'New York': { lat: 40.7128, lon: -74.0060 },
            'London': { lat: 51.5074, lon: -0.1278 },
            'Tokyo': { lat: 35.6762, lon: 139.6503 },
        };
        
        return coords[city] || { lat: 0, lon: 0 };
    }

    // ========== UTILIDADES ==========
    capitalizeFirst(text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    getUserFriendlyError(error) {
        const errorMessages = {
            'API_KEY_INVALIDA': 'API Key inválida. Contacta al desarrollador.',
            'CIUDAD_NO_ENCONTRADA': 'Ciudad no encontrada. Verifica el nombre.',
            'MAX_REINTENTOS': 'Servidor ocupado. Intenta de nuevo en unos minutos.',
            'Failed to fetch': 'Error de conexión. Revisa tu internet.',
        };
        
        return errorMessages[error.message] || error.message || 'Error desconocido al obtener el clima';
    }

    getTimezoneByCountry(country) {
        const timezones = {
            'ES': 3600, 'MX': -21600, 'AR': -10800, 'CO': -18000,
            'PE': -18000, 'CL': -14400, 'US': -18000, 'GB': 0,
            'FR': 3600, 'JP': 32400, 'AU': 39600, 'DE': 3600
        };
        return timezones[country] || 0;
    }

    async simulateNetworkDelay() {
        // Simular latencia de red (300-800ms)
        const delay = 300 + Math.random() * 500;
        await this.delay(delay);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ========== MÉTODOS PÚBLICOS ==========
    toggleTestMode(enabled) {
        this.isTestMode = enabled;
        console.log(`🔧 Modo prueba ${enabled ? 'ACTIVADO ✅' : 'DESACTIVADO ❌'}`);
        
        // Actualizar indicador visual si existe
        const apiMode = document.getElementById('apiMode');
        if (apiMode) {
            apiMode.textContent = enabled ? 'Prueba 🔧' : 'Real 🌐';
            apiMode.className = enabled ? 'text-warning' : 'text-success';
        }
    }

    setApiKey(key) {
        if (key && key.trim() !== '') {
            this.apiKey = key.trim();
            this.isTestMode = false;
            console.log('🔑 API Key configurada correctamente');
            return true;
        }
        console.warn('⚠️ API Key inválida');
        return false;
    }

    getStatus() {
        return {
            mode: this.isTestMode ? 'Prueba' : 'Real',
            apiKeyConfigured: this.apiKey !== '' && this.apiKey !== undefined,
            baseURL: this.baseURL,
            language: this.language,
            units: this.units
        };
    }

    // ========== MÉTODOS ADICIONALES DE API ==========
    async getForecast(city, country) {
        if (this.isTestMode) {
            console.log('🔧 [MODO PRUEBA] Forecast no disponible en modo prueba');
            throw new Error('Forecast no disponible en modo prueba');
        }

        const url = `${this.baseURL}/forecast?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&appid=${this.apiKey}&units=${this.units}&lang=${this.language}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('❌ Error obteniendo forecast:', error);
            throw error;
        }
    }

    async getWeatherByCoords(lat, lon) {
        if (this.isTestMode) {
            return this.generateMockData('Ubicación actual', 'US');
        }

        const url = `${this.baseURL}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.units}&lang=${this.language}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return this.formatWeatherData(data);
        } catch (error) {
            console.error('❌ Error obteniendo clima por coordenadas:', error);
            throw error;
        }
    }
}

// Exponer para debugging en consola
if (typeof window !== 'undefined') {
    window.WeatherAPI = WeatherAPI;
}