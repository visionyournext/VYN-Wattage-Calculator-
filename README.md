# Vyn Load Calculator

A modern, responsive electricity load calculator for home inverters, similar to Livguard's calculator but branded for Vyn.

## Features

- **Property Type Selection**: Choose from 1 BHK, 2 BHK, 3 BHK, or Custom
- **Device Management: Add and manage multiple devices with their wattage
- **Real-time Calculations**: Automatic total wattage calculation
- **Backup Planning**: Configure backup hours and average consumption
- **Smart Recommendations**: Get inverter and battery recommendations based on your load
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **FAQ Section**: Common questions and answers about load calculation
- **Static Pages**: Complete static website with About, Solutions, and Contact pages
- **Navigation**: Easy navigation between all pages with active state indicators

## Setup Instructions

1. **Images Setup**:
   - A placeholder SVG logo (`vyn-logo.svg`) is included in the `images/` folder
   - To use your own logo, replace `vyn-logo.svg` with your logo file
   - Supported formats: PNG, JPG, SVG
   - Recommended logo dimensions: 200x50 pixels (or maintain aspect ratio)
   - Update the logo path in `index.html` if using a different filename

2. **Open the Application**:
   - Simply open `index.html` in a web browser
   - No server or build process required - it's a static website

## File Structure

```
vyn/
├── index.html          # Home page with Load Calculator
├── about.html          # About Us page
├── solutions.html      # Solutions page
├── contact.html        # Contact Us page
├── styles.css          # All styling (shared across all pages)
├── script.js           # Calculator functionality
├── images/             # Image assets folder
│   └── vyn-logo.svg    # Company logo (placeholder included)
└── README.md           # This file
```

## Customization

### Colors
You can customize the color scheme by modifying the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #0066cc;      /* Main brand color */
    --secondary-color: #004499;    /* Darker shade */
    --accent-color: #00a8ff;       /* Accent color */
}
```

### Devices
Add or modify devices in the `deviceDatabase` array in `script.js`:

```javascript
const deviceDatabase = [
    { name: 'Device Name', watts: 100 },
    // Add more devices here
];
```

### Property Presets
Modify property type presets in the `propertyPresets` object in `script.js` to customize default device configurations for each property type.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The calculator uses standard formulas for inverter and battery sizing
- Battery calculations assume a 12V system with 80% efficiency
- Inverter capacity includes a 20% safety buffer
- All calculations are estimates and should be verified by a professional electrician

## License

This project is created for Vyn Energy Technologies.

