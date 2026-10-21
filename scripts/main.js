/**
 * Main page logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('fetch-btn');
    const resultContainer = document.getElementById('result-container');

    if (!fetchBtn || !resultContainer) return;

    fetchBtn.addEventListener('click', async () => {
        resultContainer.innerHTML = '<p>Loading data...</p>';

        try {
            // Using /posts/1 as a test endpoint from the free API
            const data = await apiFetch('/posts/1');

            resultContainer.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
                <small>Source: ${window.apiFetch.BASE_URL || 'API'}</small>
            `;
        } catch (error) {
            resultContainer.innerHTML = `
                <p style="color: red;">Failed to load data: ${error.message}</p>
            `;
        }
    });
});
