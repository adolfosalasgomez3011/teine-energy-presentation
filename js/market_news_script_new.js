// Simple Market News Script - Global Functions

// Define all functions globally so onclick handlers work
function refreshNews() {
    console.log('Refresh News clicked');
    
    const refreshBtn = document.querySelector('[onclick*="refreshNews"]');
    const icon = refreshBtn?.querySelector('i');
    
    if (icon) {
        icon.style.animation = 'spin 1s linear infinite';
        setTimeout(() => {
            icon.style.animation = 'none';
        }, 1000);
    }
    
    updateNewsTimestamps();
}

function updateNewsTimestamps() {
    const dateElements = document.querySelectorAll('.news-date');
    const currentDates = [
        'July 2025',
        'June 2025', 
        'May 2025',
        'April 2025',
        'March 2025'
    ];
    
    dateElements.forEach((element, index) => {
        if (currentDates[index]) {
            element.textContent = currentDates[index];
            element.style.color = '#E84B37';
            element.style.fontWeight = '600';
            setTimeout(() => {
                element.style.color = '';
                element.style.fontWeight = '';
            }, 2000);
        }
    });
}

function exportReport() {
    console.log('Export Report clicked');
    
    const reportContent = `
        <h3 style="color: #E84B37; margin-bottom: 20px;">📊 Teine Energy Market Intelligence Report</h3>
        <div style="text-align: left; line-height: 1.6; max-height: 400px; overflow-y: auto;">
            <h4 style="color: #E84B37; margin: 20px 0 10px 0;">Executive Summary</h4>
            <p>• Current Production: 26,847 BOE/day (+8.5% QoQ)</p>
            <p>• Revenue Run Rate: $785M annually (estimated)</p>
            <p>• Active Wells: 47 producing, 3 drilling, 12 planned</p>
            <p>• Market Position: Top 3 independent in Saskatchewan</p>
            
            <h4 style="color: #E84B37; margin: 20px 0 10px 0;">Financial Highlights</h4>
            <p>• Q1 2025 Cash Flow: $89M (+15% YoY)</p>
            <p>• Capital Expenditure: $125M (2025 budget)</p>
            <p>• Debt-to-Equity: 0.35 (industry leading)</p>
            <p>• Dividend Yield: 4.2% (sustainable)</p>
        </div>
    `;
    
    showModal('Market Intelligence Report', reportContent);
}

function subscribeAlerts() {
    console.log('Subscribe Alerts clicked');
    
    const alertContent = `
        <h3 style="color: #E84B37; margin-bottom: 20px;">🔔 Market Alert Subscription</h3>
        <div style="text-align: left; line-height: 1.6;">
            <h4 style="color: #E84B37;">Alert Categories:</h4>
            <p>✅ Production Updates: Daily/weekly reports</p>
            <p>✅ Financial News: Earnings, acquisitions</p>
            <p>✅ Market Intelligence: Prices, competitor analysis</p>
            
            <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
                <strong>✅ Subscription Confirmed</strong><br>
                You will receive alerts starting tomorrow at 7:00 AM MST.
            </div>
        </div>
    `;
    
    showModal('Market Alert Subscription', alertContent);
}

function openNewsDetail(newsId) {
    console.log('Opening news detail for ID:', newsId);
    
    const newsData = {
        1: `<h2 style="color: #E84B37;">Strategic Asset Divestment Analysis</h2>
            <h4 style="color: #E84B37;">Financial Impact</h4>
            <p><strong>Asset Value:</strong> $3.35M net value</p>
            <p><strong>Production:</strong> 117 BOE/day average</p>
            <p><strong>Revenue Impact:</strong> $2.55M net operating income</p>
            <p><strong>Expected ROI:</strong> 15% capital efficiency improvement</p>
            
            <h4 style="color: #E84B37;">Strategic Rationale</h4>
            <p><strong>Focus:</strong> Concentrate on core Viking formation</p>
            <p><strong>Market Impact:</strong> Strengthened primary operations</p>
            <p><strong>Capital Allocation:</strong> Redirect to higher-return opportunities</p>`,
            
        2: `<h2 style="color: #E84B37;">2024 Drilling Campaign Results</h2>
            <h4 style="color: #E84B37;">Campaign Performance</h4>
            <p><strong>Total Wells:</strong> 295 wells spudded</p>
            <p><strong>Success Rate:</strong> 94% completion (vs 87% industry avg)</p>
            <p><strong>Production Increase:</strong> +18% year-over-year</p>
            <p><strong>Cost Efficiency:</strong> $2.1M per well (15% under budget)</p>
            
            <h4 style="color: #E84B37;">Future Outlook</h4>
            <p><strong>2025 Program:</strong> 150 additional wells planned</p>
            <p><strong>Technology:</strong> Enhanced completion techniques</p>
            <p><strong>Target Areas:</strong> Viking and Duvernay formations</p>`,
            
        3: `<h2 style="color: #E84B37;">Repsol Acquisition Integration</h2>
            <h4 style="color: #E84B37;">Acquisition Details</h4>
            <p><strong>Assets:</strong> 95,000 net acres in Chauvin South</p>
            <p><strong>Production:</strong> 6,800 BOE/day current rate</p>
            <p><strong>Integration:</strong> 98% complete, 6 months ahead</p>
            
            <h4 style="color: #E84B37;">Financial Benefits</h4>
            <p><strong>Synergies:</strong> $12M annual savings realized</p>
            <p><strong>ROI:</strong> 22% internal rate of return</p>
            <p><strong>Infrastructure:</strong> 1,800km pipeline network operational</p>`,
            
        4: `<h2 style="color: #E84B37;">Leadership: Paul Ringrose</h2>
            <h4 style="color: #E84B37;">Professional Background</h4>
            <p><strong>Experience:</strong> 20+ years energy sector operations</p>
            <p><strong>Previous Role:</strong> VP Operations, major Canadian producer</p>
            <p><strong>Education:</strong> P.Eng, MBA Operations Management</p>
            
            <h4 style="color: #E84B37;">Key Achievements</h4>
            <p><strong>Operational Excellence:</strong> 30% efficiency improvements</p>
            <p><strong>Cost Management:</strong> $50M annual savings programs</p>
            <p><strong>Team Leadership:</strong> 200+ operational staff</p>`,
            
        5: `<h2 style="color: #E84B37;">Penn West Acquisition Legacy</h2>
            <h4 style="color: #E84B37;">Historical Investment</h4>
            <p><strong>Investment:</strong> $975M strategic acquisition (2017)</p>
            <p><strong>Asset Quality:</strong> Premier Saskatchewan light oil plays</p>
            <p><strong>Strategic Value:</strong> Regional asset consolidation</p>
            
            <h4 style="color: #E84B37;">Long-term Impact</h4>
            <p><strong>15-year NPV:</strong> $2.1B projected value</p>
            <p><strong>Market Position:</strong> Dominant regional presence</p>
            <p><strong>Foundation:</strong> Basis for current market leadership</p>`
    };
    
    const content = newsData[newsId] || '<h2>News Analysis</h2><p>Detailed analysis loading...</p>';
    showModal('Detailed Analysis', content);
}

function openSource(sourceName) {
    console.log('Opening source:', sourceName);
    
    const sourceData = {
        'BOE Report': `
            <h3 style="color: #E84B37;">📋 Board of Energy Database</h3>
            <h4>Recent Submissions:</h4>
            <ul>
                <li>Q1 2025 Production Report: 24,500 BOE/day</li>
                <li>Environmental Compliance: Renewed</li>
                <li>Well Licenses: 47 pending approval</li>
            </ul>
            <p><strong>Status:</strong> ✅ All requirements met</p>
        `,
        'Operations Report': `
            <h3 style="color: #E84B37;">⚙️ Operations Dashboard</h3>
            <h4>Current Production:</h4>
            <ul>
                <li>Total: 26,847 BOE/day</li>
                <li>Viking Formation: 18,500 BOE/day (69%)</li>
                <li>Duvernay: 4,200 BOE/day (16%)</li>
                <li>Chauvin South: 4,147 BOE/day (15%)</li>
            </ul>
            <p><strong>Uptime:</strong> 97.2% (industry leading)</p>
        `,
        'Reuters': `
            <h3 style="color: #E84B37;">🌍 Energy Market Data</h3>
            <h4>Current Prices:</h4>
            <ul>
                <li>WTI Crude: $78.45/barrel (+2.3%)</li>
                <li>Western Canada Select: $71.20/barrel</li>
                <li>Natural Gas (AECO): $2.85/GJ</li>
            </ul>
            <p><strong>Trend:</strong> Canadian energy investment up 15% YoY</p>
        `,
        'Business Wire': `
            <h3 style="color: #E84B37;">📢 Corporate Communications</h3>
            <h4>Recent Announcements:</h4>
            <ul>
                <li>CEO Letter to Shareholders (June 2025)</li>
                <li>Q1 2025 Earnings Call Transcript</li>
                <li>Strategic Vision 2025-2030 Roadmap</li>
            </ul>
            <p><strong>Upcoming:</strong> Q2 Earnings Call - Aug 15, 2025</p>
        `,
        'Calgary Herald': `
            <h3 style="color: #E84B37;">📰 Regional Energy News</h3>
            <h4>Teine Energy Coverage:</h4>
            <ul>
                <li>"Teine leads Viking formation efficiency" (June 2025)</li>
                <li>"Local company expands Saskatchewan ops" (May 2025)</li>
                <li>"Innovation in drilling techniques" (April 2025)</li>
            </ul>
            <p><strong>Context:</strong> Alberta production at 5-year high</p>
        `
    };
    
    const content = sourceData[sourceName] || `<h3>📄 ${sourceName}</h3><p>External data source connected.</p>`;
    showModal(`Source: ${sourceName}`, content);
}

function showModal(title, content) {
    // Remove existing modal
    const existing = document.getElementById('detail-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'detail-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8); display: flex; align-items: center; 
        justify-content: center; z-index: 99999; font-family: Inter, sans-serif;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; max-width: 90%; max-height: 90%; overflow-y: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="background: linear-gradient(135deg, #E84B37 0%, #E75300 100%); color: white; padding: 20px 30px; border-radius: 12px 12px 0 0; position: relative;">
                <h2 style="margin: 0; font-size: 1.4rem; padding-right: 40px;">${title}</h2>
                <button onclick="document.getElementById('detail-modal').remove()" style="position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.2); border: none; color: white; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; font-size: 18px;">×</button>
            </div>
            <div style="padding: 30px; line-height: 1.6; color: #333;">
                ${content}
                <div style="margin-top: 30px; text-align: center;">
                    <button onclick="document.getElementById('detail-modal').remove()" style="background: linear-gradient(135deg, #E84B37 0%, #E75300 100%); color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.remove();
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Market News Dashboard Ready');
    
    // Add smooth animations
    const cards = document.querySelectorAll('.news-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
    document.head.appendChild(style);
});

console.log('✅ All functions loaded globally');
