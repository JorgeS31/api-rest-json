export default class Navbar {
    static render() {
        return `
            <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
                <div class="container">
                    <!-- Logo / Marca -->
                    <a class="navbar-brand d-flex align-items-center" href="#">
                        <i class="bi bi-cloud-sun-fill fs-3 me-2"></i>
                        <div>
                            <span class="fw-bold">WeatherApp</span>
                            <small class="d-block text-white-50" style="font-size: 0.65rem;">Clima en tiempo real</small>
                        </div>
                    </a>

                    <!-- Botón hamburguesa móvil -->
                    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Menú de navegación">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <!-- Menú colapsable -->
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto align-items-lg-center gap-2">
                            
                            <!-- IP del cliente -->
                            <li class="nav-item">
                                <span class="nav-link d-flex align-items-center" id="navbarIP" title="Tu dirección IP">
                                    <i class="bi bi-globe2 me-1"></i> 
                                    <span>Cargando IP...</span>
                                </span>
                            </li>

                            <!-- Separador -->
                            <li class="nav-item d-none d-lg-block">
                                <span class="nav-link text-white-50">|</span>
                            </li>

                            <!-- Selector de ciudad rápido -->
                            <li class="nav-item">
                                <div class="d-flex align-items-center gap-2 px-2">
                                    <label for="navCitySelect" class="text-white-50 small d-none d-lg-block">
                                        <i class="bi bi-geo-alt"></i>
                                    </label>
                                    <select id="navCitySelect" class="form-select form-select-sm bg-light border-0" style="min-width: 180px;" aria-label="Ciudad rápida">
                                        <option value="">🌍 Ciudad rápida...</option>
                                    </select>
                                </div>
                            </li>

                            <!-- Botón buscar -->
                            <li class="nav-item">
                                <button id="navSearchBtn" class="btn btn-outline-light btn-sm" disabled title="Buscar clima">
                                    <i class="bi bi-search"></i>
                                </button>
                            </li>

                            <!-- Separador -->
                            <li class="nav-item d-none d-lg-block">
                                <span class="nav-link text-white-50">|</span>
                            </li>

                            <!-- Tema oscuro/claro -->
                            <li class="nav-item">
                                <button id="themeToggle" class="btn btn-outline-light btn-sm d-flex align-items-center gap-1" title="Cambiar tema">
                                    <i class="bi bi-moon-stars"></i>
                                    <span class="d-none d-md-inline">Tema</span>
                                </button>
                            </li>

                            <!-- Enlaces -->
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" title="Más opciones">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#aboutModal">
                                        <i class="bi bi-info-circle"></i> Acerca de
                                    </a></li>
                                    <li><a class="dropdown-item" href="https://github.com/tuusuario" target="_blank" rel="noopener">
                                        <i class="bi bi-github"></i> GitHub
                                    </a></li>
                                    <li><a class="dropdown-item" href="https://openweathermap.org" target="_blank" rel="noopener">
                                        <i class="bi bi-box-arrow-up-right"></i> OpenWeatherMap
                                    </a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li>
                                        <a class="dropdown-item" href="#" id="refreshApp">
                                            <i class="bi bi-arrow-clockwise"></i> Refrescar
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- Modal Acerca de -->
            <div class="modal fade" id="aboutModal" tabindex="-1" aria-labelledby="aboutModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title" id="aboutModalLabel">
                                <i class="bi bi-cloud-sun-fill"></i> Acerca de WeatherApp
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body text-center">
                            <i class="bi bi-cloud-sun-fill display-1 text-primary mb-3"></i>
                            <h4>WeatherApp v1.0</h4>
                            <p class="text-muted">Aplicación de clima en tiempo real</p>
                            <hr>
                            <p><strong>Desarrollador:</strong> Jorge Sandoval</p>
                            <p><strong>Materia:</strong> Desarrollo Web</p>
                            <p><strong>API:</strong> OpenWeatherMap</p>
                            <p><strong>Tecnologías:</strong> HTML5, CSS3, JavaScript (ES6+), Bootstrap 5</p>
                            <small class="text-muted">© ${new Date().getFullYear()} - Todos los derechos reservados</small>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Método para actualizar IP en el navbar
    static updateIP(ip) {
        const navbarIP = document.getElementById('navbarIP');
        if (navbarIP) {
            navbarIP.innerHTML = `<i class="bi bi-globe2 me-1"></i> <span>${ip}</span>`;
        }
    }

    // Método para poblar el select del navbar
    static populateNavCities() {
        const navSelect = document.getElementById('navCitySelect');
        if (!navSelect) return;

        const cities = [
            { name: 'Madrid', country: 'ES', flag: '🇪🇸' },
            { name: 'México City', country: 'MX', flag: '🇲🇽' },
            { name: 'Buenos Aires', country: 'AR', flag: '🇦🇷' },
            { name: 'Bogotá', country: 'CO', flag: '🇨🇴' },
            { name: 'Lima', country: 'PE', flag: '🇵🇪' },
            { name: 'New York', country: 'US', flag: '🇺🇸' },
            { name: 'London', country: 'GB', flag: '🇬🇧' },
            { name: 'Tokyo', country: 'JP', flag: '🇯🇵' }
        ];

        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = `${city.name},${city.country}`;
            option.textContent = `${city.flag} ${city.name}`;
            navSelect.appendChild(option);
        });
    }
}