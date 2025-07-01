document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('news-modal');
    const closeButton = document.querySelector('.close-button');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    const updateNewsBtn = document.getElementById('update-news-btn');
    const lastUpdatedTime = document.getElementById('last-updated-time');
    const newsTimeline = document.querySelector('.news-timeline');

    // --- MOCK API & DATA STORE ---
    // This simulates a database of articles and a function to fetch fresh content.
    const articleDataStore = {
        "https://www.boereport.com/2024/03/19/teine-energy-looks-to-sell-certain-non-core-oil-and-natural-gas-assets/": {
            title: "Teine Energy to Divest Non-Core Assets",
            date: "March 2024",
            short_summary: "<p>Teine Energy is divesting non-core assets in Alberta & Saskatchewan to streamline operations and focus on its core Viking and Duvernay holdings.</p>",
            full_summary: `
                <p>Teine Energy is actively divesting certain non-core oil and natural gas assets located in Alberta and Saskatchewan. This strategic decision is aimed at streamlining the company's operational focus and concentrating capital on its primary core holdings within the Viking and Duvernay formations.</p>
                <p>The asset package includes a production volume of approximately 117 boe/d (based on 2023 averages) and generated a net operating income of $2.55 million. The estimated value of these assets is $3.3 million, with proved reserves of 43.5 Mboe and proved-plus-probable reserves of 66.7 Mboe.</p>
                <p>This divestiture aligns with Teine's long-term strategy to optimize its asset portfolio, reduce operational complexities, and enhance its position as a leading operator in its primary development areas. The sale is anticipated to attract considerable interest from smaller producers seeking to acquire stable, low-decline production assets.</p>
                <canvas id="asset-chart" width="400" height="200"></canvas>
            `,
            chartData: {
                labels: ['Production (boe/d)', 'Operating Income ($M)', 'Asset Value ($M)'],
                datasets: [{
                    label: 'Asset Metrics',
                    data: [117, 2.55, 3.3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        },
        "https://www.boereport.com/2023/04/28/teine-energy-drilling-activity-in-year-prior-to-april-2023/": {
            title: "Teine Energy 2023 Drilling Activity",
            date: "April 2023",
            short_summary: "<p>In the year before April 2023, Teine Energy spudded 295 wells, focusing heavily on the Viking formation (270 wells) while exploring the Duvernay.</p>",
            full_summary: `
                <p>Reviewing the 12-month period leading up to April 2023, Teine Energy demonstrated a highly active development program, spudding a total of <strong>295 wells</strong>. This activity underscores their commitment to expanding production and reserves.</p>
                <p>The drilling campaign was heavily concentrated in the <strong>Viking formation</strong>, where 270 wells were drilled, reinforcing Teine's status as the dominant operator in this prolific light oil play. Concurrently, the company advanced its strategic exploration objectives with 5 wells in the <strong>Duvernay formation</strong>, signaling a key area for future growth. An additional 6 wells were drilled in <strong>Chauvin South</strong>, effectively leveraging assets that were part of the strategic acquisition from Repsol.</p>
                <p>This drilling distribution highlights Teine's dual-pronged strategy: maximizing low-risk, high-return assets in the Viking while systematically de-risking and developing its emerging positions in other significant formations.</p>
            `
        },
        "https://www.reuters.com/business/energy/repsol-sells-canadian-oil-gas-assets-peyton-teine-energy-2022-09-07/": {
            title: "Teine Acquires Repsol's Alberta Assets",
            date: "September 2022",
            short_summary: "<p>Teine Energy strategically acquired significant oil and gas assets from Repsol in Alberta for $304 million, boosting its production and infrastructure footprint.</p>",
            full_summary: `
                <p>In a significant strategic move to expand its operational footprint in Alberta, Teine Energy completed the acquisition of key oil and gas assets from Repsol for a total consideration of <strong>$304 million</strong>. This transaction was a pivotal step in Teine's growth trajectory.</p>
                <p>The deal encompassed approximately <strong>6,800 boe/d</strong> of production, 95,000 net acres of land, and a substantial portfolio of midstream infrastructure, including 1,800 km of pipelines. By acquiring these assets, Teine not only increased its production base but also gained control over critical infrastructure, which is essential for supporting long-term, low-cost development and enhancing operational efficiency across the region.</p>
            `
        },
        "https://www.boereport.com/2017/11/23/teine-energy-ltd-announces-new-coo-and-vice-president-production/": {
            title: "New COO Appointment",
            date: "November 2017",
            short_summary: "<p>Teine Energy appointed Paul Ringrose as its new Senior VP and Chief Operating Officer to drive operational excellence and support growth.</p>",
            full_summary: "<p>Teine Energy Ltd. announced the strategic appointment of <strong>Mr. Paul Ringrose</strong> to the role of Senior Vice-President and Chief Operating Officer. Mr. Ringrose brings over two decades of extensive industry experience in operations and strategic development. His leadership is expected to be instrumental in driving operational excellence, optimizing production, and supporting the company's ambitious long-term growth strategy across its asset base.</p>"
        },
        "https://calgaryherald.com/business/energy/penn-west-sells-saskatchewan-assets-to-teine-energy-for-975m": {
            title: "Teine Acquires Penn West's Saskatchewan Assets",
            date: "December 2016",
            short_summary: "<p>In a landmark $975 million deal, Teine Energy acquired all of Penn West Petroleum's Saskatchewan assets, solidifying its dominance in the Viking light oil play.</p>",
            full_summary: `
                <p>Teine Energy executed a landmark transaction by acquiring all of Penn West Petroleum's Saskatchewan assets for <strong>$975 million</strong>. This deal was transformative, cementing Teine's position as a dominant force in the Viking light oil play, one of North America's most economically resilient oil plays.</p>
                <p>The acquisition provided Teine with a scalable, consolidated position and extensive infrastructure, including oil treating plants and water handling facilities. This strategic purchase was driven by Penn West's corporate objective to reduce debt, creating a timely opportunity for Teine to significantly expand its core operational area and production base.</p>
            `
        },
        // LATEST NEWS (for update button)
        "https://www.reuters.com/business/energy/teine-energy-announces-q2-2025-drilling-success-2025-06-28/": {
            title: "Teine Energy Announces Successful Q2 2025 Drilling Program",
            date: "June 2025",
            short_summary: "<p>Teine Energy reported a highly successful Q2 2025, with production exceeding forecasts due to strong results from its new horizontal wells in the Viking formation.</p>",
            full_summary: "<p>Teine Energy announced robust operational results for the second quarter of 2025, with production volumes significantly exceeding prior forecasts. The success was attributed to exceptional performance from newly completed horizontal wells in the Viking formation, which utilized advanced completion technologies. As a result of this outperformance and a positive outlook on commodity prices, the company announced it is increasing its capital expenditure budget for the second half of the year to accelerate development.</p>"
        },
        "https://www.calgaryherald.com/business/energy/canadian-oil-sands-production-hits-record-high-2025-05-15/": {
            title: "Canadian Oil Sands Production Hits Record High",
            date: "May 2025",
            short_summary: "<p>Canadian oil sands output reached an all-time high in May, driven by robust global demand and new pipeline capacity coming online.</p>",
            full_summary: "<p>Canada's oil sands production surged to a new record high in May 2025, a clear indicator of the strong global demand for heavy crude and the recent commissioning of new pipeline capacity. This increased output provides a bullish outlook for Canadian energy producers, who are well-positioned to capitalize on favorable market dynamics for the remainder of the year. The trend is expected to support continued investment in the sector.</p>"
        },
        "https://www.boereport.com/2025/04/20/teine-energy-releases-esg-report-highlighting-emissions-reduction/": {
            title: "Teine Releases 2025 ESG Report",
            date: "April 2025",
            short_summary: "<p>Teine Energy released its annual ESG report, highlighting a 15% reduction in methane emissions intensity since 2022 through equipment modernization.</p>",
            full_summary: "<p>In its 2025 Environmental, Social, and Governance (ESG) report, Teine Energy highlighted significant progress in its emissions reduction initiatives. The company reported a 15% decrease in methane emissions intensity compared to its 2022 baseline. This achievement was credited to a proactive equipment modernization program and the expansion of its Leak Detection and Repair (LDAR) initiatives across its core operational areas. The report underscores Teine's commitment to sustainable and responsible energy development.</p>"
        },
        "https://www.jwnenergy.com/article/2025/03/10/advancements-in-horizontal-drilling-technology-boost-viking-play-economics/": {
            title: "New Drilling Tech Boosts Viking Economics",
            date: "March 2025",
            short_summary: "<p>Recent advancements in multi-lateral horizontal drilling are significantly improving the economics of mature fields like the Viking play.</p>",
            full_summary: "<p>A recent report from JWN Energy highlighted that advancements in multi-lateral horizontal drilling and completion technologies are fundamentally improving the economics of mature oil fields, including the Viking play. Operators like Teine Energy are leveraging these innovations to increase reservoir contact from a single wellbore, thereby enhancing recovery rates and asset value, even in areas that have been developed for years. This technological evolution is key to sustaining production in established basins.</p>"
        },
        "https://www.worldoil.com/news/2025/02/05/global-oil-demand-forecast-revised-upward-on-strong-economic-growth/": {
            title: "Global Oil Demand Forecast Revised Upward",
            date: "February 2025",
            short_summary: "<p>The IEA has revised its global oil demand forecast upward for H2 2025, citing stronger-than-expected economic growth in Asia and North America.</p>",
            full_summary: "<p>The International Energy Agency (IEA) has officially revised its forecast for global oil demand upward for the second half of 2025. The revision is based on stronger-than-expected economic growth in key markets, particularly in Asia and North America. This adjustment signals a positive and stable pricing environment for crude oil, benefiting producers and supporting continued investment in exploration and production activities globally.</p>"
        }
    };

    const initialArticleKeys = [
        "https://www.boereport.com/2024/03/19/teine-energy-looks-to-sell-certain-non-core-oil-and-natural-gas-assets/",
        "https://www.boereport.com/2023/04/28/teine-energy-drilling-activity-in-year-prior-to-april-2023/",
        "https://www.reuters.com/business/energy/repsol-sells-canadian-oil-gas-assets-peyton-teine-energy-2022-09-07/",
        "https://www.boereport.com/2017/11/23/teine-energy-ltd-announces-new-coo-and-vice-president-production/",
        "https://calgaryherald.com/business/energy/penn-west-sells-saskatchewan-assets-to-teine-energy-for-975m"
    ];

    const latestArticleKeys = [
        "https://www.reuters.com/business/energy/teine-energy-announces-q2-2025-drilling-success-2025-06-28/",
        "https://www.calgaryherald.com/business/energy/canadian-oil-sands-production-hits-record-high-2025-05-15/",
        "https://www.boereport.com/2025/04/20/teine-energy-releases-esg-report-highlighting-emissions-reduction/",
        "https://www.jwnenergy.com/article/2025/03/10/advancements-in-horizontal-drilling-technology-boost-viking-play-economics/",
        "https://www.worldoil.com/news/2025/02/05/global-oil-demand-forecast-revised-upward-on-strong-economic-growth/"
    ];

    // --- Slideshow State ---
    let slideshowInterval;
    let currentSlideIndex = 0;

    /**
     * MOCK API FUNCTION
     * Fetches detailed article content from the data store.
     * @param {string} url - The URL of the article to fetch.
     * @returns {Promise<object>} A promise that resolves with the article object.
     */
    const fetchArticleDetails = (url) => {
        return new Promise(resolve => {
            setTimeout(() => { // Simulate network delay
                resolve(articleDataStore[url]);
            }, 500);
        });
    };

    // --- Functions ---

    const updateTimestamp = () => {
        const now = new Date();
        lastUpdatedTime.textContent = now.toLocaleString();
    };

    const renderNews = (articleKeys) => {
        newsTimeline.innerHTML = ''; // Clear existing news
        articleKeys.forEach(key => {
            const article = articleDataStore[key];
            if (article) {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <div class="news-header">
                        <div class="news-topic">${article.title}</div>
                        <div class="news-date">${article.date}</div>
                    </div>
                    <div class="news-summary">${article.short_summary}</div>
                    <div class="news-source">
                        <button class="source-btn" data-url="${key}">
                            <i class="fas fa-link"></i> View Source
                        </button>
                    </div>
                `;
                newsTimeline.appendChild(newsItem);
            }
        });
        attachModalListeners();
        startSlideshow(); // Start the slideshow after rendering news
    };

    const attachModalListeners = () => {
        document.querySelectorAll('.source-btn').forEach(button => {
            button.addEventListener('click', async () => {
                const url = button.dataset.url;
                
                // 1. Show modal with loading state
                modalTitle.innerText = 'Loading...';
                modalBody.innerHTML = '<p>Fetching latest details...</p>';
                modal.style.display = 'block';

                // 2. Fetch detailed content
                const content = await fetchArticleDetails(url);

                // 3. Populate modal with full content
                if (content) {
                    modalTitle.innerText = content.title;
                    modalBody.innerHTML = content.full_summary;
                    
                    // 4. Render chart if data exists
                    if (content.chartData) {
                        // Wait for the modal to be visible and then render the chart
                        requestAnimationFrame(() => {
                            const ctx = document.getElementById('asset-chart')?.getContext('2d');
                            if (ctx) {
                                new Chart(ctx, { type: 'bar', data: content.chartData, options: { scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } } });
                            }
                        });
                    }
                }
            });
        });
    };

    const fetchLatestNews = () => {
        stopSlideshow(); // Stop the current slideshow before fetching new news
        renderNews(latestArticleKeys);
        updateTimestamp();
    };

    const stopSlideshow = () => {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
    };

    const startSlideshow = () => {
        stopSlideshow(); // Stop any existing slideshow
        const slides = newsTimeline.querySelectorAll('.news-item');
        if (slides.length <= 2) { // No slideshow needed if 2 or fewer items
            slides.forEach(slide => slide.classList.add('active'));
            return;
        }

        currentSlideIndex = 0;

        const showCurrentSlides = () => {
            // Deactivate all slides first
            slides.forEach(slide => slide.classList.remove('active'));

            // Activate the current pair
            const firstSlide = slides[currentSlideIndex];
            const secondSlideIndex = (currentSlideIndex + 1) % slides.length;
            const secondSlide = slides[secondSlideIndex];

            if (firstSlide) firstSlide.classList.add('active');
            if (secondSlide) secondSlide.classList.add('active');
        };

        showCurrentSlides(); // Show initial pair

        slideshowInterval = setInterval(() => {
            // Move to the next pair of slides
            currentSlideIndex = (currentSlideIndex + 2) % slides.length;
            // If we have an odd number of slides, the last step will have an odd index.
            // This ensures we don't skip the last slide and loop correctly.
            if (slides.length % 2 !== 0 && currentSlideIndex === 1) {
                currentSlideIndex = 0;
            }

            showCurrentSlides();
        }, 5000); // 5-second interval
    };

    // --- Event Listeners ---
    closeButton.addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', (event) => { if (event.target == modal) { modal.style.display = 'none'; } });
    updateNewsBtn.addEventListener('click', fetchLatestNews);

    // --- Initial Load ---
    renderNews(initialArticleKeys); // Render the old news initially
    updateTimestamp();
});
