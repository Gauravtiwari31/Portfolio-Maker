# 🚀 Quick Start Guide

Get your Portfolio Maker running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

Your app will be running at `http://localhost:5173`

## Step 3: Try It Out!

1. **Browse Templates**: Start by exploring the available portfolio templates
2. **Upload Resume**: Try uploading a PDF or DOCX resume to see the AI parsing in action
3. **Edit Content**: Use the editor to customize your information
4. **Preview**: See your portfolio in real-time
5. **Export**: Download as ZIP or deploy to Netlify

## 🎯 Key Features to Test

### Resume Upload & Parsing
- Upload a PDF resume and watch it automatically extract your information
- Try different file formats (PDF, DOCX, TXT)
- Use the fallback manual form if parsing confidence is low

### Template Selection
- Browse all 6 templates with different styles
- Use filters to find templates by category or complexity
- Preview templates before making your selection

### Live Editing
- Switch between Edit, Preview, and Split view modes
- Make changes and see them reflected instantly
- Use the collapsible sections to organize your editing

### Export Options
- Download ZIP with all files for self-hosting
- One-click Netlify deployment (simulated for demo)
- Get a complete static website ready to deploy anywhere

## 🛠️ Development Tips

### Hot Reload
The dev server supports hot module replacement - changes will appear instantly without page refresh.

### Template Development
To create a new template:
1. Add a new component in `src/templates/`
2. Register it in `src/components/TemplatePreview.jsx`
3. Add metadata to `public/portfolios.json`

### Debugging Resume Parser
The resume parser logs detailed information to the browser console. Open DevTools to see parsing confidence and extracted data.

### State Management
The app uses Zustand for state management with localStorage persistence. Your data is automatically saved as you edit.

## 🌐 Deployment

### For Production

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to any static hosting service:
   - **Netlify**: Drag & drop to netlify.com/drop
   - **Vercel**: Use `vercel --prod`
   - **GitHub Pages**: Push to your repository
   - **Any web host**: Upload the dist folder contents

### Environment Variables (Optional)

Create a `.env` file for configuration:

```env
VITE_APP_NAME=Portfolio Maker
VITE_NETLIFY_API_KEY=your_api_key_here
```

## 🔧 Troubleshooting

### PDF Parsing Issues
- Large PDFs (>5MB) may be slow
- Complex layouts might reduce parsing accuracy
- Use manual editing for fine-tuning

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Clear node_modules and reinstall if needed: `rm -rf node_modules package-lock.json && npm install`

### Performance
- The app is optimized for client-side operation
- Resume parsing is done in-browser using WebAssembly
- Templates are code-split for faster loading

## 📱 Mobile Support

All templates are fully responsive and work great on:
- Mobile phones (iOS/Android)
- Tablets
- Desktop browsers
- Print media

## 🎨 Customization

### Colors & Styling
- Edit `tailwind.config.js` for global theme changes
- Modify individual templates in `src/templates/`
- Update `src/index.css` for base styles

### Adding Features
- Resume parser: `src/utils/resumeParser.js`
- Export functionality: `src/utils/exportUtils.js`
- State management: `src/store/portfolioStore.js`

## ✨ What's Included

✅ **6 Professional Templates** - From minimal to creative designs  
✅ **AI Resume Parsing** - PDF, DOCX, and TXT support  
✅ **Live Preview** - Real-time editing with instant feedback  
✅ **Export Options** - ZIP download and Netlify deployment  
✅ **Mobile Responsive** - Works perfectly on all devices  
✅ **No Backend Required** - 100% client-side application  
✅ **Production Ready** - Optimized build with lazy loading  

## 🚀 Next Steps

1. **Customize Templates**: Modify existing templates or create new ones
2. **Improve Parsing**: Enhance the resume parser for better accuracy
3. **Add Features**: Contact forms, analytics, SEO optimization
4. **Deploy**: Share your portfolio maker with the world!

---

Happy building! 🎉

If you need help, check the main README.md or open an issue on GitHub.