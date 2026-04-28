// Obtener dirección IP del cliente
export async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return 'No disponible';
    }
}

// Formatear fecha a español
export function formatDate(date) {
    return new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Formatear hora a español
export function formatTime(date) {
    return new Intl.DateTimeFormat('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date);
}

// Obtener ícono del clima según código OpenWeather
export function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'bi-sun-fill',
        '01n': 'bi-moon-fill',
        '02d': 'bi-cloud-sun-fill',
        '02n': 'bi-cloud-moon-fill',
        '03d': 'bi-cloud-fill',
        '03n': 'bi-cloud-fill',
        '04d': 'bi-clouds-fill',
        '04n': 'bi-clouds-fill',
        '09d': 'bi-cloud-drizzle-fill',
        '09n': 'bi-cloud-drizzle-fill',
        '10d': 'bi-cloud-rain-fill',
        '10n': 'bi-cloud-rain-fill',
        '11d': 'bi-cloud-lightning-rain-fill',
        '11n': 'bi-cloud-lightning-rain-fill',
        '13d': 'bi-cloud-snow-fill',
        '13n': 'bi-cloud-snow-fill',
        '50d': 'bi-cloud-fog2-fill',
        '50n': 'bi-cloud-fog2-fill'
    };
    
    return iconMap[iconCode] || 'bi-cloud-fill';
}

// Obtener descripción del clima en español
export function getWeatherDescription(iconCode) {
    const descriptionMap = {
        '01d': 'Cielo despejado',
        '01n': 'Cielo despejado',
        '02d': 'Pocas nubes',
        '02n': 'Pocas nubes',
        '03d': 'Nubes dispersas',
        '03n': 'Nubes dispersas',
        '04d': 'Muy nuboso',
        '04n': 'Muy nuboso',
        '09d': 'Llovizna',
        '09n': 'Llovizna',
        '10d': 'Lluvia',
        '10n': 'Lluvia',
        '11d': 'Tormenta eléctrica',
        '11n': 'Tormenta eléctrica',
        '13d': 'Nieve',
        '13n': 'Nieve',
        '50d': 'Neblina',
        '50n': 'Neblina'
    };
    
    return descriptionMap[iconCode] || 'Clima variable';
}

// Obtener color de fondo según el clima
export function getWeatherColor(iconCode) {
    const colorMap = {
        '01d': '#FFD700', // Dorado - soleado
        '01n': '#1a1a2e', // Oscuro - noche
        '02d': '#87CEEB', // Azul cielo
        '02n': '#2c3e50', // Azul oscuro
        '03d': '#B0C4DE', // Gris azulado
        '03n': '#34495e', // Gris oscuro
        '04d': '#778899', // Gris
        '04n': '#2c3e50', // Gris oscuro
        '09d': '#4682B4', // Azul acero
        '09n': '#1a1a2e', // Azul muy oscuro
        '10d': '#5F9EA0', // Azul verdoso
        '10n': '#1a1a2e', // Oscuro
        '11d': '#4B0082', // Índigo
        '11n': '#1a1a2e', // Oscuro
        '13d': '#F0F8FF', // Blanco nieve
        '13n': '#2c3e50', // Oscuro
        '50d': '#D3D3D3', // Gris claro
        '50n': '#34495e'  // Gris oscuro
    };
    
    return colorMap[iconCode] || '#87CEEB';
}

// Poblar el select con ciudades predefinidas
export async function populateCitySelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) {
        console.error(`Elemento con ID "${selectId}" no encontrado`);
        return;
    }
    
    const cities = [
        { name: 'Madrid', country: 'ES', flag: '🇪🇸' },
        { name: 'Barcelona', country: 'ES', flag: '🇪🇸' },
        { name: 'Valencia', country: 'ES', flag: '🇪🇸' },
        { name: 'Sevilla', country: 'ES', flag: '🇪🇸' },
        { name: 'Bilbao', country: 'ES', flag: '🇪🇸' },
        { name: 'México City', country: 'MX', flag: '🇲🇽' },
        { name: 'Guadalajara', country: 'MX', flag: '🇲🇽' },
        { name: 'Monterrey', country: 'MX', flag: '🇲🇽' },
        { name: 'Buenos Aires', country: 'AR', flag: '🇦🇷' },
        { name: 'Bogotá', country: 'CO', flag: '🇨🇴' },
        { name: 'Medellín', country: 'CO', flag: '🇨🇴' },
        { name: 'Lima', country: 'PE', flag: '🇵🇪' },
        { name: 'Santiago', country: 'CL', flag: '🇨🇱' },
        { name: 'New York', country: 'US', flag: '🇺🇸' },
        { name: 'Miami', country: 'US', flag: '🇺🇸' },
        { name: 'London', country: 'GB', flag: '🇬🇧' },
        { name: 'Paris', country: 'FR', flag: '🇫🇷' },
        { name: 'Tokyo', country: 'JP', flag: '🇯🇵' },
        { name: 'Sydney', country: 'AU', flag: '🇦🇺' },
        { name: 'Berlin', country: 'DE', flag: '🇩🇪' },
        { name: 'Rome', country: 'IT', flag: '🇮🇹' },
        { name: 'Moscow', country: 'RU', flag: '🇷🇺' },
        { name: 'Beijing', country: 'CN', flag: '🇨🇳' },
        { name: 'Cairo', country: 'EG', flag: '🇪🇬' },
        { name: 'Toronto', country: 'CA', flag: '🇨🇦' }
    ];
    
    // Limpiar opciones existentes (menos la primera)
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Agregar ciudades ordenadas alfabéticamente
    cities.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = `${city.name},${city.country}`;
        option.textContent = `${city.flag} ${city.name}, ${city.country}`;
        select.appendChild(option);
    });
}

// Validar selección de ciudad
export function isValidCity(value) {
    return value && value.includes(',') && value.split(',').length === 2;
}

// Capitalizar primera letra de un texto
export function capitalize(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}