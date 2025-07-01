document.addEventListener('DOMContentLoaded', function() {
    const mapElement = document.getElementById('asset-map-leaflet');
    
    if (mapElement) {
        // Create an observer to watch for when the map container becomes visible
        const observer = new IntersectionObserver((entries, obs) => {
            // Check if the map container is intersecting the viewport (i.e., is visible)
            if (entries[0].isIntersecting) {
                initializeMap();
                // Stop observing once the map is initialized
                obs.unobserve(mapElement);
            }
        }, {
            // Options: trigger when the element is at least partially visible
            threshold: 0.1 
        });

        // Start observing the map container
        observer.observe(mapElement);
    }
});

function initializeMap() {
    const map = L.map('asset-map-leaflet').setView([51.5, -109.5], 6);

    // Add a small delay to invalidate the size, allowing the container to render fully.
    setTimeout(() => {
        map.invalidateSize();
    }, 150);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const assets = [
        {
            name: 'Viking',
            coords: [52.5, -108.5],
            production: '28,000 boe/d',
            land: '800,000 acres',
            color: '#E84B37',
            description: "Teine Energy, the largest producer in the Viking oil play, operates on 800,000 net acres in southwestern Saskatchewan."
        },
        {
            name: 'Bakken',
            coords: [49.5, -103.0],
            production: '9,000 boe/d',
            land: 'N/A',
            color: '#28a745',
            description: "Teine Energy operates in the western Saskatchewan portion of the Bakken Formation."
        },
        {
            name: 'Duvernay',
            coords: [53.5, -115.0],
            production: '2,000 boe/d',
            land: '300,000 acres',
            color: '#17a2b8',
            description: "Teine Energy is strategically positioned in Canada\'s first shale oil play, in the light oil of the Duvernay. Their land is strategically situated between two large energy service hubs with pre-existing egress to the Edmonton refining hub."
        },
        {
            name: 'Chauvin',
            coords: [52.8, -110.0],
            production: '7,000 boe/d',
            land: 'N/A',
            color: '#ffc107',
            description: "Central Alberta Midstream and Marketing business with assets consisting of custom treating facilities, truck terminals and a 75km singe shipper pipeline that connects Chauvin to the Hardisty hub.",
        }
    ];

    assets.forEach(asset => {
        const marker = L.marker(asset.coords, {
            icon: L.divIcon({
                className: 'custom-marker-container', // Use a container class
                html: `
                    <div class="marker-pin" style="background-color: ${asset.color};"></div>
                    <div class="marker-label">${asset.name}</div>
                `,
                iconSize: [80, 40],   // Width and height of the icon
                iconAnchor: [15, 40], // Point of the icon which will correspond to marker's location
                popupAnchor: [0, -25] // Point from which the popup should open relative to the iconAnchor
            })
        }).addTo(map);

        // Bind a popup that opens on click (default behavior)
        marker.bindPopup(`
            <div class="asset-popup-content">
                <div class="tooltip-title" style="border-left-color: ${asset.color};">${asset.name}</div>
                <div class="tooltip-metric"><strong>Productivity:</strong> ${asset.production}</div>
                <div class="tooltip-metric"><strong>Land:</strong> ${asset.land}</div>
                <div class="tooltip-section">
                    <p>${asset.description}</p>
                </div>
                ${asset.other ? `
                <div class="tooltip-section">
                    <p>${asset.other}</p>
                </div>
                ` : ''}
            </div>
        `, { 
            maxWidth: 350,
            minWidth: 300,
            className: 'asset-custom-popup'
        });
    });
}
