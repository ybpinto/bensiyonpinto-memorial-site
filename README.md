# Memorial Website

A bilingual (English/Turkish) memorial website built on the HTML5 UP Story template. Features photo galleries with 220 images, 122 archived condolence messages, and responsive design optimized for all devices.

## Features

- **Bilingual Support**: English and Turkish language toggle with browser language detection
- **Multi-Page Layout**: Separate pages for Home, About, Gallery, and Condolences
- **Photo Galleries**: Two galleries with lazy-loaded images and toggle navigation
  - Community Leadership: 65 photos
  - Family & Friends: 155 photos
- **Condolence Messages**: 122 archived messages (10 with attached images)
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Lightbox**: Built-in gallery lightbox for full-screen image viewing
- **Performance**: Native lazy loading for images

## Tech Stack

- **Template**: [HTML5 UP Story](https://html5up.net/story)
- **Libraries**: jQuery, Scrollex, Scrolly
- **Styling**: SASS (pre-compiled to CSS)
- **Hosting**: GitHub Pages

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
├── index.html                 # Home page (hero section)
├── about.html                 # About page (biography)
├── gallery.html               # Gallery page (professional + family with toggle)
├── condolences.html           # Condolences page (dynamically loaded messages)
├── demo.html                  # Template reference with all component examples
├── README.md                  # This file
├── CLAUDE.md                  # AI assistant instructions
├── .gitattributes             # Git attributes for image handling
├── assets/
│   ├── css/
│   │   ├── main.css           # Story template styles (includes gallery)
│   │   ├── custom.css         # Custom styles (navbar, condolences, galleries)
│   │   └── noscript.css       # Fallback styles when JS disabled
│   ├── js/
│   │   ├── main.js            # Story template scripts (includes gallery lightbox)
│   │   ├── language-toggle.js # Language switching functionality
│   │   └── condolence-modal.js # Condolence loading and image modal
│   ├── sass/                  # SCSS source files (pre-compiled)
│   └── webfonts/              # Template fonts
├── images/
│   ├── home.jpeg              # Main headshot for hero section
│   ├── about.jpeg             # Different headshot for about section
│   ├── professional/          # 65 career photos (UUID filenames)
│   │   └── *.jpg              # e.g., 03499452-6802-4ed8-bf5e-c3da93b59c7f.jpg
│   ├── family/                # 155 family photos (UUID filenames)
│   │   └── *.jpg
│   └── condolences/           # 10 images attached to messages (UUID filenames)
│       └── *.jpeg
├── content/
│   ├── en.json                # All English text content (ISO 639-1)
│   ├── tr.json                # All Turkish text content (ISO 639-1)
│   └── condolences.json       # 122 archived messages (not translated)
```

## Site Pages

### Home (`index.html`)
Full-height hero banner with portrait image and introductory text.

### About (`about.html`)
Spotlight section with biography and portrait in alternating layout.

### Gallery (`gallery.html`)
Photo galleries with a toggle to switch between:
- **Community Leadership**: 65 photos from his professional and community work
- **Family & Friends**: 155 personal and family photos

Both galleries use the Story template's built-in lightbox.

### Condolences (`condolences.html`)
Dynamically loaded condolence messages from `content/condolences.json`. Messages with attached images display them in a native HTML `<dialog>` modal.

## Navigation

A fixed navigation bar appears on all pages with:
- **Language switcher** (EN | TR) on the left
- **Page links** (Home, About, Professional, Condolences) on the right

## Content Management

### Updating Images

- **Hero image**: Replace `images/home.jpeg` (keep same filename)
- **About image**: Replace `images/about.jpeg` (keep same filename)
- **Gallery images**: Add to `images/professional/` or `images/family/` with UUID filenames

### Adding Gallery Photos

1. Place the image in the appropriate folder with a UUID filename (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg`)
2. Add the HTML in the gallery section of `gallery.html`:

```html
<article>
  <a href="images/professional/your-uuid.jpg" class="image">
    <img src="images/professional/your-uuid.jpg" loading="lazy" alt="">
  </a>
</article>
```

### Bilingual Content

Text content is stored in JSON files (`content/en.json`, `content/tr.json`). The language toggle switches between these files. Condolence messages remain in their original language and are not translated.

## Section Components

The template uses reusable section patterns:

```html
<!-- Banner: Full-height hero -->
<section class="banner style1 orient-left content-align-left image-position-right fullscreen">

<!-- Spotlight: Content-image alternating layout -->
<section class="spotlight style1 orient-right onscroll-image-fade-in">

<!-- Gallery: Grid with lightbox -->
<div class="gallery style1 lightbox onscroll-fade-in">
```

**Common classes:**
- Orientation: `orient-left`, `orient-right`
- Content alignment: `content-align-left`, `content-align-center`
- Image position: `image-position-center`, `image-position-left`, `image-position-right`
- Animations: `onload-image-fade-in`, `onscroll-fade-in`

## Deployment

### GitHub Pages

1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Set source to "Deploy from a branch"
4. Select the branch (e.g., `main` or `gh-pages`) and root folder
5. Save - site will be live at `https://<username>.github.io/<repo-name>/`
6. For custom domain: add domain in Pages settings and configure DNS

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
