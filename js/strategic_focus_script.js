// Strategic Focus Slide Interactive Elements
// Handles live data widgets and metric activation

class StrategicFocusInteractivity {
    constructor() {
        this.widgets = [];
        this.isDataLoaded = false;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupWidgets());
        } else {
            this.setupWidgets();
        }
    }

    setupWidgets() {
        // Setup each widget with interactive elements
        this.setupCostEfficiencyWidget();
        this.setupProductionWidget();
        this.setupRecoveryWidget();
        
        // Add global refresh button
        this.addGlobalRefreshButton();
    }

    setupCostEfficiencyWidget() {
        const container = document.querySelector('.strategic-focus-card.cost-efficiency .strategic-chart-container') || 
                         document.querySelector('.strategic-focus-card:nth-child(1) .strategic-chart-container');
        
        if (container) {
            container.innerHTML = `
                <div class="metric-controls mb-2">
                    <button class="btn btn-sm btn-outline-primary activate-metric" data-metric="cost">
                        <i class="fas fa-play"></i> Activate Metrics
                    </button>
                    <button class="btn btn-sm btn-outline-secondary refresh-metric" data-metric="cost" style="display: none;">
                        <i class="fas fa-sync"></i> Refresh
                    </button>
                </div>
                <div class="metric-dashboard" id="cost-dashboard" style="display: none;">
                    <div class="row">
                        <div class="col-6">
                            <div class="metric-value">
                                <span class="value">$12.50</span>
                                <span class="label">Cost/BOE</span>
                                <span class="trend trend-down">↓ 8%</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="metric-value">
                                <span class="value">94.2%</span>
                                <span class="label">Efficiency</span>
                                <span class="trend trend-up">↑ 3%</span>
                            </div>
                        </div>
                    </div>
                    <canvas id="cost-chart" width="100" height="35"></canvas>
                </div>
            `;
            
            this.bindWidgetEvents(container, 'cost');
        }
    }

    setupProductionWidget() {
        const container = document.querySelector('.strategic-focus-card.productivity .strategic-chart-container') || 
                         document.querySelector('.strategic-focus-card:nth-child(2) .strategic-chart-container');
        
        if (container) {
            container.innerHTML = `
                <div class="metric-controls mb-2">
                    <button class="btn btn-sm btn-outline-primary activate-metric" data-metric="production">
                        <i class="fas fa-play"></i> Activate Metrics
                    </button>
                    <button class="btn btn-sm btn-outline-secondary refresh-metric" data-metric="production" style="display: none;">
                        <i class="fas fa-sync"></i> Refresh
                    </button>
                </div>
                <div class="metric-dashboard" id="production-dashboard" style="display: none;">
                    <div class="row">
                        <div class="col-6">
                            <div class="metric-value">
                                <span class="value">1,248</span>
                                <span class="label">BOE/Day</span>
                                <span class="trend trend-up">↑ 12%</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="metric-value">
                                <span class="value">96.8%</span>
                                <span class="label">Uptime</span>
                                <span class="trend trend-up">↑ 5%</span>
                            </div>
                        </div>
                    </div>
                    <canvas id="production-chart" width="100" height="35"></canvas>
                </div>
            `;
            
            this.bindWidgetEvents(container, 'production');
        }
    }

    setupRecoveryWidget() {
        const container = document.querySelector('.strategic-focus-card.recovery .strategic-chart-container') || 
                         document.querySelector('.strategic-focus-card:nth-child(3) .strategic-chart-container');
        
        if (container) {
            container.innerHTML = `
                <div class="metric-controls mb-2">
                    <button class="btn btn-sm btn-outline-primary activate-metric" data-metric="recovery">
                        <i class="fas fa-play"></i> Activate Metrics
                    </button>
                    <button class="btn btn-sm btn-outline-secondary refresh-metric" data-metric="recovery" style="display: none;">
                        <i class="fas fa-sync"></i> Refresh
                    </button>
                </div>
                <div class="metric-dashboard" id="recovery-dashboard" style="display: none;">
                    <div class="row">
                        <div class="col-6">
                            <div class="metric-value">
                                <span class="value">23.4%</span>
                                <span class="label">Recovery Rate</span>
                                <span class="trend trend-up">↑ 6%</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="metric-value">
                                <span class="value">8.2M</span>
                                <span class="label">Barrels</span>
                                <span class="trend trend-up">↑ 15%</span>
                            </div>
                        </div>
                    </div>
                    <canvas id="recovery-chart" width="100" height="35"></canvas>
                </div>
            `;
            
            this.bindWidgetEvents(container, 'recovery');
        }
    }

    bindWidgetEvents(container, metricType) {
        const activateBtn = container.querySelector('.activate-metric');
        const refreshBtn = container.querySelector('.refresh-metric');
        const dashboard = container.querySelector('.metric-dashboard');

        if (activateBtn) {
            activateBtn.addEventListener('click', () => {
                this.activateMetric(metricType, activateBtn, refreshBtn, dashboard);
            });
        }

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshMetric(metricType);
            });
        }
    }

    activateMetric(metricType, activateBtn, refreshBtn, dashboard) {
        // Show loading state
        activateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        activateBtn.disabled = true;

        // Simulate data loading
        setTimeout(() => {
            // Hide activate button, show refresh button and dashboard
            activateBtn.style.display = 'none';
            refreshBtn.style.display = 'inline-block';
            dashboard.style.display = 'block';

            // Draw chart
            this.drawChart(metricType);

            // Add animation to metrics
            this.animateMetrics(dashboard);
        }, 1500);
    }

    refreshMetric(metricType) {
        const refreshBtn = document.querySelector(`[data-metric="${metricType}"].refresh-metric`);
        const dashboard = document.getElementById(`${metricType}-dashboard`);

        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            refreshBtn.disabled = true;

            setTimeout(() => {
                // Update values with slight randomization
                this.updateMetricValues(dashboard);
                
                // Redraw chart
                this.drawChart(metricType);

                refreshBtn.innerHTML = '<i class="fas fa-sync"></i> Refresh';
                refreshBtn.disabled = false;
            }, 1000);
        }
    }

    drawChart(metricType) {
        const canvas = document.getElementById(`${metricType}-chart`);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Generate sample data
        const dataPoints = this.generateSampleData(metricType);

        // Draw background
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);

        // Draw grid lines
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= 4; i++) {
            const y = (height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw chart line
        ctx.strokeStyle = '#E75300';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const stepX = width / (dataPoints.length - 1);
        dataPoints.forEach((point, index) => {
            const x = index * stepX;
            const y = height - (point * height);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Draw data points
        ctx.fillStyle = '#E75300';
        dataPoints.forEach((point, index) => {
            const x = index * stepX;
            const y = height - (point * height);
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    generateSampleData(metricType) {
        const baseData = {
            cost: [0.6, 0.7, 0.5, 0.8, 0.6, 0.9, 0.7, 0.8],
            production: [0.4, 0.6, 0.8, 0.7, 0.9, 0.8, 0.6, 0.9],
            recovery: [0.3, 0.5, 0.7, 0.6, 0.8, 0.9, 0.7, 0.8]
        };
        
        return baseData[metricType] || baseData.cost;
    }

    updateMetricValues(dashboard) {
        const values = dashboard.querySelectorAll('.metric-value .value');
        values.forEach(valueEl => {
            // Add subtle variation to simulate real-time updates
            const currentText = valueEl.textContent;
            if (currentText.includes('$')) {
                const currentValue = parseFloat(currentText.replace('$', ''));
                const variation = (Math.random() - 0.5) * 0.5;
                valueEl.textContent = `$${(currentValue + variation).toFixed(2)}`;
            } else if (currentText.includes('%')) {
                const currentValue = parseFloat(currentText.replace('%', ''));
                const variation = (Math.random() - 0.5) * 2;
                valueEl.textContent = `${(currentValue + variation).toFixed(1)}%`;
            }
        });
    }

    animateMetrics(dashboard) {
        const metrics = dashboard.querySelectorAll('.metric-value');
        metrics.forEach((metric, index) => {
            metric.style.opacity = '0';
            metric.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                metric.style.transition = 'all 0.3s ease';
                metric.style.opacity = '1';
                metric.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    addGlobalRefreshButton() {
        const header = document.querySelector('.strategic-focus-header');
        if (header && !header.querySelector('.global-refresh')) {
            const refreshAllBtn = document.createElement('button');
            refreshAllBtn.className = 'btn btn-sm btn-outline-light global-refresh ms-3';
            refreshAllBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh All Data';
            refreshAllBtn.style.float = 'right';
            refreshAllBtn.style.marginTop = '10px';
            
            refreshAllBtn.addEventListener('click', () => {
                ['cost', 'production', 'recovery'].forEach(metric => {
                    const refreshBtn = document.querySelector(`[data-metric="${metric}"].refresh-metric`);
                    if (refreshBtn && refreshBtn.style.display !== 'none') {
                        refreshBtn.click();
                    }
                });
            });
            
            header.appendChild(refreshAllBtn);
        }
    }
}

// Custom CSS for the interactive elements
const customCSS = `
    .metric-controls {
        text-align: center;
        margin-bottom: 6px;
    }
    
    .metric-dashboard {
        background: white;
        border-radius: 6px;
        padding: 8px;
        border: 1px solid #dee2e6;
        max-width: 100%;
        overflow: hidden;
        min-height: 100px;
        height: auto;
    }
    
    .metric-dashboard .row {
        margin: 0 -3px;
        gap: 0;
    }
    
    .metric-dashboard .col-6 {
        padding: 0 3px;
        flex: 0 0 50%;
        max-width: 50%;
    }
    
    .metric-value {
        text-align: center;
        padding: 6px 4px;
        background: #f8f9fa;
        border-radius: 4px;
        margin-bottom: 6px;
        min-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .metric-value .value {
        display: block;
        font-weight: bold;
        font-size: 1rem;
        color: #E75300;
        line-height: 1.2;
        margin-bottom: 2px;
    }
    
    .metric-value .label {
        display: block;
        font-size: 0.7rem;
        color: #666;
        margin: 2px 0;
        line-height: 1.1;
    }
    
    .metric-value .trend {
        display: block;
        font-size: 0.7rem;
        font-weight: bold;
        line-height: 1.1;
        margin-top: 2px;
    }
    
    .trend-up {
        color: #28a745;
    }
    
    .trend-down {
        color: #dc3545;
    }
    
    .activate-metric, .refresh-metric {
        font-size: 0.7rem !important;
        padding: 3px 8px !important;
        border-radius: 4px !important;
    }
    
    .global-refresh {
        position: absolute;
        right: 20px;
        top: 15px;
        font-size: 0.7rem !important;
        padding: 4px 8px !important;
    }
    
    /* Chart with appropriate size */
    .strategic-chart-container canvas {
        max-width: 100%;
        height: 35px !important;
        margin-top: 6px;
    }
    
    /* Strategic live widget with proper spacing */
    .strategic-live-widget {
        margin-top: 6px;
        padding: 6px;
        max-height: 160px;
        overflow: visible;
        border-radius: 4px;
    }
    
    .strategic-widget-title {
        font-size: 0.7rem;
        margin-bottom: 4px;
        line-height: 1.2;
    }
    
    /* Ensure cards accommodate content properly */
    .strategic-focus-card {
        overflow: visible;
        min-height: 420px;
    }
    
    .strategic-card-content {
        overflow: visible;
        padding: 10px !important;
    }
    
    /* Restore proper bullet point styling */
    .strategic-bullet-points {
        margin-bottom: 8px !important;
        list-style: none !important;
        padding: 0 !important;
    }
    
    .strategic-bullet-points li {
        font-size: 0.8rem !important;
        line-height: 1.3 !important;
        margin-bottom: 3px !important;
        padding: 2px 0 2px 20px !important;
        position: relative !important;
        color: #333 !important;
    }
    
    .strategic-bullet-points li::before {
        content: "▶" !important;
        color: #E75300 !important;
        position: absolute !important;
        left: 0 !important;
        top: 2px !important;
        font-size: 0.7rem !important;
    }
    
    .strategic-card-title {
        font-size: 1rem !important;
        margin-bottom: 8px !important;
    }
    
    .strategic-card-icon {
        font-size: 1.2rem !important;
    }
`;

// Add custom CSS to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = customCSS;
document.head.appendChild(styleSheet);

// Initialize the interactive functionality
new StrategicFocusInteractivity();
