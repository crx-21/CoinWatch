/**
 * Main page logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('fetch-btn');
    const resultContainer = document.getElementById('result-container');
    const searchInput = document.getElementById('search-text');
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');

    if (!fetchBtn || !resultContainer) return;

    function showCustomAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'custom-alert';
        alert.textContent = message;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    async function performSearch() {
        const query = searchInput.value.trim();
        const category = categoryFilter.value;
        const level = levelFilter.value;

        if (!query) {
            showCustomAlert('Please enter a keyword to search for jobs!');

            // Trigger shake effect
            searchInput.classList.add('shake');
            setTimeout(() => searchInput.classList.remove('shake'), 400);

            return;
        }

        console.log('Searching for:', { query, category, level });

        resultContainer.innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
                <p>Searching for jobs...</p>
            </div>
        `;

        try {
            const data = await apiFetch('/posts/1');

            resultContainer.innerHTML = `
                <div class="search-meta">
                    <p><strong>Results for:</strong> ${query} | <strong>Category:</strong> ${category || 'All'} | <strong>Level:</strong> ${level || 'All'}</p>
                </div>
                <hr style="margin: 10px 0; border: 0; border-top: 1px solid #eee;">
                <h3>${data.title}</h3>
                <p>${data.body}</p>
                <small>Source: Mock API Data</small>
            `;
        } catch (error) {
            resultContainer.innerHTML = `
                <div class="error-card">
                    <h3>Oops! Something went wrong</h3>
                    <p>${error.message}</p>
                    <button class="retry-btn" id="retry-btn">Try Again</button>
                </div>
            `;

            const retryBtn = document.getElementById('retry-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', performSearch);
            }
        }
    }

    fetchBtn.addEventListener('click', performSearch);
});
