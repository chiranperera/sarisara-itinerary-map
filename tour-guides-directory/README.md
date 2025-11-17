# Sri Lanka Tour Guides Directory Map

A comprehensive web application for visualizing and filtering SLTDA (Sri Lanka Tourism Development Authority) registered tour guides on an interactive Google Maps interface.

## Features

### Core Functionality
- **Interactive Map Display**: Google Maps centered on Sri Lanka showing all registered tour guides
- **Real-time Data Loading**: Fetches tour guide data from CSV hosted on GitHub
- **Smart Filtering System**: Multi-criteria filtering for better search results
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Filtering Capabilities
- 🔍 **Search**: Find guides by name or registration number
- 📂 **Category Filter**: Filter by National, Regional, or other categories
- 🌐 **Language Filter**: Filter by languages spoken (English, German, French, Japanese, etc.)
- ✅ **Validity Status**: Filter by Valid, Expiring Soon, or Expired credentials

### Tour Guide Information Displayed
- Profile Image
- Full Name
- Registration Number
- Category (National/Regional)
- Languages Spoken
- Contact Information (Phone & Email with click-to-call/email)
- Physical Address
- Validity Status with color coding

### Map Features
- **Custom Markers**: Each tour guide location marked on the map
- **Info Windows**: Click markers to view detailed guide information
- **Auto Geocoding**: Automatic conversion of addresses to map coordinates
- **Zoom & Pan**: Interactive map controls
- **Fullscreen Mode**: Dedicated filtering panel in fullscreen view

### User Interface
- **Left Panel (35%)**: Filters and guide list
  - Statistics dashboard (Total/Filtered count)
  - Search bar
  - Category, Language, and Validity filters
  - Scrollable list of guide cards
  
- **Right Panel (65%)**: Interactive map
  - Full Google Maps integration
  - Markers for each filtered guide
  - Fullscreen control
  
- **Fullscreen Panel**: Compact filter panel for fullscreen map mode

### Data Management
- **CSV Data Source**: https://github.com/chiranperera/sarisara-lanka-tour-guides-directory
- **Real-time Updates**: Refresh button to reload latest data
- **Efficient Geocoding**: Addresses converted to coordinates with rate limiting
- **Error Handling**: Graceful fallback for failed geocoding

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Map API**: Google Maps JavaScript API
- **Data Format**: CSV (parsed client-side)
- **Geocoding**: Google Maps Geocoding API
- **Responsive**: CSS Flexbox with media queries

## Setup Instructions

### 1. Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API (optional)
4. Create API credentials
5. Update the API key in `index.html`:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
```

### 2. CSV Data Source

The application loads data from:
```
https://raw.githubusercontent.com/chiranperera/sarisara-lanka-tour-guides-directory/main/Sample_Data_20_National_Tour%20Guides%20-%20National_Tour%20Guides.csv
```

**CSV Format Required:**
```
Name,Image,Category,Language,Phone_Number,Address,Reg_Number,Email_Address,Validity
```

### 3. Run the Application

**Option 1: Simple HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server -p 8000
```

**Option 2: Direct File Open**
Simply open `index.html` in a modern web browser

**Option 3: Deploy to Hosting**
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Usage Guide

### Filtering Tour Guides

1. **Search**: Type in the search box to find guides by name or registration number
2. **Category**: Click category chips to filter by guide type
3. **Languages**: Select one or more languages to find multilingual guides
4. **Validity**: Filter by credential status (Valid, Expiring Soon, Expired)
5. **Clear Filters**: Reset all filters to show all guides

### Viewing Guide Details

- **Click on a guide card** in the left panel to center the map on their location
- **Click on a map marker** to view guide details in an info window
- **Use fullscreen mode** for immersive map experience with filtering panel overlay

### Updating Data

- Click the **"🔄 Refresh Data"** button to reload from CSV source
- Ensure your CSV follows the required format
- Geocoding happens automatically after data load

## Customization

### Changing Data Source

Update the `CSV_URL` constant in the JavaScript:

```javascript
const CSV_URL = 'https://your-github-repo/your-data.csv';
```

### Styling

Modify the CSS variables in `<style>` section:
- Colors: Search for `#000000` (black) and `#ffffff` (white)
- Fonts: Update `font-family` properties
- Layout: Adjust `.filter-panel` width (default 35%)

### Map Settings

```javascript
map = new google.maps.Map(document.getElementById('map'), {
    center: SRI_LANKA_CENTER,  // Change center coordinates
    zoom: 8,                    // Default zoom level
    minZoom: 7,                 // Minimum zoom
    maxZoom: 18                 // Maximum zoom
});
```

## Features in Detail

### Validity Status Logic

- **Valid**: More than 90 days until expiration (Green)
- **Expiring Soon**: Less than 90 days until expiration (Orange)
- **Expired**: Past expiration date (Red)

### Geocoding

- Addresses are geocoded on initial load
- 300ms delay between requests to avoid rate limiting
- Failed geocoding uses random Sri Lanka coordinates as fallback
- Coordinates cached for session duration

### Filter Behavior

- **Multi-select**: Multiple filters can be active simultaneously
- **AND Logic**: Guides must match ALL active filters
- **Real-time**: Results update instantly as you filter
- **Persistent**: Filters sync between main and fullscreen panels

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera
- Mobile browsers

## Performance Considerations

- **Lazy Loading**: Markers created only for filtered results
- **Geocoding Throttling**: 300ms delay prevents API rate limiting
- **Efficient Rendering**: Only visible guides rendered in list
- **Memory Management**: Old markers removed before creating new ones

## Troubleshooting

### Guides Not Appearing on Map
- Check browser console for errors
- Verify Google Maps API key is valid
- Ensure CSV data is accessible
- Check geocoding quota limits

### CSV Loading Issues
- Verify CSV URL is correct and publicly accessible
- Check CSV format matches required structure
- Ensure CORS headers allow cross-origin requests

### Slow Performance
- Reduce number of guides being displayed
- Use filters to limit active markers
- Check network speed for CSV download

## Future Enhancements

- [ ] Export filtered results to CSV/PDF
- [ ] Share guide profiles via link
- [ ] Advanced search with multiple fields
- [ ] Sort options (by name, validity, distance)
- [ ] Clustering for high-density areas
- [ ] Favorite guides functionality
- [ ] Integration with booking systems
- [ ] Multi-language interface
- [ ] Print-friendly view
- [ ] Offline mode with cached data

## License

MIT License - Free to use and modify

## Support

For issues or questions:
- Check browser console for errors
- Verify API keys and data sources
- Review Google Maps API documentation
- Check CSV data format

## Credits

- Data Source: SLTDA (Sri Lanka Tourism Development Authority)
- Map Provider: Google Maps
- Built with vanilla JavaScript for maximum compatibility

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Maintainer**: Sarisara Development Team
