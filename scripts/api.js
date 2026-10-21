/**
 * API Utility Module
 * Handles communication with the AI Jobs API.
 */

const API_CONFIG = {
    BASE_URL: 'https://artificialintelligencejobs.co/api/jobs?limit=200',
};

async function apiFetch() {
    try {
        const response = await fetch(API_CONFIG.BASE_URL);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

window.apiFetch = apiFetch;
