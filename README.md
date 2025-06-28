# Elena Rose Films - Wedding Videography Portfolio

A professional, responsive wedding videography portfolio website built with HTML, CSS, and JavaScript.

## Features

### 🎬 Professional Design
- Elegant, modern design with a gold and white color scheme
- Cinematic hero section with video background placeholder
- Smooth animations and transitions
- Professional typography using Playfair Display and Open Sans fonts

### 📱 Fully Responsive
- Mobile-first design approach
- Responsive navigation with hamburger menu
- Optimized layouts for desktop, tablet, and mobile devices
- Touch-friendly interactions

### 🎯 Key Sections
- **Hero Section**: Eye-catching video background with call-to-action buttons
- **Portfolio**: Filterable gallery of wedding videos with play buttons
- **About**: Personal story and statistics
- **Services**: Three pricing packages (Essential, Premium, Luxury)
- **Testimonials**: Rotating client testimonials with navigation dots
- **Contact**: Professional contact form with validation

### ⚡ Interactive Features
- Smooth scrolling navigation
- Portfolio filtering (All, Ceremony, Reception, Highlights)
- Auto-rotating testimonials with manual navigation
- Form validation with real-time feedback
- Scroll-triggered animations
- Mobile-friendly touch gestures

### 🛠 Technical Features
- Semantic HTML5 structure
- Modern CSS3 with Flexbox and Grid
- Vanilla JavaScript (no dependencies)
- Font Awesome icons
- Google Fonts integration
- Cross-browser compatibility
- Accessibility features (focus states, ARIA labels)

## File Structure

```
wedding-portfolio/
├── index.html                 # Main HTML file
├── css/
│   ├── style.css             # Main stylesheet
│   └── responsive.css        # Responsive design styles
├── js/
│   ├── main.js              # Main JavaScript functionality
│   └── form-handler.js      # Contact form handling
├── images/
│   └── placeholder-generator.html  # Placeholder image reference
└── README.md                # This file
```

## Setup Instructions

1. **Download/Clone the project**
   ```bash
   git clone [repository-url]
   cd wedding-portfolio
   ```

2. **Open in browser**
   - Simply open `index.html` in any modern web browser
   - Or use a local server for development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. **Customize content**
   - Replace placeholder images with actual wedding photos/videos
   - Update contact information in the HTML
   - Modify pricing and package details
   - Customize colors in CSS variables

## Customization

### Colors
The main brand colors can be easily changed by modifying these CSS values:
- Primary gold: `#d4af37`
- Light gold: `#f4e4bc`
- Dark gold: `#b8941f`

### Images
Replace the following placeholder images:
- Hero video: Add `videos/hero-video.mp4`
- Portfolio thumbnails: `images/portfolio/wedding[1-6]-thumb.jpg`
- About photo: `images/about-photo.jpg`
- Testimonial photos: `images/testimonials/couple[1-3].jpg`

### Content
- Update business name, contact info, and social media links
- Modify service packages and pricing
- Replace testimonials with real client feedback
- Update the about section with personal story

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Optimized CSS with minimal redundancy
- Efficient JavaScript with event delegation
- Lazy loading considerations for images
- Smooth animations with CSS transforms
- Debounced scroll events

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Focus indicators for interactive elements
- Alt text for images
- ARIA labels where appropriate
- High contrast mode support
- Reduced motion preferences respected

## SEO Ready

- Semantic HTML5 structure
- Meta tags for social sharing
- Structured data markup ready
- Fast loading times
- Mobile-friendly design

## Contact Form

The contact form includes:
- Real-time validation
- Required field indicators
- Email format validation
- Phone number formatting
- Date picker for wedding dates
- Package selection integration
- Success/error messaging
- Form submission simulation (replace with actual backend)

## Future Enhancements

Potential additions for a production website:
- Video modal/lightbox for portfolio items
- Blog section for wedding tips
- Client login area
- Online booking system
- Payment integration
- CMS integration
- Advanced SEO optimization
- Analytics integration

## License

This project is created for educational/portfolio purposes. Feel free to use and modify for your own projects.

## Credits

- **Fonts**: Google Fonts (Playfair Display, Open Sans)
- **Icons**: Font Awesome
- **Design**: Custom responsive design
- **Development**: Pure HTML, CSS, and JavaScript

---

**Note**: This is a complete, functional website template. Replace placeholder content with actual business information and media for production use.
