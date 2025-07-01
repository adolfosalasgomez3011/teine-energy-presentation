# Teine Energy Presentation - Vercel Deployment

This folder contains all the files needed to deploy the Teine Energy presentation to Vercel.

## Files Structure

```
your-project-folder/
├── index.html (main presentation file)
├── slides/ (individual slide HTML files)
│   ├── 01_cover_slide.html
│   ├── 02_manifesto.html
│   ├── ... (all 11 slides)
├── css/ (all styling files)
│   ├── corporate_styles.css
│   ├── investment_focus_styles.css
│   └── ... (all CSS files)
└── js/ (JavaScript functionality)
    ├── strategic_focus_script.js
    └── ... (all JS files)
```

## How to Deploy to Vercel

1. **Option 1 - Drag & Drop (Easiest):**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Drag and drop this entire `your-project-folder` folder
   - Vercel will automatically deploy it

2. **Option 2 - Using Vercel CLI:**
   ```bash
   cd your-project-folder
   vercel
   ```

3. **Option 3 - Connect to Git:**
   - Push this folder to a GitHub repository
   - Connect the repository to Vercel

## Important Notes

- The `index.html` file is your main entry point
- All CSS and JS files are referenced correctly for web deployment
- The presentation uses iframes to load individual slides
- External assets (images) are hosted on Supabase and will load automatically

## Features

- Full navigation between slides
- Keyboard shortcuts (arrow keys, spacebar)
- Fullscreen mode (F11)
- Responsive design
- Loading animations
- Slide indicators

## Access Your Presentation

After deployment, Vercel will provide you with a URL like:
`https://your-project-name.vercel.app`

The presentation will be immediately accessible at that URL.
