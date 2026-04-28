// ============================================
// WEATHERAPP - MÓDULO PRINCIPAL
// Desarrollado por: Jorge Sandoval
// ============================================

import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import WeatherCard from './components/WeatherCard.js';
import WeatherAPI from './api/WeatherAPI.js';
import { getClientIP, populateCitySelect } from './utils/helpers.js';

class WeatherApp {
    constructor() {
        this.api = new WeatherAPI();
        this.selectedCity = null;
        this.darkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    // ========== INICIALIZACIÓN ==========
    async init() {
        // Renderizar componentes principales
        document.getElementById('navbar').innerHTML = Navbar.render();
        document.getElementById('footer').innerHTML = Footer.render();
        
        // Poblar selects de ciudades
        await populateCitySelect('citySelect');
        Navbar.populateNavCities();
        
        // Obtener y mostrar IP
        await this.displayClientIP();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Aplicar tema guardado
        this.applyTheme();
        
        // Actualizar estado de API en footer
        Footer.updateAPIStatus('online', this.api.isTestMode ? 'Prueba' : 'Real');
        
        // Mostrar estado vacío inicial
        this.showEmptyState();
        
        console.log('✅ WeatherApp inicializada correctamente');
        console.log('🔧 Modo:', this.api.isTestMode ? 'PRUEBA' : 'REAL');
        console.log('🌙 Tema:', this.darkMode ? 'Oscuro' : 'Claro');
    }

    // ========== IP DEL CLIENTE ==========
    async displayClientIP() {
        const ipElement = document.getElementById('ipAddress');
        
        try {
            const ip = await getClientIP();
            
            if (ipElement) {
                ipElement.innerHTML = `Tu IP: <strong>${ip}</strong>`;
            }
            
            // Actualizar IP en navbar
            Navbar.updateIP(ip);
            
        } catch (error) {
            if (ipElement) {
                ipElement.textContent = 'No se pudo obtener la IP';
            }
            Navbar.updateIP('No disponible');
            console.error('Error getting IP:', error);
        }
    }

    // ========== EVENT LISTENERS ==========
    setupEventListeners() {
        // Select principal de ciudad
        const citySelect = document.getElementById('citySelect');
        const searchBtn = document.getElementById('searchBtn');
        
        // Select rápido del navbar
        const navCitySelect = document.getElementById('navCitySelect');
        const navSearchBtn = document.getElementById('navSearchBtn');
        
        // Toggle de tema
        const themeToggle = document.getElementById('themeToggle');
        
        // Botón refrescar en dropdown
        const refreshApp = document.getElementById('refreshApp');

        // === SELECT PRINCIPAL ===
        citySelect?.addEventListener('change', (e) => {
            this.selectedCity = e.target.value;
            if (searchBtn) {
                searchBtn.disabled = !this.selectedCity;
            }
            // Sincronizar con navbar
            if (navCitySelect && navCitySelect.value !== this.selectedCity) {
                navCitySelect.value = this.selectedCity;
            }
            if (navSearchBtn) {
                navSearchBtn.disabled = !this.selectedCity;
            }
        });

        // === BOTÓN BUSCAR PRINCIPAL ===
        searchBtn?.addEventListener('click', () => {
            if (this.selectedCity) {
                this.fetchAndDisplayWeather();
            }
        });

        // === SELECT NAVBAR ===
        navCitySelect?.addEventListener('change', (e) => {
            this.selectedCity = e.target.value;
            if (navSearchBtn) {
                navSearchBtn.disabled = !this.selectedCity;
            }
            // Sincronizar con select principal
            if (citySelect && citySelect.value !== this.selectedCity) {
                citySelect.value = this.selectedCity;
            }
            if (searchBtn) {
                searchBtn.disabled = !this.selectedCity;
            }
        });

        // === BOTÓN BUSCAR NAVBAR ===
        navSearchBtn?.addEventListener('click', () => {
            if (this.selectedCity) {
                this.fetchAndDisplayWeather();
            }
        });

        // === TOGGLE TEMA OSCURO/CLARO ===
        themeToggle?.addEventListener('click', () => {
            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', this.darkMode);
            this.applyTheme();
        });

        // === REFRESCAR APP ===
        refreshApp?.addEventListener('click', (e) => {
            e.preventDefault();
            this.resetApp();
        });
    }

    // ========== TEMA OSCURO/CLARO ==========
    applyTheme() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i> <span class="d-none d-md-inline">Claro</span>';
                themeToggle.classList.remove('btn-outline-light');
                themeToggle.classList.add('btn-outline-warning');
            }
        } else {
            document.body.classList.remove('dark-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="bi bi-moon-stars"></i> <span class="d-none d-md-inline">Oscuro</span>';
                themeToggle.classList.remove('btn-outline-warning');
                themeToggle.classList.add('btn-outline-light');
            }
        }
    }

    // ========== OBTENER Y MOSTRAR CLIMA ==========
    async fetchAndDisplayWeather() {
        const container = document.getElementById('weatherContainer');
        if (!container || !this.selectedCity) return;

        // Mostrar loading spinner
        container.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body text-center py-5">
                    <div class="loading-spinner mb-3"></div>
                    <p class="text-muted mb-1">Consultando el clima...</p>
                    <small class="text-muted">${this.selectedCity.split(',')[0]}</small>
                </div>
            </div>
        `;

        // Actualizar estado en footer
        Footer.updateAPIStatus('loading');

        try {
            const [city, country] = this.selectedCity.split(',');
            const weatherData = await this.api.getWeather(city.trim(), country.trim());
            
            // Mostrar tarjeta del clima
            container.innerHTML = WeatherCard.render(weatherData);
            
            // Actualizar estado en footer
            Footer.updateAPIStatus('online', this.api.isTestMode ? 'Prueba' : 'Real');
            
            // Scroll suave a resultados
            container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        } catch (error) {
            container.innerHTML = WeatherCard.renderError(error.message);
            
            // Actualizar estado en footer
            Footer.updateAPIStatus('offline');
            
            console.error('Error fetching weather:', error);
        }
    }

    // ========== ESTADO VACÍO ==========
    showEmptyState() {
        const container = document.getElementById('weatherContainer');
        if (container && !this.selectedCity) {
            container.innerHTML = WeatherCard.renderEmpty();
        }
    }

    // ========== RESETEAR APP ==========
    resetApp() {
        this.selectedCity = null;
        
        // Resetear selects
        const citySelect = document.getElementById('citySelect');
        const navCitySelect = document.getElementById('navCitySelect');
        const searchBtn = document.getElementById('searchBtn');
        const navSearchBtn = document.getElementById('navSearchBtn');
        
        if (citySelect) citySelect.value = '';
        if (navCitySelect) navCitySelect.value = '';
        if (searchBtn) searchBtn.disabled = true;
        if (navSearchBtn) navSearchBtn.disabled = true;
        
        // Mostrar estado vacío
        this.showEmptyState();
        
        // Actualizar IP
        this.displayClientIP();
        
        console.log('🔄 App reseteada');
    }
}

// ============================================
// INICIAR APLICACIÓN CUANDO EL DOM ESTÉ LISTO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Exponer para debugging en consola
if (typeof window !== 'undefined') {
    window.weatherApp = WeatherApp;
}