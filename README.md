# Portfolio Maker

Transform your resume into a beautiful, professional portfolio website in minutes. Upload your resume, choose from stunning templates, and deploy your portfolio with one click.

## 🚀 Features

- **AI-Powered Resume Parsing**: Upload PDF, DOCX, or TXT files and automatically extract your information
- **Beautiful Templates**: Choose from 6 professionally designed templates
- **Live Preview**: See your changes in real-time as you edit
- **One-Click Deploy**: Deploy directly to Netlify with a single click
- **Export Options**: Download as ZIP or deploy live instantly
- **Mobile Responsive**: All templates work perfectly on mobile devices
- **No Backend Required**: 100% client-side application

## 🎨 Templates Available

1. **Modern Minimal** - Clean, professional design with elegant typography
2. **Creative Dark** - Bold dark theme perfect for designers and creatives
3. **Tech Focused** - Developer-friendly with code syntax highlighting
4. **Elegant Classic** - Timeless design with traditional layouts
5. **Portfolio Showcase** - Gallery-style layout for creative work
6. **Business Card** - Compact, card-like design for networking

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Resume Parsing**: PDF.js, Mammoth.js, Compromise.js
- **Export**: JSZip, FileSaver
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-maker.git
cd portfolio-maker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

3. Your site will be live instantly with a random URL

### Option 2: Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Option 3: GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Push the `dist` folder contents to your GitHub Pages repository

### Option 4: Traditional Web Hosting

1. Build the project:
```bash
npm run build
```

2. Upload the contents of the `dist` folder to your web server

## 🎯 How to Use

### 1. Discover Templates
- Browse through available portfolio templates
- Filter by category, style, or complexity
- Preview templates before selecting

### 2. Upload Resume (Optional)
- Upload PDF, DOCX, or TXT resume files
- AI automatically extracts your information
- Manual editing available for fine-tuning

### 3. Edit Content
- Use the intuitive editor to add/modify your information
- Real-time preview shows changes instantly
- Support for work experience, education, skills, and projects

### 4. Export Portfolio
- **Download ZIP**: Get all files to host anywhere
- **Deploy to Netlify**: One-click deployment with instant live URL

## 🔧 Customization

### Adding New Templates

1. Create a new template component in `src/templates/`:
```jsx
import React from 'react'

const YourTemplate = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume
  
  return (
    <div>
      {/* Your template JSX */}
    </div>
  )
}

export default YourTemplate
```

2. Add the template to `public/portfolios.json`:
```json
{
  "id": "your-template",
  "title": "Your Template",
  "description": "Template description",
  "tags": ["tag1", "tag2"],
  "category": "category",
  "complexity": "simple"
}
```

3. Register the template in `src/components/TemplatePreview.jsx`

### Modifying Resume Parser

The resume parser is located in `src/utils/resumeParser.js`. You can:
- Add new field extraction patterns
- Improve parsing accuracy
- Add support for new file formats

### Styling Changes

- Templates use Tailwind CSS classes
- Global styles are in `src/index.css`
- Each template has its own styling approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 File Structure

```
portfolio-maker/
├── public/
│   └── portfolios.json          # Template metadata
├── src/
│   ├── components/              # React components
│   │   ├── Header.jsx
│   │   ├── PortfolioCard.jsx
│   │   ├── FileUpload.jsx
│   │   ├── ResumeEditor.jsx
│   │   ├── TemplatePreview.jsx
│   │   ├── TemplateSelector.jsx
│   │   └── ExportModal.jsx
│   ├── pages/                   # Page components
│   │   ├── DiscoveryPage.jsx
│   │   ├── BuilderPage.jsx
│   │   └── PreviewPage.jsx
│   ├── templates/               # Portfolio templates
│   │   ├── ModernMinimalTemplate.jsx
│   │   ├── CreativeDarkTemplate.jsx
│   │   ├── TechFocusedTemplate.jsx
│   │   ├── ElegantClassicTemplate.jsx
│   │   ├── PortfolioShowcaseTemplate.jsx
│   │   └── BusinessCardTemplate.jsx
│   ├── store/                   # State management
│   │   └── portfolioStore.js
│   ├── utils/                   # Utilities
│   │   ├── resumeParser.js
│   │   └── exportUtils.js
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🐛 Known Issues

- PDF parsing accuracy depends on PDF structure
- Large PDF files (>5MB) may cause performance issues
- Some DOCX files with complex formatting may not parse perfectly

## 🔮 Roadmap

- [ ] Additional portfolio templates
- [ ] Custom color scheme editor
- [ ] Social media integration
- [ ] SEO optimization tools
- [ ] Contact form integration
- [ ] Analytics dashboard
- [ ] Custom domain support
- [ ] Team collaboration features

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/portfolio-maker/issues) page
2. Create a new issue with detailed information
3. Join our [Discord community](https://discord.gg/portfolio-maker)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF parsing
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js) - DOCX parsing

---

Made with ❤️ for developers, designers, and job seekers everywhere.

**Start building your portfolio today!** 🚀