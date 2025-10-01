# Frequently Asked Questions

## About This Website

### What is this website built with?

This website is built using vanilla HTML, CSS, and JavaScript with Markdown support. It uses the Marked.js library to parse Markdown content into HTML dynamically.

**Tech Stack:**
- HTML5 for structure
- CSS3 with Grid and Flexbox for responsive layout
- Vanilla JavaScript for functionality
- Marked.js for Markdown parsing
- No build tools or complex frameworks

### Why not use a modern framework like React or Next.js?

Great question! While modern frameworks are powerful, they're not always necessary. This site demonstrates that you can create beautiful, functional websites with just the fundamentals. Benefits include:

- **Faster loading times** - No large JavaScript bundles
- **Easier maintenance** - Simple, readable code
- **Better performance** - Minimal overhead
- **Universal compatibility** - Works everywhere
- **Learning value** - Understand the basics first

### How do I add new content?

Adding content is simple:

1. **New pages**: Create a `.md` file in the `pages/` folder
2. **Blog posts**: Create a `.md` file in the `blog/` folder
3. **Update navigation**: Modify the nav menu in `index.html` if needed

The JavaScript will automatically load and render your Markdown content.

### Is this website responsive?

Yes! The website is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## Technical Questions

### How does the routing work?

The site uses client-side routing with JavaScript. When you click a navigation link, it:

1. Prevents the default page reload
2. Loads the appropriate Markdown file
3. Converts it to HTML using Marked.js
4. Updates the page content dynamically
5. Updates the browser URL for proper navigation

### Can I add a contact form?

Absolutely! You can add a contact form by:

1. Creating a new page (e.g., `pages/contact.md`)
2. Adding HTML form elements in your Markdown
3. Using a service like Netlify Forms, Formspree, or EmailJS for form handling

### How do I customize the design?

The design is controlled by CSS in `assets/css/style.css`. You can:

- Change colors by updating CSS variables
- Modify layouts using CSS Grid and Flexbox
- Add new components by creating CSS classes
- Customize typography and spacing

### Can I add more interactive features?

Yes! Since you have full control over the JavaScript, you can add:

- Image galleries
- Interactive components
- Third-party integrations
- Custom animations
- And much more!

## Content Management

### How do I write in Markdown?

Markdown is a simple markup language. Here are the basics:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered list item 1
2. Numbered list item 2

[Link text](https://example.com)

![Image alt text](image-url.jpg)
```

### Can I use HTML in my Markdown files?

Yes! Markdown supports inline HTML, so you can add:

- Custom styling with `<div>` and classes
- Forms and interactive elements
- Embedded videos or iframes
- Any HTML you need

### How do I add images?

You can add images in several ways:

1. **Local images**: Place them in an `assets/images/` folder and reference them:
   ```markdown
   ![Description](assets/images/my-image.jpg)
   ```

2. **External images**: Link directly to online images:
   ```markdown
   ![Description](https://example.com/image.jpg)
   ```

## Deployment

### How do I deploy this website?

Since this is a static website, you can deploy it anywhere:

- **Netlify**: Drag and drop your folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a GitHub repository
- **Traditional hosting**: Upload files via FTP

### Do I need a server?

No! This is a static website that runs entirely in the browser. You can:

- Open `index.html` directly in your browser for local development
- Host it on any static hosting service
- Serve it from any web server (Apache, Nginx, etc.)

### What about SEO?

The website is SEO-friendly with:

- Semantic HTML structure
- Proper heading hierarchy
- Meta tags (you can add more in `index.html`)
- Clean URLs (with client-side routing)
- Fast loading times

For even better SEO, consider adding:
- Open Graph meta tags
- JSON-LD structured data
- XML sitemap
- robots.txt file

---

## Still Have Questions?

If you have more questions or need help customizing your site, feel free to reach out through the [contact page](/contact) or check out the [blog](/blog) for tutorials and tips!
