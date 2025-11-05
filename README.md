# Sri Lanka Tour Itinerary Planner

A beautiful and interactive web application for planning tour itineraries in Sri Lanka. Create your journey by adding destinations and visualizing routes on Google Maps.

## Features

- **Interactive Sri Lankan Map**: Fully focused Google Map view centered on Sri Lanka
- **Add Destinations**: Easy location search with autocomplete (restricted to Sri Lankan locations)
- **Journey Visualization**: Automatically draws routes connecting your destinations
- **Numbered Markers**: Clear sequence indicators for your journey
- **Route Optimization**: Automatically optimize your route for the shortest travel distance
- **Responsive Design**: Works on both desktop and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations

## Setup Instructions

### 1. Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Geocoding API
4. Create credentials (API Key)
5. Copy your API key

### 2. Configure the Application

1. Open `index.html` in a text editor
2. Find this line (near the bottom):
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
   ```
3. Replace `YOUR_API_KEY` with your actual Google Maps API key

### 3. Run the Application

#### Option 1: Simple HTTP Server (Python)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser

#### Option 2: Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```
Then open `http://localhost:8000` in your browser

#### Option 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## How to Use

1. **Add a Destination**:
   - Type a location name in Sri Lanka (e.g., "Colombo", "Kandy", "Galle")
   - Select from autocomplete suggestions or press Enter/Click "Add Location"
   - The location will be added to your itinerary and marked on the map

2. **View Your Journey**:
   - As you add locations, they appear in the "Your Itinerary" section
   - Routes are automatically drawn connecting all locations in order
   - Markers are numbered to show the sequence

3. **Manage Locations**:
   - Click "Remove" on any location to delete it from your itinerary
   - Click "Clear All" to start fresh
   - Click "Optimize Route" to reorder waypoints for the shortest path

4. **Interact with the Map**:
   - Zoom in/out using controls or mouse wheel
   - Pan around by clicking and dragging
   - Toggle map types (satellite, terrain) using map controls

## File Structure

```
sarisara-itinerary-map/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Features Breakdown

### Map Section (Top 60%)
- Full Google Maps integration
- Centered on Sri Lanka (coordinates: 7.8731°N, 80.7718°E)
- Interactive markers with numbers
- Route visualization with purple polylines
- Default zoom level optimized for Sri Lanka

### Input Section (Bottom 40%)
- Beautiful gradient background
- Location search with autocomplete
- Live itinerary list with numbered destinations
- Quick action buttons (Clear All, Optimize Route)
- Responsive design for mobile devices

## Technologies Used

- HTML5
- CSS3 (Flexbox, Gradients, Animations)
- Vanilla JavaScript (ES6+)
- Google Maps JavaScript API
- Google Places API
- Google Directions API
- Google Geocoding API

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Tips

- Use specific location names for better accuracy (e.g., "Sigiriya Rock Fortress" instead of just "Sigiriya")
- The autocomplete feature helps you find exact locations in Sri Lanka
- Routes are calculated for driving directions
- Optimize route works best with 3+ destinations
- Keep your API key secure and don't commit it to public repositories

## Future Enhancements

- Save/load itineraries
- Export itinerary as PDF
- Distance and duration calculations
- Multiple travel modes (walking, transit)
- Custom marker icons
- Share itinerary via link
- Print-friendly view

## License

MIT License - feel free to use and modify for your projects!

## Support

For issues or questions, please refer to the Google Maps Platform documentation:
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Directions API](https://developers.google.com/maps/documentation/directions)
