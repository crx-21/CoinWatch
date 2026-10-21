/**
 * API Utility Module
 * Handles communication with the free API.
 */

const API_CONFIG = {
    // Using a reliable free public API for the template (JSONPlaceholder)
    // Replace this BASE_URL with your actual "Developers & API" endpoint
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    SIMULATE_ERROR: true, // SET TO true TO TEST ERROR HANDLING
};

async function apiFetch(endpoint) {
    if (API_CONFIG.SIMULATE_ERROR) {
        // Simulate a network delay before throwing the error
        await new Promise(resolve => setTimeout(resolve, 800));
        throw new Error('Network Error: Unable to connect to the job server. Please check your connection or try again later.');
    }

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
