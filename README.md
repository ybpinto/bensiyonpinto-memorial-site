# Memorial Website

A bilingual (English/Turkish) memorial website built on the HTML5 UP Story template. Features photo galleries with 220 images, 122 archived condolence messages, and responsive design optimized for all devices.

## Features

- **Bilingual Support**: English and Turkish language toggle with browser language detection
- **Photo Galleries**: Two galleries with lazy-loaded images
  - Professional Life: 65 career photos
  - Family & Friends: 155 personal photos
- **Condolence Messages**: 122 archived messages (10 with attached images)
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Lightbox**: Built-in gallery lightbox for full-screen image viewing
- **Performance**: Native lazy loading for images

## Tech Stack

- **Template**: [HTML5 UP Story](https://html5up.net/story)
- **Libraries**: jQuery, Scrollex, Scrolly
- **Styling**: SASS (pre-compiled to CSS)
- **Hosting**: Planned for Netlify (free tier with automatic SSL)

## Getting Started

### Running Locally

No build step required. Start a local server:

```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000/index.html
```

### Project Structure

```
memorial-website/
├── index.html                 # Main website (production)
├── index-demo.html            # Template reference with component examples
├── CLAUDE.md                  # Claude Code instructions
├── implementation_plan.md     # Detailed development roadmap
├── assets/
│   ├── css/
│   │   └── main.css           # Compiled stylesheet
│   ├── js/
│   │   ├── main.js            # Core functionality (gallery, lightbox, scroll effects)
│   │   ├── util.js            # Utility functions
│   │   ├── language-toggle.js # Language switching (planned)
│   │   └── condolence-modal.js# Condolence image modal (planned)
│   ├── sass/                  # SCSS source files
│   └── webfonts/              # Font Awesome icons
├── images/
│   ├── home.jpeg              # Hero section portrait
│   ├── about.jpeg             # About section portrait
│   ├── professional/          # 65 career photos (01.jpg - 65.jpg)
│   ├── family/                # 155 personal photos (01.jpg - 155.jpg)
│   └── condolences/           # 10 attached images (01.jpg - 10.jpg)
└── content/                   # (Planned)
    ├── english.json           # English text content
    ├── turkish.json           # Turkish text content
    └── condolences.json       # Archived condolence messages
```

## Content Management

### Updating Images

- **Hero image**: Replace `images/home.jpeg` (keep same filename)
- **About image**: Replace `images/about.jpeg` (keep same filename)
- **Gallery images**: Add to `images/professional/` or `images/family/` with sequential numbering

### Adding Gallery Photos

1. Place the image in the appropriate folder with sequential naming (e.g., `66.jpg`)
2. Add the HTML in the gallery section:

```html
<article>
  <a href="images/professional/66.jpg" class="image">
    <img src="images/professional/66.jpg" loading="lazy" alt="Photo description">
  </a>
</article>
```

### Bilingual Content

Text content is stored in JSON files (`content/english.json`, `content/turkish.json`). The language toggle switches between these files. Condolence messages remain in their original language and are not translated.

## Section Components

The template uses reusable section patterns:

```html
<!-- Banner: Full-height hero -->
<section class="banner style1 orient-left content-align-left image-position-right fullscreen">

<!-- Spotlight: Content-image alternating layout -->
<section class="spotlight style1 orient-right onscroll-image-fade-in">

<!-- Gallery: Horizontal scroll with lightbox -->
<div class="gallery style2 medium lightbox onscroll-fade-in">
```

**Common classes:**
- Orientation: `orient-left`, `orient-right`
- Content alignment: `content-align-left`, `content-align-center`
- Image position: `image-position-center`, `image-position-left`, `image-position-right`
- Animations: `onload-image-fade-in`, `onscroll-fade-in`

## Deployment

### Netlify (Recommended)

1. Push code to GitHub repository
2. Connect repository to Netlify
3. No build settings needed (static site)
4. Configure custom domain in Netlify settings
5. SSL is automatic

### Performance Notes

- All gallery images must include `loading="lazy"` attribute
- Initial page load: ~2-5MB (hero + above-fold content)
- Total page size with all images: ~211MB
- If lightbox performance is poor with 220 images, GLightbox can be used as fallback

## Credits

**Template**: [Story by HTML5 UP](https://html5up.net/story) - Free for personal and commercial use under the [CCA 3.0 license](https://html5up.net/license)

**Libraries:**
- [jQuery](https://jquery.com)
- [Scrollex](https://github.com/ajlkn/jquery.scrollex)
- [Font Awesome](https://fontawesome.io)

**Original Template Author**: AJ (aj@lkn.io | @ajlkn)
