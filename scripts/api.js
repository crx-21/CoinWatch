/**
 * API Utility Module
 * Handles communication with the AI Jobs API.
 */

const API_CONFIG = {
    BASE_URL: 'https://artificialintelligencejobs.co/api/jobs',
    BASE_URL: 'https://artificialintelligencejobs.co/api/jobs',
};

async function apiFetch(endpoint) {
    if (API_CONFIG.SIMULATE_ERROR) {
        await new Promise(resolve => setTimeout(resolve, 800));
        throw new Error('Network Error: Unable to connect to the job server. Please check your connection or try again later.');
    }

    // For this project requirement, we return our MOCK_JOBS array
    // If an endpoint is provided, we simulate a filtered response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ jobs: MOCK_JOBS });
        }, 500);
    });
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
