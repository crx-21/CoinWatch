/**
 * Main page logic
 */

document.addEventListener('DOMContentLoaded', async () => {
    const fetchBtn = document.getElementById('fetch-btn');
    const resultContainer = document.getElementById('result-container');
    const searchInput = document.getElementById('search-text');
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    const locationFilter = document.getElementById('location-filter');
    const companyFilter = document.getElementById('company-filter');
    const advancedBtn = document.getElementById('advanced-btn');
    const advancedSection = document.getElementById('advanced-section');

    // Modal elements
    const jobModal = document.getElementById('job-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCompany = document.getElementById('modal-company');
    const modalLocation = document.getElementById('modal-location');
    const modalSalary = document.getElementById('modal-salary');
    const modalDesc = document.getElementById('modal-description');

    if (!fetchBtn || !resultContainer) return;

    let allJobs = [];
    let currentFilteredJobs = [];
    let currentPage = 1;
    const JOBS_PER_PAGE = 20;

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
            const jobs = Array.isArray(response) ? response : (response.jobs || []);
            allJobs = jobs;

            const categories = new Set();
            const levels = new Set();
            const locations = new Set();
            const companies = new Set();

            jobs.forEach(job => {
                if (job.category) categories.add(job.category);
                if (job.level) levels.add(job.level);
                if (job.location) locations.add(job.location);
                if (job.company) companies.add(job.company);
            });

            categoryFilter.innerHTML = '<option value="">All Categories</option>';
            Array.from(categories).sort().forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat;
                opt.textContent = cat;
                categoryFilter.appendChild(opt);
            });

            levelFilter.innerHTML = '<option value="">All Levels</option>';
            Array.from(levels).sort().forEach(lvl => {
                const opt = document.createElement('option');
                opt.value = lvl;
                opt.textContent = lvl;
                levelFilter.appendChild(opt);
            });

            locationFilter.innerHTML = '<option value="">All Locations</option>';
            Array.from(locations).sort().forEach(loc => {
                const opt = document.createElement('option');
                opt.value = loc;
                opt.textContent = loc;
                locationFilter.appendChild(opt);
            });

            companyFilter.innerHTML = '<option value="">All Companies</option>';
            Array.from(companies).sort().forEach(com => {
                const opt = document.createElement('option');
                opt.value = com;
                opt.textContent = com;
                companyFilter.appendChild(opt);
            });

        } catch (error) {
            console.error('Initialization failed:', error);
            resultContainer.innerHTML = `<p style="color: red; text-align: center;">Failed to load filter categories. Please refresh the page.</p>`;
        }
    }

    function openJobModal(job) {
        if (!job) return;
        modalTitle.textContent = job.title;
        modalCompany.textContent = job.company;
        modalLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${job.location || 'Remote'}`;
        modalSalary.innerHTML = `<i class="fas fa-money-bill-wave"></i> ${job.salary || 'Not specified'}`;
        modalDesc.textContent = job.description || 'No detailed description provided for this position.';

        jobModal.classList.remove('hidden');
    }

    function closeJobModal() {
        jobModal.classList.add('hidden');
    }

    function renderJobs() {
        const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
        const endIndex = startIndex + JOBS_PER_PAGE;
        const paginatedJobs = currentFilteredJobs.slice(startIndex, endIndex);

        let html = `<div class="job-list">`;

        paginatedJobs.forEach((job, index) => {
            const realIndex = startIndex + index;
            html += `
                <div class="job-card" onclick="window.openJobDetails(${realIndex})">
                    <h3>${job.title}</h3>
                    <div class="company">${job.company}</div>
                    <div class="details">
                        <span class="detail-item"><i class="fas fa-map-marker-alt"></i> ${job.location || 'Remote'}</span>
                        <span class="detail-item"><i class="fas fa-tag"></i> ${job.category || 'N/A'}</span>
                        <span class="detail-item"><i class="fas fa-layer-group"></i> ${job.level || 'N/A'}</span>
                    </div>
                    <button class="fast-apply-btn" onclick="event.stopPropagation(); window.handleFastApply(${realIndex})">Fast Apply</button>
                </div>
            `;
        });

        html += `</div>`;
        return html;
    }

    function renderPagination() {
        const totalPages = Math.ceil(currentFilteredJobs.length / JOBS_PER_PAGE);
        if (totalPages <= 1) return '';

        let html = `<div class="pagination-container">`;

        html += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="window.goToPage(${currentPage - 1})">Previous</button>`;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="window.goToPage(${i})">${i}</button>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                html += `<span class="pagination-btn">...</span>`;
            }
        }

        html += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.goToPage(${currentPage + 1})">Next</button>`;

        html += `</div>`;
        return html;
    }

    async function performSearch(isInitialLoad = false) {
        const query = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;
        const level = levelFilter.value;
        const location = locationFilter.value;
        const company = companyFilter.value;

        if (!query && !isInitialLoad) {
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
            const filteredJobs = allJobs.filter(job => {
                const matchesQuery = !query || (job.title || '').toLowerCase().includes(query) ||
                                    (job.company || '').toLowerCase().includes(query);
                const matchesCategory = !category || job.category === category;
                const matchesLevel = !level || job.level === level;
                const matchesLocation = !location || job.location === location;
                const matchesCompany = !company || job.company === company;

                return matchesQuery && matchesCategory && matchesLevel && matchesLocation && matchesCompany;
            });

            currentFilteredJobs = filteredJobs;
            currentPage = 1;

            if (filteredJobs.length === 0) {
                resultContainer.innerHTML = `<div class="no-results">No jobs found matching your criteria. Try adjusting your filters!</div>`;
                return;
            }

            let html = `
                <div class="search-meta">
                    <p><strong>Found ${filteredJobs.length} jobs${query ? ` for: ${query}` : ''} | <strong>Category:</strong> ${category || 'All'} | <strong>Level:</strong> ${level || 'All'}</p>
                </div>
                <hr style="margin: 10px 0; border: 0; border-top: 1px solid #eee;">
            `;

            html += renderJobs();
            html += renderPagination();

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
                retryBtn.addEventListener('click', () => performSearch());
            }
        }
    }

    window.goToPage = (page) => {
        currentPage = page;

        const query = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;
        const level = levelFilter.value;
        const location = locationFilter.value;
        const company = companyFilter.value;

        let html = `
            <div class="search-meta">
                <p><strong>Found ${currentFilteredJobs.length} jobs${query ? ` for: ${query}` : ''} | <strong>Category:</strong> ${category || 'All'} | <strong>Level:</strong> ${level || 'All'}</p>
            </div>
                <hr style="margin: 10px 0; border: 0; border-top: 1px solid #eee;">
        `;

        html += renderJobs();
        html += renderPagination();

        resultContainer.innerHTML = html;
    };

    window.openJobDetails = (index) => {
        const job = currentFilteredJobs[index];
        if (job) {
            openJobModal(job);
        }
    };

    window.handleFastApply = (index) => {
        const job = currentFilteredJobs[index];
        if (job) {
            showCustomAlert('Application submitted for ' + job.title + '!');
        }
    };

    advancedBtn.addEventListener('click', () => {
        const isHidden = advancedSection.classList.toggle('hidden');
        const icon = advancedBtn.querySelector('i');
        icon.className = isHidden ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        advancedBtn.childNodes[0].textContent = isHidden ? ' Advanced Filters ' : ' Close Filters ';
    });

    closeModalBtn.addEventListener('click', closeJobModal);
    window.addEventListener('click', (e) => {
        if (e.target === jobModal) closeJobModal();
    });

    await initializeFilters();
    fetchBtn.addEventListener('click', () => performSearch());
    performSearch(true);
});
