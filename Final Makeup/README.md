# BeautySpot 💄✨

A modern, elegant beauty and makeup e-commerce website featuring product showcases, tutorials, and customer reviews.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Product Catalog**: Browse through various makeup categories including foundation, concealer, highlighter, and lipstick
- **Interactive Gallery**: Beautiful image gallery showcasing beauty moments and luxury looks
- **Video Tutorials**: Embedded YouTube Shorts showcasing makeup tutorials and beauty tips
- **Customer Reviews**: Dedicated reviews section for customer feedback and testimonials
- **Contact Form**: Easy-to-use contact page for customer inquiries
- **Smooth Animations**: Elegant loading animations and hover effects throughout the site
- **Pink Diamond Shine Effect**: Custom hover animations on video tutorials

## 📁 Project Structure

```
Final Makeup/
├── index.html              # Homepage
├── about.html              # About page
├── products.html           # Main products listing
├── gallery.html            # Image gallery
├── blogs.html              # Tutorial/Blog page with YouTube videos
├── reviews.html            # Customer reviews
├── contact.html            # Contact page
├── arrivals.html           # New arrivals page
├── concealer.html          # Concealer product details
├── foundation.html         # Foundation product details
├── highlighter.html        # Highlighter product details
├── lipstick.html           # Lipstick product details
├── style.css               # Main stylesheet
├── loading-animations.css  # Loading animation styles
├── floating-include.css    # Floating element styles
├── script.js               # Main JavaScript functionality
├── package.json            # Node.js dependencies
├── images/                 # Image assets directory
├── capture/                # Screenshot/capture utilities
└── archive/                # Archived files
```

## 🎨 Design Features

### Navigation
- Consistent pink gradient navigation bar across all pages
- Active page highlighting
- Smooth hover transitions
- Links: Home, About, Shop, Gallery, Tutorial, Reviews, Contact

### Color Scheme
- Primary: Pink gradient (`#C504F5` to `#C6001E`)
- Accent: Hot Pink (`#FF4D88`)
- Text: Deep Pink (`#D81B60`) and Dark Gray (`#444`)
- Background: White with subtle pink tints

### Currency
- All prices displayed in **Indian Rupees (₹)**
- Price range: ₹2,090 - ₹9,999
- Includes strikethrough original prices to show discounts

### Typography
- Clean, modern sans-serif fonts
- Responsive font sizing
- Bold headings with gradient effects

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: 
  - CSS Grid & Flexbox for layouts
  - CSS Variables for theming
  - Animations and transitions
  - Media queries for responsiveness
- **JavaScript**: Interactive functionality
- **Font Awesome 5.15.4**: Icon library
- **YouTube Embed API**: Video tutorials integration

## 📦 Dependencies

```json
{
  "devDependencies": {
    "@playwright/test": "^1.49.0"
  }
}
```

## 🚀 Getting Started

### Installation

1. Clone or download the repository
2. No build process required - pure HTML/CSS/JS
3. Open `index.html` in a web browser

### Running Locally

Simply open any HTML file in your web browser:
```bash
# Using a simple HTTP server (optional)
npx http-server -p 8080
```

Then navigate to `http://localhost:8080`

### Testing

The project includes Playwright tests:
```bash
npm install
npx playwright test
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎥 Tutorial Videos

The tutorial section features embedded YouTube Shorts:
- Video dimensions optimized for vertical format (9:16 aspect ratio)
- Lazy loading for better performance
- Grid layout: 3 videos on desktop, 2 on tablet, 1 on mobile

## 🖼️ Gallery

- Responsive grid layout
- Lightbox functionality
- High-quality product and lifestyle images
- Hover effects with image zoom

## ✨ Key Features by Page

### Homepage (index.html)
- Hero section with brand introduction
- Featured products carousel
- Call-to-action buttons
- Animated background elements

### Products (products.html)
- Product grid with filtering options
- Product cards with hover effects
- Quick view functionality

### Gallery (gallery.html)
- Masonry-style image grid
- Full-screen image viewer
- Category-based organization

### Tutorials (blogs.html)
- Embedded YouTube Shorts
- 3-column grid layout on desktop
- Tutorial descriptions and titles
- Pink diamond shine hover effect

### Reviews (reviews.html)
- Customer testimonials
- Star ratings
- Review cards with avatars

### Contact (contact.html)
- Contact form with validation
- Business information
- Social media links

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is for educational/portfolio purposes.

## 👩‍💻 Development

### Adding New Products
1. Create a new HTML file (e.g., `new-product.html`)
2. Copy the structure from existing product pages
3. Update navigation links across all pages
4. Add product images to the `images/` directory

### Customizing Styles
- Edit `style.css` for global styles
- Use CSS variables in `:root` for consistent theming
- Add page-specific styles in `<style>` tags within HTML files

### Adding Videos
1. Get YouTube Shorts embed link
2. Convert format: `https://www.youtube.com/embed/VIDEO_ID`
3. Add to `blogs.html` following the existing structure
4. Maintain 315x560 dimensions for vertical format

### Updating Prices
- All prices are in Indian Rupees (₹)
- Use proper Indian numbering format (e.g., ₹2,499 not ₹2499)
- Include both current price and strikethrough original price for discounts
- Conversion rate used: ~₹83 per USD

## 🐛 Known Issues

- Some YouTube Shorts may have embedding restrictions
- Replace non-embeddable videos with alternative tutorials

## 📞 Contact

For questions or suggestions about this project, please use the contact form on the website.

---

**BeautySpot** - Your destination for beauty and makeup excellence ✨
