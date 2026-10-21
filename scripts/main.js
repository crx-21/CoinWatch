/**
 * Main page logic
 */

document.addEventListener('DOMContentLoaded', async () => {
    const fetchBtn = document.getElementById('fetch-btn');
    const resultContainer = document.getElementById('result-container');
    const searchInput = document.getElementById('search-text');
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');

    if (!fetchBtn || !resultContainer) return;

    let allJobs = [];

    function showCustomAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'custom-alert';
        alert.textContent = message;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    async function initializeFilters() {
        try {
            const response = await apiFetch();
            // The API returns an object { jobs: [...] }, not a direct array
            const jobs = response.jobs || [];
            allJobs = jobs;

            const categories = new Set();
            const levels = new Set();

            jobs.forEach(job => {
                if (job.category) categories.add(job.category);
                if (job.level) levels.add(job.level);
            });

            // Populate Categories
            categoryFilter.innerHTML = '<option value="">All Categories</option>';
            Array.from(categories).sort().forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat;
                opt.textContent = cat;
                categoryFilter.appendChild(opt);
            });

            // Populate Levels
            levelFilter.innerHTML = '<option value="">All Levels</option>';
            Array.from(levels).sort().forEach(lvl => {
                const opt = document.createElement('option');
                opt.value = lvl;
                opt.textContent = lvl;
                levelFilter.appendChild(opt);
            });

        } catch (error) {
            console.error('Initialization failed:', error);
            resultContainer.innerHTML = `<p style="color: red; text-align: center;">Failed to load filter categories. Please refresh the page.</p>`;
        }
    }

    async function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;
        const level = levelFilter.value;

        if (!query) {
            showCustomAlert('Please enter a keyword to search for jobs!');
            searchInput.classList.add('shake');
            setTimeout(() => searchInput.classList.remove('shake'), 400);
            return;
        }

        resultContainer.innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
                <p>Searching for jobs...</p>
            </div>
        `;

        try {
            // Since the API returns a full list, we filter client-side
            const filteredJobs = allJobs.filter(job => {
                const matchesQuery = (job.title || '').toLowerCase().includes(query) ||
                                    (job.company || '').toLowerCase().includes(query);
                const matchesCategory = !category || job.category === category;
                const matchesLevel = !level || job.level === level;

                return matchesQuery && matchesCategory && matchesLevel;
            });

            if (filteredJobs.length === 0) {
                resultContainer.innerHTML = `<div class="no-results">No jobs found matching your criteria. Try adjusting your filters!</div>`;
                return;
            }

            let html = `
                <div class="search-meta">
                    <p><strong>Found ${filteredJobs.length} jobs for:</strong> ${query} | <strong>Category:</strong> ${category || 'All'} | <strong>Level:</strong> ${level || 'All'}</p>
                </div>
                <hr style="margin: 10px 0; border: 0; border-top: 1px solid #eee;">
                <div class="job-list">
            `;

            filteredJobs.forEach(job => {
                html += `
                    <div class="job-card">
                        <h3>${job.title}</h3>
                        <div class="company">${job.company}</div>
                        <div class="details">
                            <span class="detail-item"><i class="fas fa-map-marker-alt"></i> ${job.location || 'Remote'}</span>
                            <span class="detail-item"><i class="fas fa-tag"></i> ${job.category || 'N/A'}</span>
                            <span class="detail-item"><i class="fas fa-layer-group"></i> ${job.level || 'N/A'}</span>
                        </div>
                        <a href="${job.url}" target="_blank" class="apply-link">Apply Now</a>
                    </div>
                `;
            });

            html += `</div>`;
            resultContainer.innerHTML = html;

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

    // Initialize the application
    await initializeFilters();
    fetchBtn.addEventListener('click', performSearch);
});
