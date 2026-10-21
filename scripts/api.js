/**
 * API Utility Module
 * Handles communication with the free API.
 */

const API_CONFIG = {
    // Using a reliable free public API for the template (JSONPlaceholder)
    // Replace this BASE_URL with your actual "Developers & API" endpoint
    BASE_URL: 'https://jsonplaceholder.typicode.com',
};

async function apiFetch(endpoint) {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Export for use in other scripts (if using modules, otherwise it's global)
window.apiFetch = apiFetch;
