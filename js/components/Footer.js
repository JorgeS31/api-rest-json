export default class Footer {
    static render() {
        const currentYear = new Date().getFullYear();
        
        return `
            <footer class="footer mt-auto">
                <!-- Onda SVG decorativa -->
                <div class="footer-wave">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="var(--footer-bg, #1a1a2e)" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                <!-- Contenido principal del footer -->
                <div class="footer-content pb-4">
                    <div class="container">
                        <div class="row g-4">
                            
                            <!-- Columna 1: Desarrollador -->
                            <div class="col-lg-4 col-md-6">
                                <div class="footer-brand mb-3">
                                    <i class="bi bi-cloud-sun-fill fs-3 me-2"></i>
                                    <span class="fs-5 fw-bold">WeatherApp</span>
                                </div>
                                <div class="developer-info">
                                    <p class="mb-2">
                                        <i class="bi bi-person-circle me-2"></i>
                                        <strong>Jorge Sandoval</strong>
                                    </p>
                                    <p class="mb-2 small text-white-50">
                                        <i class="bi bi-code-slash me-2"></i>
                                        Desarrollo Web Full Stack
                                    </p>
                                    <p class="mb-2 small text-white-50">
                                        <i class="bi bi-geo-alt me-2"></i>
                                        México
                                    </p>
                                    <div class="social-links mt-3">
                                        <a href="https://github.com/JorgeS31" target="_blank" rel="noopener noreferrer" class="social-icon" title="GitHub" aria-label="GitHub">
                                            <i class="bi bi-github"></i>
                                        </a>
                                        <a href="https://www.linkedin.com/in/jorge-luis-ponce-sandoval-b6a747382/" target="_blank" rel="noopener noreferrer" class="social-icon" title="LinkedIn" aria-label="LinkedIn">
                                            <i class="bi bi-linkedin"></i>
                                        </a>
                                        <a href="jorge333neaa@gmail.com" class="social-icon" title="Email" aria-label="Email">
                                            <i class="bi bi-envelope-fill"></i>
                                        </a>
                                        <a href="" target="_blank" rel="noopener noreferrer" class="social-icon" title="Portafolio" aria-label="Portafolio">
                                            <i class="bi bi-briefcase-fill"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- Columna 2: Enlaces rápidos -->
                            <div class="col-lg-3 col-md-6">
                                <h5 class="footer-title">
                                    <i class="bi bi-link-45deg me-2"></i>Enlaces
                                </h5>
                                <ul class="footer-links">
                                    <li>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#aboutModal">
                                            <i class="bi bi-chevron-right"></i> Acerca de la app
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">
                                            <i class="bi bi-chevron-right"></i> OpenWeatherMap
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://rapidapi.com" target="_blank" rel="noopener noreferrer">
                                            <i class="bi bi-chevron-right"></i> RapidAPI
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#aboutModal">
                                            <i class="bi bi-chevron-right"></i> Créditos
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <!-- Columna 3: Tecnologías -->
                            <div class="col-lg-3 col-md-6">
                                <h5 class="footer-title">
                                    <i class="bi bi-tools me-2"></i>Tecnologías
                                </h5>
                                <ul class="footer-tech list-unstyled">
                                    <li class="mb-2">
                                        <span class="badge bg-html me-1">HTML5</span>
                                    </li>
                                    <li class="mb-2">
                                        <span class="badge bg-css me-1">CSS3</span>
                                    </li>
                                    <li class="mb-2">
                                        <span class="badge bg-js me-1">JavaScript</span>
                                    </li>
                                    <li class="mb-2">
                                        <span class="badge bg-bs me-1">Bootstrap 5</span>
                                    </li>
                                    <li class="mb-2">
                                        <span class="badge bg-api me-1">REST API</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Columna 4: API Info -->
                            <div class="col-lg-2 col-md-6">
                                <h5 class="footer-title">
                                    <i class="bi bi-cloud me-2"></i>API
                                </h5>
                                <div class="api-status" id="apiStatus">
                                    <span class="badge bg-success">
                                        <i class="bi bi-check-circle"></i> Operativa
                                    </span>
                                </div>
                                <p class="small text-white-50 mt-2 mb-0">
                                    Modo: <span id="apiMode">Prueba</span>
                                </p>
                                <p class="small text-white-50 mb-0">
                                    <i class="bi bi-cloud-sun"></i> OpenWeatherMap
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Línea divisoria -->
                <div class="footer-divider"></div>

                <!-- Barra inferior -->
                <div class="footer-bottom py-3">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-md-6 text-center text-md-start mb-2 mb-md-0">
                                <small class="text-white-50">
                                    © ${currentYear} <strong>WeatherApp</strong> — Desarrollado por 
                                    <span class="text-white">Jorge Sandoval</span>
                                </small>
                            </div>
                            <div class="col-md-6 text-center text-md-end">
                                <small class="text-white-50">
                                    <i class="bi bi-shield-check me-1"></i>
                                    Datos de OpenWeatherMap
                                    <span class="mx-2">|</span>
                                    <i class="bi bi-globe2 me-1"></i>
                                    Clima en tiempo real
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    // Método para actualizar estado de la API
    static updateAPIStatus(status, mode = '') {
        const apiStatus = document.getElementById('apiStatus');
        const apiMode = document.getElementById('apiMode');
        
        if (apiStatus) {
            if (status === 'online') {
                apiStatus.innerHTML = '<span class="badge bg-success"><i class="bi bi-check-circle"></i> Operativa</span>';
            } else if (status === 'offline') {
                apiStatus.innerHTML = '<span class="badge bg-danger"><i class="bi bi-x-circle"></i> Sin conexión</span>';
            } else if (status === 'loading') {
                apiStatus.innerHTML = '<span class="badge bg-warning"><i class="bi bi-hourglass-split"></i> Cargando...</span>';
            }
        }
        
        if (apiMode) {
            apiMode.textContent = mode;
        }
    }

    // Método para actualizar año dinámicamente
    static updateYear() {
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }
}