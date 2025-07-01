        // Financial data management
        let financialData = null;
        let isLoading = false;
        
        // Initialize financial data on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadFinancialData();
            
            // Set up update button
            const updateBtn = document.getElementById('update-financial-data');
            if (updateBtn) {
                updateBtn.addEventListener('click', function() {
                    if (!isLoading) {
                        loadFinancialData(true);
                    }
                });
            }
        });
        
        async function loadFinancialData(forceUpdate = false) {
            if (isLoading) return;
            
            isLoading = true;
            const container = document.getElementById('live-data-container');
            const updateBtn = document.getElementById('update-financial-data');
            const lastUpdated = document.getElementById('last-updated');
            
            // Show loading state
            if (forceUpdate) {
                container.innerHTML = `
                    <div class="loading-spinner">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p>Updating market data...</p>
                    </div>
                `;
                updateBtn.disabled = true;
                updateBtn.innerHTML = '🔄 Updating...';
            }
            
            try {
                // Mock data for demo - replace with real API later
                const data = {
                    comparable_stocks: {
                        'TSX': { current_price: 245.67, currency: 'CAD', change: '+2.34', change_percent: '+0.96', trend: 'up' },
                        'ENB': { current_price: 52.15, currency: 'CAD', change: '-0.23', change_percent: '-0.44', trend: 'down' }
                    },
                    indices: {
                        'TSX': { name: 'TSX Composite', current_price: '22,154.32', change: '+45.67', change_percent: '+0.21', trend: 'up' }
                    },
                    last_updated: new Date().toLocaleString()
                };
                
                financialData = data;
                renderFinancialData(data);
                
                if (lastUpdated) {
                    lastUpdated.textContent = `Last updated: ${data.last_updated || 'Unknown'}`;
                }
                
            } catch (error) {
                console.error('Error loading financial data:', error);
                renderFallbackData();
                
                if (lastUpdated) {
                    lastUpdated.textContent = 'Data unavailable';
                }
            } finally {
                isLoading = false;
                if (updateBtn) {
                    updateBtn.disabled = false;
                    updateBtn.innerHTML = '🔄 Update Data';
                }
            }
        }
        
        function renderFinancialData(data) {
            const container = document.getElementById('live-data-container');
            let html = '';
            
            // Comparable Stocks Section with detailed info
            if (data.comparable_stocks && Object.keys(data.comparable_stocks).length > 0) {
                html += `<div class="stocks-section">`;
                html += `<div class="section-title">🏢 Comparable Energy Companies</div>`;
                
                Object.entries(data.comparable_stocks).forEach(([symbol, stock]) => {
                    const trendClass = stock.trend === 'up' ? 'trend-up' : stock.trend === 'down' ? 'trend-down' : 'trend-neutral';
                    const trendIcon = stock.trend === 'up' ? '↗' : stock.trend === 'down' ? '↘' : '→';
                    
                    // Add company names for context
                    const companyNames = {
                        'TSX': 'Toronto Stock Exchange Index',
                        'ENB': 'Enbridge Inc. - Energy Pipeline'
                    };
                    
                    html += `
                        <div class="detailed-stock-card">
                            <div class="stock-header">
                                <div>
                                    <div class="stock-symbol">${symbol}</div>
                                    <div class="stock-company">${companyNames[symbol] || 'Energy Sector Company'}</div>
                                </div>
                                <div class="stock-price-info">
                                    <div class="stock-price">$${stock.current_price} ${stock.currency}</div>
                                    <div class="stock-change ${trendClass}">
                                        <span class="trend-icon">${trendIcon}</span>
                                        ${stock.change} (${stock.change_percent}%)
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                html += `</div>`;
            }
            
            // Market Indices Section with detailed info
            if (data.indices && Object.keys(data.indices).length > 0) {
                html += `<div class="indices-section">`;
                html += `<div class="section-title">📊 Canadian Market Indices</div>`;
                
                Object.entries(data.indices).forEach(([symbol, index]) => {
                    const trendClass = index.trend === 'up' ? 'trend-up' : index.trend === 'down' ? 'trend-down' : 'trend-neutral';
                    const trendIcon = index.trend === 'up' ? '↗' : index.trend === 'down' ? '↘' : '→';
                    
                    // Add detailed index descriptions
                    const indexDescriptions = {
                        'TSX': 'Toronto Stock Exchange Composite - Canada main stock market index'
                    };
                    
                    html += `
                        <div class="detailed-stock-card">
                            <div class="stock-header">
                                <div>
                                    <div class="stock-symbol">${symbol} Composite</div>
                                    <div class="stock-company">${indexDescriptions[symbol] || index.name}</div>
                                </div>
                                <div class="stock-price-info">
                                    <div class="stock-price">${index.current_price}</div>
                                    <div class="stock-change ${trendClass}">
                                        <span class="trend-icon">${trendIcon}</span>
                                        ${index.change} (${index.change_percent}%)
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                html += `</div>`;
            }
            
            container.innerHTML = html;
        }
        
        function renderFallbackData() {
            const container = document.getElementById('live-data-container');
            container.innerHTML = `
                <div class="fallback-message">
                    <p>Could not load live financial data at the moment.</p>
                    <p>Displaying static information instead.</p>
                </div>
            `;
        }
