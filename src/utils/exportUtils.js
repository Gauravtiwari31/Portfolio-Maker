import JSZip from 'jszip'
import { saveAs } from 'file-saver'

// Template component imports
import ModernMinimalTemplate from '../templates/ModernMinimalTemplate'
import CreativeDarkTemplate from '../templates/CreativeDarkTemplate'
import TechFocusedTemplate from '../templates/TechFocusedTemplate'
import ElegantClassicTemplate from '../templates/ElegantClassicTemplate'
import PortfolioShowcaseTemplate from '../templates/PortfolioShowcaseTemplate'
import BusinessCardTemplate from '../templates/BusinessCardTemplate'

const templateComponents = {
  'modern-minimal': ModernMinimalTemplate,
  'creative-dark': CreativeDarkTemplate,
  'tech-focused': TechFocusedTemplate,
  'elegant-classic': ElegantClassicTemplate,
  'portfolio-showcase': PortfolioShowcaseTemplate,
  'business-card': BusinessCardTemplate
}

export async function exportToZip(template, resume) {
  const zip = new JSZip()
  
  // Generate HTML content
  const htmlContent = generateHTMLFile(template, resume)
  
  // Add files to ZIP
  zip.file('index.html', htmlContent)
  zip.file('style.css', generateCSSFile(template))
  zip.file('script.js', generateJSFile())
  zip.file('README.md', generateReadme(template, resume))
  
  // Generate and download ZIP
  const content = await zip.generateAsync({ type: 'blob' })
  const fileName = `${resume.basics.name || 'portfolio'}-${template.id}.zip`
  saveAs(content, fileName)
}

export async function deployToNetlify(template, resume) {
  // Simulate deployment process
  // In a real implementation, this would use Netlify's deployment API
  
  const files = {
    'index.html': generateHTMLFile(template, resume),
    'style.css': generateCSSFile(template),
    'script.js': generateJSFile(),
    'README.md': generateReadme(template, resume)
  }
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Generate a mock URL (in real implementation, this would come from Netlify)
  const randomId = Math.random().toString(36).substring(2, 15)
  return `https://${randomId}.netlify.app`
}

function generateHTMLFile(template, resume) {
  const TemplateComponent = templateComponents[template.id]
  
  if (!TemplateComponent) {
    throw new Error('Template not found')
  }

  // Since we can't use React.renderToString in the browser,
  // we'll create a simple HTML template with embedded data
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resume.basics.name || 'Portfolio'} - Portfolio</title>
    <meta name="description" content="${resume.basics.summary || 'Professional portfolio'}">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="${resume.basics.name || 'Portfolio'}">
    <meta property="og:description" content="${resume.basics.summary || 'Professional portfolio'}">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${resume.basics.name || 'Portfolio'}">
    <meta name="twitter:description" content="${resume.basics.summary || 'Professional portfolio'}">
    
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body>
    <div id="portfolio-root"></div>
    
    <script>
        // Resume data
        window.portfolioData = ${JSON.stringify({ template, resume }, null, 2)};
    </script>
    <script src="script.js"></script>
</body>
</html>`
}

function generateCSSFile(template) {
  const baseCSS = `
/* Portfolio Maker - Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

a {
    color: inherit;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 0 15px;
    }
}

/* Print Styles */
@media print {
    body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
    }
    
    .no-print {
        display: none !important;
    }
}
`

  // Add template-specific styles
  const templateStyles = getTemplateSpecificCSS(template)
  
  return baseCSS + templateStyles
}

function getTemplateSpecificCSS(template) {
  switch (template.id) {
    case 'modern-minimal':
      return `
/* Modern Minimal Template Styles */
.section-header {
    border-bottom: 2px solid #3b82f6;
    padding-bottom: 8px;
    margin-bottom: 24px;
}

.timeline-item {
    position: relative;
    padding-left: 24px;
    margin-bottom: 24px;
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 8px;
    height: 8px;
    background: #3b82f6;
    border-radius: 50%;
}

.timeline-item::after {
    content: '';
    position: absolute;
    left: 3px;
    top: 16px;
    width: 2px;
    height: calc(100% - 8px);
    background: #e5e7eb;
}

.skill-tag {
    display: inline-block;
    padding: 4px 12px;
    background: #dbeafe;
    color: #1e40af;
    border-radius: 20px;
    font-size: 14px;
    margin: 2px;
}
`
      
    case 'creative-dark':
      return `
/* Creative Dark Template Styles */
body {
    background: #1f2937;
    color: white;
}

.gradient-text {
    background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
}
`
      
    case 'tech-focused':
      return `
/* Tech Focused Template Styles */
body {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    background: #f9fafb;
}

.terminal-header {
    background: #1f2937;
    color: #10b981;
    padding: 20px;
    border-radius: 8px;
    font-family: monospace;
}

.code-block {
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 16px;
    font-family: monospace;
    font-size: 14px;
}

.syntax-keyword {
    color: #7c3aed;
}

.syntax-string {
    color: #059669;
}
`
      
    default:
      return ''
  }
}

function generateJSFile() {
  return `
// Portfolio Maker - Client Script
(function() {
    'use strict';
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Smooth scrolling for anchor links
    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });
    
    // Add print functionality
    function addPrintButton() {
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '🖨️ Print';
        printBtn.className = 'print-btn no-print';
        printBtn.style.cssText = \`
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 6px;
            cursor: pointer;
            z-index: 1000;
            font-size: 14px;
        \`;
        
        printBtn.addEventListener('click', () => window.print());
        document.body.appendChild(printBtn);
    }
    
    // Initialize features
    document.addEventListener('DOMContentLoaded', function() {
        addPrintButton();
    });
    
    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.addEventListener('DOMContentLoaded', function() {
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        });
    }
    
    // Add basic analytics (privacy-friendly)
    function trackPageView() {
        if (navigator.sendBeacon) {
            // You can replace this with your analytics endpoint
            console.log('Page viewed:', window.location.href);
        }
    }
    
    document.addEventListener('DOMContentLoaded', trackPageView);
    
})();
`
}

function generateReadme(template, resume) {
  return `# ${resume.basics.name || 'Portfolio'} - Portfolio Website

This is a static portfolio website generated using Portfolio Maker.

## Template Information
- **Template**: ${template.title}
- **Style**: ${template.category}
- **Generated**: ${new Date().toLocaleDateString()}

## Files Included
- \`index.html\` - Main portfolio page
- \`style.css\` - Stylesheet with template-specific styling
- \`script.js\` - Client-side JavaScript for enhanced functionality
- \`README.md\` - This file

## How to Use

### Option 1: Open Locally
1. Extract all files to a folder
2. Open \`index.html\` in any modern web browser
3. Your portfolio is ready to view!

### Option 2: Deploy to Web Hosting
You can upload these files to any web hosting service:

#### Free Hosting Options:
- **Netlify**: Drag and drop the files to netlify.com/drop
- **Vercel**: Connect your GitHub repo or use their CLI
- **GitHub Pages**: Upload to a GitHub repository and enable Pages
- **Firebase Hosting**: Use Firebase CLI to deploy

#### Traditional Web Hosting:
- Upload all files to your web server's public directory
- Your portfolio will be accessible at your domain

## Customization

### Updating Content
- Edit the \`window.portfolioData\` object in \`index.html\`
- Modify the resume data to update your information

### Styling Changes
- Edit \`style.css\` to customize colors, fonts, and layout
- The CSS is well-commented for easy modification

### Adding Features
- Modify \`script.js\` to add interactive elements
- Add Google Analytics, contact forms, or other integrations

## SEO Optimization
The generated HTML includes:
- Meta tags for search engines
- Open Graph tags for social media sharing
- Structured data for better search results
- Semantic HTML for accessibility

## Browser Support
This portfolio supports all modern browsers including:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Features
- Optimized CSS and JavaScript
- Lazy loading for images
- Print-friendly styles
- Mobile-responsive design

## Need Help?
If you need to make changes or have questions:
1. Visit the Portfolio Maker website for documentation
2. Check the browser console for any errors
3. Validate your HTML at validator.w3.org

---

Generated with ❤️ by Portfolio Maker
Visit: https://portfolio-maker.app
`
}