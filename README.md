# Astro Blog with Decap CMS

A simple blog site built with Astro, MDX, and Tailwind CSS, featuring accessible footnote popovers and a web-based content management system.

## Features

- **Astro + MDX**: Fast static site generation with MDX support
- **Tailwind CSS**: Utility-first CSS framework with custom typography
- **Accessible Footnotes**: Click footnote references to open popovers instead of page jumps
- **Decap CMS**: Web-based content management interface
- **Clean Design**: Single-column layout with excellent typography

## Getting Started

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:4321/` to view the site

### Content Management

1. Visit `http://localhost:4321/admin/` to access the CMS
2. Use the web interface to create and edit blog posts
3. Posts are stored in `src/content/posts/` as MDX files

## Project Structure

```
src/
├── components/          # Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Prose.astro
│   └── FootnotePopover.astro
├── layouts/            # Page layouts
│   └── Layout.astro
├── pages/              # Routes
│   ├── index.astro
│   └── sample-article.astro
├── content/            # Content collections
│   ├── config.ts
│   └── posts/
│       └── sample-article.mdx
└── styles/
    └── global.css

public/
├── admin/              # CMS interface
│   ├── index.html
│   ├── config.yml
│   ├── cms.css
│   └── cms.js
└── images/
    └── uploads/        # Media uploads
```

## CMS Configuration

The CMS is configured in `public/admin/config.yml` with:

- **Backend**: Git Gateway for authentication
- **Collections**: Posts with frontmatter fields
- **Media**: Upload to `public/images/uploads/`
- **Custom Widgets**: Enhanced markdown editor with footnote support

## Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Enable Git Gateway in Netlify Identity settings
3. Deploy automatically on git push

### Other Platforms

The site can be deployed to any static hosting platform:

```bash
npm run build
```

The built site will be in the `dist/` directory.

## Footnotes

Footnotes are implemented with:

- **rehype-sidenotes**: Processes footnote syntax
- **Custom JavaScript**: Creates accessible popovers
- **Keyboard Support**: Escape key to close
- **Click Outside**: Dismiss popovers

## Customization

### Styling

- Edit `src/styles/global.css` for site styles
- Edit `public/admin/cms.css` for CMS interface styles

### CMS Fields

Modify `public/admin/config.yml` to add or change content fields.

### Components

Add new Astro components in `src/components/` and use them in layouts or pages.

## License

MIT