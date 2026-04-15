# Townline Digital Website

Static multi-page site for Townline Digital.

## File map

- `content.js`
  - Main editable content file
  - Controls page text, navigation labels, package pricing, service lists, contact info, service area text, and image paths
- `styles.css`
  - Controls colors, typography, spacing, layout, button styles, and responsive behavior
- `app.js`
  - Renders the shared header, footer, and page sections from `content.js`
  - Handles the mobile navigation, contact form email draft, and reveal animations
- `index.html`, `services.html`, `packages.html`, `about.html`, `contact.html`
  - The five page shells
  - Only need small edits unless you want to change page-level scripts or fallback metadata
- `assets/townline-digital-logo.png`
  - Main logo file used in the header, footer, hero, and brand sections

## What to edit later

- Change text, navigation, package content, contact info, and image paths in `content.js`
- Change the color system or fonts in `styles.css`
- Replace the logo by swapping the file in `assets/` or by updating the logo path in `content.js`
- Update package pricing or add-ons in `content.js > offerings`

## Local preview

If Python 3 is available:

```bash
python3 -m http.server 8011
```

Then open `http://localhost:8011`.

## Contact form note

The current quote form opens a pre-filled email draft using the email address in `content.js`.
For launch, you can keep that approach or connect the form to a hosted form service later.

## Before publishing

- Replace the placeholder email and phone number in `content.js`
- Test all links and package CTAs
- If you want direct form submissions without an email app, connect a hosted form provider before going live

## Publish with Vercel

One simple publish path is Vercel:

1. Put the site in a Git repository and push it to GitHub.
2. Import that repository into Vercel as a new project.
3. Deploy the site. If you use the CLI, a production deploy can be created with `vercel --prod`.
4. Add your custom domain to the project.
5. Update DNS based on the records Vercel shows for your project.

Useful Vercel commands from the current docs:

```bash
vercel --prod
vercel domains add example.com my-project
vercel domains inspect example.com
```

For custom domains, Vercel's current docs show an apex domain using an A record at `76.76.21.21`, and subdomains using a CNAME returned by `vercel domains inspect`. Follow the inspect output for the exact records your project needs.
