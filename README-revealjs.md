# Teine Energy Presentation - Reveal.js Version

This is a converted Reveal.js version of the Teine Energy company presentation, migrated from the original iframe-based system.

## 🎯 What's New

### Reveal.js Framework Benefits
- **Smooth Transitions**: Professional slide transitions and animations
- **Keyboard Navigation**: Arrow keys, spacebar, and other shortcuts
- **Fragment Animations**: Step-by-step content reveal
- **Responsive Design**: Works on all screen sizes
- **Professional Features**: Slide counter, progress bar, fullscreen mode

### Interactive Features Preserved
- **Interactive Map**: Leaflet.js map showing asset locations
- **Performance Metrics**: Animated cards with hover effects
- **Hatch Corporate Branding**: Consistent design system
- **Professional Layout**: Clean, corporate presentation style

## 🚀 How to Use

### Option 1: Direct File Access
1. Open `reveal-presentation.html` directly in any modern web browser
2. Use navigation controls or keyboard shortcuts

### Option 2: Web Server (Recommended)
1. Serve the file through a web server for best performance:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using Live Server in VS Code
   Right-click reveal-presentation.html → "Open with Live Server"
   ```
2. Navigate to the served URL

## ⌨️ Navigation Controls

### Keyboard Shortcuts
- **Arrow Keys**: Navigate between slides
- **Spacebar**: Next slide
- **F11**: Toggle fullscreen mode
- **ESC**: Exit fullscreen or overview mode
- **O**: Toggle overview mode (see all slides)
- **S**: Speaker notes (if available)

### Mouse/Touch Controls
- **Click**: Navigation arrows in bottom right
- **Swipe**: Touch gestures on mobile devices

## 📋 Slide Structure

1. **Cover Slide**: Teine Energy logo and branding
2. **Manifesto**: Company values and principles
3. **Company Overview**: Performance metrics and highlights
4. **Asset Footprint**: Interactive map and asset details
5. **Financial Highlights**: Key financial metrics
6. **Organization Structure**: Company hierarchy
7. **Strategic Focus**: Core strategies and initiatives
8. **Investment Focus**: Capital allocation priorities
9. **Market News & Outlook**: Industry trends and analysis
10. **Areas of Opportunity**: Growth opportunities
11. **Thank You**: Contact information and closing

## 🎨 Design Features

### Hatch Corporate Branding
- **Colors**: Orange (#E84B37) primary, with gray accents
- **Typography**: Segoe UI font family
- **Layout**: Professional grid system
- **Components**: Consistent card designs and spacing

### Interactive Elements
- **Asset Map**: Shows Teine Energy's geographic footprint
- **Performance Cards**: Hover animations and transitions
- **Fragment Animations**: Content appears progressively
- **Responsive Grid**: Adapts to different screen sizes

## 🔧 Technical Details

### Dependencies
- **Reveal.js 5.0.0**: Core presentation framework
- **Bootstrap 5.3.0**: Grid system and utilities
- **Font Awesome 6.0**: Icons
- **Leaflet.js 1.9.4**: Interactive mapping

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Internet connection required for external assets

### File Structure
```
reveal-presentation.html    # Main presentation file (all-in-one)
README-revealjs.md         # This documentation
```

## 📦 Deployment Options

### 1. Static Hosting (Recommended)
- Upload `reveal-presentation.html` to any static hosting service
- Works with: Vercel, Netlify, GitHub Pages, AWS S3, etc.
- No server-side processing required

### 2. CDN Delivery
- All external dependencies load from CDNs
- Fast global loading times
- Automatic updates for frameworks

### 3. Local Development
- Works offline after initial load
- Perfect for development and testing

## 🔄 Migration Notes

### What Was Converted
- ✅ All 11 slides consolidated into single HTML file
- ✅ Interactive map functionality preserved
- ✅ Hatch corporate branding maintained
- ✅ Performance metrics and animations
- ✅ Responsive design principles
- ✅ Professional navigation controls

### What Was Enhanced
- ✅ Smooth slide transitions
- ✅ Fragment animations for progressive disclosure
- ✅ Keyboard navigation shortcuts
- ✅ Overview mode for slide management
- ✅ Progress indicator
- ✅ Fullscreen presentation mode

### Technical Improvements
- ✅ Single-file deployment (easier to manage)
- ✅ Modern CSS Grid and Flexbox layouts
- ✅ Optimized for performance
- ✅ Better accessibility features
- ✅ Mobile-responsive design

## 🎬 Presentation Tips

### For Presenters
1. **Use F11** for fullscreen presentation mode
2. **Practice navigation** with keyboard shortcuts
3. **Test interactive elements** before presenting
4. **Check internet connection** for map functionality
5. **Use overview mode (O)** to jump to specific slides

### For Audiences
- The presentation works on any device with a modern browser
- Touch gestures work on mobile devices
- All content is accessible without additional software

## 🆚 Comparison with Original

| Feature | Original (iframe-based) | New (Reveal.js) |
|---------|------------------------|------------------|
| Navigation | Custom prev/next buttons | Professional slide framework |
| Transitions | Page loads | Smooth animations |
| Mobile Support | Limited | Full responsive |
| Keyboard Shortcuts | None | Full support |
| Overview Mode | None | Available |
| Fragment Animations | None | Progressive disclosure |
| Deployment | 11 separate files | Single HTML file |
| Maintenance | Complex | Simple |

This Reveal.js version provides a professional, modern presentation experience while maintaining all the original content and branding of the Teine Energy presentation.
