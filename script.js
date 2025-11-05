// Global variables
let map;
let markers = [];
let locations = [];
let directionsService;
let directionsRenderer;
let geocoder;

// Sri Lanka center coordinates
const SRI_LANKA_CENTER = { lat: 7.8731, lng: 80.7718 };

// Initialize map
function initMap() {
    // Create map centered on Sri Lanka
    map = new google.maps.Map(document.getElementById('map'), {
        center: SRI_LANKA_CENTER,
        zoom: 7.5,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });

    // Initialize services
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: false,
        polylineOptions: {
            strokeColor: '#667eea',
            strokeWeight: 4,
            strokeOpacity: 0.8
        }
    });
    geocoder = new google.maps.Geocoder();

    // Set up autocomplete for location input
    const input = document.getElementById('locationInput');
    const autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'lk' }, // Restrict to Sri Lanka
        fields: ['formatted_address', 'geometry', 'name']
    });

    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            addLocationFromPlace(place);
        }
    });

    // Set up event listeners
    document.getElementById('addLocationBtn').addEventListener('click', addLocation);
    document.getElementById('clearAllBtn').addEventListener('click', clearAll);
    document.getElementById('optimizeRouteBtn').addEventListener('click', optimizeRoute);

    // Allow Enter key to add location
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addLocation();
        }
    });
}

// Add location from place object (autocomplete)
function addLocationFromPlace(place) {
    const location = {
        name: place.name || place.formatted_address,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
    };

    addLocationToItinerary(location);
    document.getElementById('locationInput').value = '';
}

// Add location from text input
function addLocation() {
    const input = document.getElementById('locationInput');
    const locationName = input.value.trim();

    if (!locationName) {
        alert('Please enter a location');
        return;
    }

    // Geocode the location (restricted to Sri Lanka)
    geocoder.geocode({
        address: locationName + ', Sri Lanka',
        componentRestrictions: { country: 'lk' }
    }, function(results, status) {
        if (status === 'OK' && results[0]) {
            const location = {
                name: locationName,
                address: results[0].formatted_address,
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            };
            addLocationToItinerary(location);
            input.value = '';
        } else {
            alert('Location not found in Sri Lanka. Please try a different name.');
        }
    });
}

// Add location to itinerary
function addLocationToItinerary(location) {
    locations.push(location);

    // Add marker
    const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name,
        label: {
            text: String(locations.length),
            color: 'white',
            fontWeight: 'bold'
        },
        animation: google.maps.Animation.DROP
    });

    markers.push(marker);

    // Update UI
    updateLocationsList();
    drawRoute();

    // Pan to latest location
    map.panTo({ lat: location.lat, lng: location.lng });
}

// Update locations list in UI
function updateLocationsList() {
    const listContainer = document.getElementById('locationsList');

    if (locations.length === 0) {
        listContainer.innerHTML = '<div class="empty-message">No destinations added yet. Start planning your journey!</div>';
        return;
    }

    listContainer.innerHTML = '';

    locations.forEach((location, index) => {
        const item = document.createElement('div');
        item.className = 'location-item';
        item.innerHTML = `
            <div class="location-info">
                <div class="location-number">${index + 1}</div>
                <div class="location-name">${location.name}</div>
            </div>
            <button class="remove-btn" onclick="removeLocation(${index})">Remove</button>
        `;
        listContainer.appendChild(item);
    });
}

// Remove location
function removeLocation(index) {
    locations.splice(index, 1);
    markers[index].setMap(null);
    markers.splice(index, 1);

    // Update marker labels
    markers.forEach((marker, i) => {
        marker.setLabel({
            text: String(i + 1),
            color: 'white',
            fontWeight: 'bold'
        });
    });

    updateLocationsList();
    drawRoute();
}

// Clear all locations
function clearAll() {
    if (locations.length === 0) return;

    if (confirm('Are you sure you want to clear all locations?')) {
        locations = [];
        markers.forEach(marker => marker.setMap(null));
        markers = [];
        directionsRenderer.setMap(null);
        directionsRenderer.setMap(map);
        updateLocationsList();
        map.setCenter(SRI_LANKA_CENTER);
        map.setZoom(7.5);
    }
}

// Draw route between locations
function drawRoute() {
    if (locations.length < 2) {
        directionsRenderer.setDirections({ routes: [] });
        return;
    }

    const waypoints = locations.slice(1, -1).map(loc => ({
        location: { lat: loc.lat, lng: loc.lng },
        stopover: true
    }));

    const request = {
        origin: { lat: locations[0].lat, lng: locations[0].lng },
        destination: { lat: locations[locations.length - 1].lat, lng: locations[locations.length - 1].lng },
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            // Clear existing markers
            markers.forEach(marker => marker.setMap(null));
            markers = [];

            // Show directions
            directionsRenderer.setDirections(result);

            // Add custom numbered markers
            locations.forEach((location, index) => {
                const marker = new google.maps.Marker({
                    position: { lat: location.lat, lng: location.lng },
                    map: map,
                    title: location.name,
                    label: {
                        text: String(index + 1),
                        color: 'white',
                        fontWeight: 'bold'
                    }
                });
                markers.push(marker);
            });
        }
    });
}

// Optimize route (reorder locations for shortest path)
function optimizeRoute() {
    if (locations.length < 3) {
        alert('Add at least 3 locations to optimize the route');
        return;
    }

    const waypoints = locations.slice(1, -1).map(loc => ({
        location: { lat: loc.lat, lng: loc.lng },
        stopover: true
    }));

    const request = {
        origin: { lat: locations[0].lat, lng: locations[0].lng },
        destination: { lat: locations[locations.length - 1].lat, lng: locations[locations.length - 1].lng },
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            const route = result.routes[0];
            const newOrder = [locations[0]];

            // Reorder locations based on optimized waypoints
            route.waypoint_order.forEach(index => {
                newOrder.push(locations[index + 1]);
            });

            newOrder.push(locations[locations.length - 1]);
            locations = newOrder;

            // Clear and recreate markers
            markers.forEach(marker => marker.setMap(null));
            markers = [];

            updateLocationsList();
            drawRoute();
        }
    });
}

// Initialize map when Google Maps API loads
window.initMap = initMap;

// Auto-initialize if Google Maps is already loaded
if (typeof google !== 'undefined') {
    initMap();
}
