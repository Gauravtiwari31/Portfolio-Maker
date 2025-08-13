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

---

### Architecture Map and Portfolio Index (Modular Index)

This project has been refactored to replace a very large monolithic `index.html` with a clean modular structure. This section maps every area that used to live in `index.html` to its new files, and documents where all portfolio properties and assets reside.

#### Where each UI section lives now

- Navigation, Hero, Filters, Grid, Footer, Modals, Cursor effects, Dark mode
  - App logic and layout: `App.jsx`
  - Cursor trailer + particles: `App.jsx` (effect hooks) and styles in `styles.css` (`.cursor-trailer`, `.trail`, `.particle`)
  - Dark mode toggle and persistence: `App.jsx` (uses `localStorage` key `pxf:dark`)
  - Easter egg sparkle/star icon linking to the video editor: `App.jsx` (navigation) and styles in `styles.css` (`.sparkle-button`, `.spark-*`)

- Portfolio grid cards
  - Card component: `components/PortfolioCard.jsx`
  - Data source for all cards (45 entries): `data/portfolios.js` (exported on `window.PORTFOLIO_DATA`)
  - Preview thumbnails: `imgs/portfolio{1..45}.gif`

- Auth and Builder modals
  - Auth modal: `components/AuthModal.jsx`
  - Portfolio Builder (form, template chooser, live preview, deploy/download): `components/ResumeBuilder.jsx`
  - DOM patching for preview + deploy (injects data into static HTML templates): `utils/domPatcher.js` (exposed as `window.DomPatcher`)

- Entry point and shell
  - Minimal HTML shell: `index.html` (links Tailwind CDN, Google Fonts, styles, data, utils, components, app, and entry)
  - Global styles: `styles.css`
  - App bootstrap: `main.jsx` (mounts `window.App` into `#root`)

- Hidden video editor (easter egg)
  - `easter_egg.html`

#### How preview and deploy work now

- The Builder (`components/ResumeBuilder.jsx`) collects form data and calls `window.DomPatcher.patchTemplate(templateFile, formData)`.
- The patcher (`utils/domPatcher.js`) loads the chosen static HTML (e.g. `portfolio1.html`), adds a `<base>` tag for relative assets, populates all `data-field`, `data-attr`, and `data-repeat` hooks, then returns the final HTML.
- Live preview uses an `<iframe srcdoc="...">` set to the patched markup.
- Deploy as Website opens the same final HTML in a new tab (Blob URL) or can be downloaded as a single `.html` file.

#### Portfolio properties – where they live

- Canonical source for all 45 portfolio cards (grid data): `data/portfolios.js`
  - Properties per portfolio: `id`, `title`, `author`, `category`, `views`, `likes`, `image` (preview GIF), `isFeatured`, `isLive`, `tags` (array), `link` (HTML template file, e.g., `portfolio13.html`).
- Preview images: `imgs/portfolioX.gif` (X ∈ 1..45)
- Static HTML templates: `portfolioX.html` in the repository root

> Note: The card component (`components/PortfolioCard.jsx`) consumes the above properties to render each card and open `portfolio.link` on click.

#### Template selection in the Builder

- The Builder ships with a `templates` list inside `components/ResumeBuilder.jsx`. Each entry maps to a portfolio HTML file and a preview image. You can expand this list to include all 45 templates or a curated subset.

#### Full index of all 45 portfolios (files and assets)

| ID | Title                     | Template File       | Preview Image            | Category     |
|----|---------------------------|---------------------|--------------------------|--------------|
| 1  | Dark Portfolio            | `portfolio1.html`   | `imgs/portfolio1.gif`    | Development  |
| 2  | Professional Portfolio    | `portfolio2.html`   | `imgs/portfolio2.gif`    | Development  |
| 3  | Monochrome Portfolio      | `portfolio3.html`   | `imgs/portfolio3.gif`    | Design       |
| 4  | Classic Portfolio         | `portfolio4.html`   | `imgs/portfolio4.gif`    | Development  |
| 5  | Neon Portfolio            | `portfolio5.html`   | `imgs/portfolio5.gif`    | Art          |
| 6  | Minimalist Portfolio      | `portfolio6.html`   | `imgs/portfolio6.gif`    | Design       |
| 7  | Standard Portfolio        | `portfolio7.html`   | `imgs/portfolio7.gif`    | Development  |
| 8  | Professional Business     | `portfolio8.html`   | `imgs/portfolio8.gif`    | Development  |
| 9  | Dynamic Portfolio         | `portfolio9.html`   | `imgs/portfolio9.gif`    | Development  |
| 10 | Timeline Portfolio        | `portfolio10.html`  | `imgs/portfolio10.gif`   | Design       |
| 11 | Modern Portfolio          | `portfolio11.html`  | `imgs/portfolio11.gif`   | Development  |
| 12 | Creative Dark             | `portfolio12.html`  | `imgs/portfolio12.gif`   | Art          |
| 13 | Tech Focus                | `portfolio13.html`  | `imgs/portfolio13.gif`   | Development  |
| 14 | Elegant Classic           | `portfolio14.html`  | `imgs/portfolio14.gif`   | Design       |
| 15 | Portfolio Showcase        | `portfolio15.html`  | `imgs/portfolio15.gif`   | Art          |
| 16 | Business Card             | `portfolio16.html`  | `imgs/portfolio16.gif`   | Design       |
| 17 | Developer Hub             | `portfolio17.html`  | `imgs/portfolio17.gif`   | Development  |
| 18 | Designer Showcase         | `portfolio18.html`  | `imgs/portfolio18.gif`   | Design       |
| 19 | Photography               | `portfolio19.html`  | `imgs/portfolio19.gif`   | Photography  |
| 20 | Writer's Corner           | `portfolio20.html`  | `imgs/portfolio20.gif`   | Writing      |
| 21 | Marketing Pro             | `portfolio21.html`  | `imgs/portfolio21.gif`   | Marketing    |
| 22 | 3D Artist                 | `portfolio22.html`  | `imgs/portfolio22.gif`   | 3D           |
| 23 | UX Designer               | `portfolio23.html`  | `imgs/portfolio23.gif`   | UX/UI        |
| 24 | Mobile Developer          | `portfolio24.html`  | `imgs/portfolio24.gif`   | Development  |
| 25 | Data Scientist            | `portfolio25.html`  | `imgs/portfolio25.gif`   | Development  |
| 26 | Game Developer            | `portfolio26.html`  | `imgs/portfolio26.gif`   | Development  |
| 27 | Frontend Specialist       | `portfolio27.html`  | `imgs/portfolio27.gif`   | Development  |
| 28 | Backend Engineer          | `portfolio28.html`  | `imgs/portfolio28.gif`   | Development  |
| 29 | DevOps Engineer           | `portfolio29.html`  | `imgs/portfolio29.gif`   | Development  |
| 30 | AI Researcher             | `portfolio30.html`  | `imgs/portfolio30.gif`   | Development  |
| 31 | Blockchain Developer      | `portfolio31.html`  | `imgs/portfolio31.gif`   | Development  |
| 32 | Cybersecurity Expert      | `portfolio32.html`  | `imgs/portfolio32.gif`   | Development  |
| 33 | QA Engineer               | `portfolio33.html`  | `imgs/portfolio33.gif`   | Development  |
| 34 | Product Manager           | `portfolio34.html`  | `imgs/portfolio34.gif`   | Marketing    |
| 35 | UI Specialist             | `portfolio35.html`  | `imgs/portfolio35.gif`   | UX/UI        |
| 36 | Motion Graphics           | `portfolio36.html`  | `imgs/portfolio36.gif`   | Art          |
| 37 | Digital Artist            | `portfolio37.html`  | `imgs/portfolio37.gif`   | Art          |
| 38 | Brand Designer            | `portfolio38.html`  | `imgs/portfolio38.gif`   | Design       |
| 39 | Web Designer              | `portfolio39.html`  | `imgs/portfolio39.gif`   | Design       |
| 40 | Freelancer                | `portfolio40.html`  | `imgs/portfolio40.gif`   | Development  |
| 41 | Terminal Portfolio        | `portfolio41.html`  | `imgs/portfolio41.gif`   | Development  |
| 42 | Startup Founder           | `portfolio42.html`  | `imgs/portfolio42.gif`   | Marketing    |
| 43 | Content Creator           | `portfolio43.html`  | `imgs/portfolio43.gif`   | Writing      |
| 44 | E-commerce                | `portfolio44.html`  | `imgs/portfolio44.gif`   | Development  |
| 45 | SaaS Developer            | `portfolio45.html`  | `imgs/portfolio45.gif`   | Development  |

Additional properties for each portfolio card (title, author, tags, etc.) are defined centrally in `data/portfolios.js`.

#### Quick reference: editing guide

- Change card text, tags, categories, or links: `data/portfolios.js`
- Change card visuals or behavior: `components/PortfolioCard.jsx`
- Change the list of selectable templates in the Builder: `components/ResumeBuilder.jsx` (the `templates` array)
- Change how user data is injected into templates: `utils/domPatcher.js`
- Change navigation, hero, filters, grid, footer, or global app behavior: `App.jsx`
- Change global styles, sparkle effect, cursor trail, or preview frame look: `styles.css`
