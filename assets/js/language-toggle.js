/**
 * Language Toggle Functionality
 * Handles bilingual content switching between English and Turkish
 */

(function() {
	'use strict';

	// Default language
	let currentLang = 'en';

	// Cache for loaded language data
	const langCache = {};

	/**
	 * Detect user's preferred language from browser settings
	 * Returns 'tr' for Turkish, 'en' for everything else
	 */
	function detectLanguage() {
		const browserLang = navigator.language || navigator.userLanguage;
		if (browserLang && browserLang.toLowerCase().startsWith('tr')) {
			return 'tr';
		}
		return 'en';
	}

	/**
	 * Get stored language preference or detect from browser
	 */
	function getInitialLanguage() {
		const stored = localStorage.getItem('preferredLanguage');
		if (stored && (stored === 'en' || stored === 'tr')) {
			return stored;
		}
		return detectLanguage();
	}

	/**
	 * Load language data from JSON file
	 */
	async function loadLanguageData(lang) {
		if (langCache[lang]) {
			return langCache[lang];
		}

		try {
			const response = await fetch(`content/${lang}.json`);
			if (!response.ok) {
				throw new Error(`Failed to load ${lang}.json`);
			}
			const data = await response.json();
			langCache[lang] = data;
			return data;
		} catch (error) {
			console.error('Error loading language data:', error);
			return null;
		}
	}

	/**
	 * Get nested property from object using dot notation
	 * e.g., getNestedValue(obj, 'hero.name') returns obj.hero.name
	 */
	function getNestedValue(obj, path) {
		return path.split('.').reduce((current, key) => {
			return current && current[key] !== undefined ? current[key] : null;
		}, obj);
	}

	/**
	 * Apply language data to all elements with data-lang-key attribute
	 */
	function applyLanguage(langData) {
		if (!langData) return;

		const elements = document.querySelectorAll('[data-lang-key]');
		elements.forEach(element => {
			const key = element.getAttribute('data-lang-key');
			const value = getNestedValue(langData, key);
			if (value !== null) {
				element.textContent = value;
			}
		});

		// Update HTML lang attribute
		document.documentElement.lang = langData.lang || currentLang;
	}

	/**
	 * Switch to specified language
	 */
	async function switchLanguage(lang) {
		if (lang === currentLang) return;

		const langData = await loadLanguageData(lang);
		if (langData) {
			currentLang = lang;
			localStorage.setItem('preferredLanguage', lang);
			applyLanguage(langData);
			updateLanguageLinks();
		}
	}

	/**
	 * Toggle between English and Turkish
	 */
	function toggleLanguage() {
		const newLang = currentLang === 'en' ? 'tr' : 'en';
		switchLanguage(newLang);
	}

	/**
	 * Update the active state on language links
	 */
	function updateLanguageLinks() {
		const links = document.querySelectorAll('.lang-link');
		links.forEach(link => {
			const lang = link.getAttribute('data-lang');
			if (lang === currentLang) {
				link.classList.add('active');
				link.setAttribute('aria-current', 'true');
			} else {
				link.classList.remove('active');
				link.removeAttribute('aria-current');
			}
		});
	}

	/**
	 * Initialize the language links (bind click handlers)
	 */
	function initLanguageLinks() {
		const links = document.querySelectorAll('.lang-link');
		links.forEach(link => {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				const lang = this.getAttribute('data-lang');
				if (lang) {
					switchLanguage(lang);
				}
			});
		});
		updateLanguageLinks();
	}

	/**
	 * Initialize language system
	 */
	async function init() {
		currentLang = getInitialLanguage();
		initLanguageLinks();

		// Load and apply initial language
		const langData = await loadLanguageData(currentLang);
		if (langData) {
			applyLanguage(langData);
		}
	}

	// Initialize when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	// Expose for external use if needed
	window.langToggle = {
		switchLanguage,
		toggleLanguage,
		getCurrentLang: () => currentLang
	};
})();
