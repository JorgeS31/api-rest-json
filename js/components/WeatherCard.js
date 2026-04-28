import { formatDate, formatTime, getWeatherIcon, getWeatherDescription, getWeatherColor } from '../utils/helpers.js';

export default class WeatherCard {
    static render(data) {
        const weatherIcon = getWeatherIcon(data.icon);
        const weatherColor = getWeatherColor(data.icon);
        const weatherDesc = getWeatherDescription(data.icon);
        const currentDate = formatDate(new Date());
        const currentTime = formatTime(new Date());
        
        return `
            <div class="card shadow-lg weather-card animate__animated animate__fadeInUp">
                <!-- Header con color dinámico según clima -->
                <div class="card-header weather-header" style="background: ${weatherColor}; background: linear-gradient(135deg, ${weatherColor} 0%, ${WeatherCard.adjustColor(weatherColor, -30)} 100%);">
                    <div class="row align-items-center">
                        <div class="col">
                            <h3 class="card-title mb-0 text-white">
                                <i class="bi bi-geo-alt-fill"></i> ${data.city}, ${data.country}
                            </h3>
                        </div>
                        <div class="col-auto text-end text-white">
                            <small><i class="bi bi-calendar3"></i> ${currentDate}</small><br>
                            <small><i class="bi bi-clock"></i> ${currentTime}</small>
                        </div>
                    </div>
                </div>

                <div class="card-body p-4">
                    <!-- Clima principal -->
                    <div class="row align-items-center mb-4">
                        <div class="col-md-6 text-center">
                            <i class="bi ${weatherIcon} weather-icon display-1" style="color: ${weatherColor};"></i>
                            <h4 class="text-capitalize mt-2">${data.description || weatherDesc}</h4>
                            <span class="badge bg-info">${weatherDesc}</span>
                        </div>
                        <div class="col-md-6 text-center">
                            <div class="temperature display-3 fw-bold">${data.temperature}°C</div>
                            <p class="text-muted mb-1">
                                <i class="bi bi-thermometer-half"></i> 
                                Sensación térmica: <strong>${data.feelsLike}°C</strong>
                            </p>
                            <div class="d-flex justify-content-center gap-2">
                                <span class="badge bg-danger">Máx: ${data.tempMax}°C</span>
                                <span class="badge bg-primary">Mín: ${data.tempMin}°C</span>
                            </div>
                        </div>
                    </div>

                    <!-- Detalles en grid -->
                    <h5 class="mb-3 text-muted">
                        <i class="bi bi-info-circle"></i> Detalles del clima
                    </h5>
                    <div class="row g-3">
                        ${WeatherCard.renderDetail('Humedad', `${data.humidity}%`, 'bi-droplet-half', 'primary')}
                        ${WeatherCard.renderDetail('Viento', `${data.windSpeed} km/h`, 'bi-wind', 'success')}
                        ${WeatherCard.renderDetail('Presión', `${data.pressure} hPa`, 'bi-speedometer2', 'warning')}
                        ${WeatherCard.renderDetail('Visibilidad', `${data.visibility} km`, 'bi-eye-fill', 'info')}
                        ${WeatherCard.renderDetail('Nubosidad', `${data.clouds}%`, 'bi-clouds-fill', 'secondary')}
                        ${WeatherCard.renderDetail('Sensación', `${data.feelsLike}°C`, 'bi-thermometer-sun', 'danger')}
                    </div>
                </div>

                <!-- Footer de la tarjeta -->
                <div class="card-footer bg-light text-muted text-center">
                    <small>
                        <i class="bi bi-cloud-sun"></i> 
                        Datos proporcionados por OpenWeatherMap
                    </small>
                </div>
            </div>
        `;
    }

    static renderDetail(label, value, icon, color = 'primary') {
        return `
            <div class="col-6 col-md-4">
                <div class="weather-detail text-center p-3 rounded-3 border">
                    <div class="icon-wrapper mb-2">
                        <i class="bi ${icon} fs-3 text-${color}"></i>
                    </div>
                    <p class="mb-1 fw-bold fs-5">${value}</p>
                    <small class="text-muted text-uppercase">${label}</small>
                </div>
            </div>
        `;
    }

    // Método auxiliar para oscurecer/aclarar colores
    static adjustColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
        const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
        return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
    }

    // Renderizar tarjeta de error
    static renderError(message) {
        return `
            <div class="card shadow-sm border-danger animate__animated animate__shakeX">
                <div class="card-body text-center text-danger p-5">
                    <i class="bi bi-cloud-lightning-rain display-1 mb-3"></i>
                    <h4>¡Ups! No se pudo obtener el clima</h4>
                    <p class="mb-3">${message}</p>
                    <button onclick="location.reload()" class="btn btn-outline-danger">
                        <i class="bi bi-arrow-clockwise"></i> Intentar de nuevo
                    </button>
                </div>
            </div>
        `;
    }

    // Renderizar estado vacío
    static renderEmpty() {
        return `
            <div class="card shadow-sm border-dashed text-center p-5">
                <div class="card-body">
                    <i class="bi bi-cloud-question display-1 text-muted mb-3"></i>
                    <h4 class="text-muted">Sin datos del clima</h4>
                    <p class="text-muted">Selecciona una ciudad y presiona "Ver Clima" para comenzar</p>
                    <i class="bi bi-arrow-up text-muted fs-3"></i>
                </div>
            </div>
        `;
    }
}