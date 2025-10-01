// Simple static site with markdown support
class StaticSite {
    constructor() {
        this.currentPage = 'home';
        this.blogPosts = [];
        this.init();
    }

    init() {
        // Initialize mobile menu
        this.initMobileMenu();
        
        // Load initial page
        this.loadPage('home');
        
        // Load blog posts index
        this.loadBlogIndex();
    }

    initMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenu) {
            mobileMenu.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    async loadPage(pageName) {
        const content = document.getElementById('content');
        this.currentPage = pageName;

        // Update active nav link
        this.updateActiveNavLink(pageName);

        try {
            // Show loading spinner
            content.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

            let pageContent = '';

            switch (pageName) {
                case 'home':
                    pageContent = await this.loadMarkdownPage('pages/home.md');
                    break;
                case 'about':
                    pageContent = await this.loadMarkdownPage('pages/about.md');
                    break;
                case 'faq':
                    pageContent = await this.loadMarkdownPage('pages/faq.md');
                    break;
                case 'blog':
                    pageContent = this.renderBlogList();
                    break;
                default:
                    if (pageName.startsWith('blog/')) {
                        const postSlug = pageName.replace('blog/', '');
                        pageContent = await this.loadBlogPost(postSlug);
                    } else {
                        pageContent = '<div class="container"><h1>Page Not Found</h1><p>The page you are looking for does not exist.</p></div>';
                    }
            }

            content.innerHTML = pageContent;
        } catch (error) {
            console.error('Error loading page:', error);
            content.innerHTML = '<div class="container"><div class="error">Error loading page. Please try again.</div></div>';
        }
    }

    async loadMarkdownPage(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            const markdown = await response.text();
            const html = marked.parse(markdown);
            return `<div class="container"><div class="markdown-content">${html}</div></div>`;
        } catch (error) {
            console.error('Error loading markdown:', error);
            return `<div class="container"><div class="error">Failed to load content from ${filePath}</div></div>`;
        }
    }

    async loadBlogIndex() {
        try {
            const response = await fetch('blog/index.json');
            if (response.ok) {
                this.blogPosts = await response.json();
            }
        } catch (error) {
            console.log('No blog index found, using default posts');
            // Default blog posts if index.json doesn't exist
            this.blogPosts = [
                {
                    slug: 'welcome',
                    title: 'Welcome to My Blog',
                    date: '2024-01-01',
                    excerpt: 'This is my first blog post. Welcome to my simple static site!'
                },
                {
                    slug: 'markdown-guide',
                    title: 'Markdown Guide',
                    date: '2024-01-02',
                    excerpt: 'A quick guide on how to write content in Markdown for this site.'
                }
            ];
        }
    }

    renderBlogList() {
        const postsHtml = this.blogPosts.map(post => `
            <article class="blog-post">
                <div class="blog-post-header">
                    <h2 class="blog-post-title">
                        <a href="#" onclick="site.loadPage('blog/${post.slug}')" style="text-decoration: none; color: inherit;">
                            ${post.title}
                        </a>
                    </h2>
                    <div class="blog-post-meta">
                        Published on ${new Date(post.date).toLocaleDateString()}
                    </div>
                </div>
                <div class="blog-post-content">
                    <p class="blog-post-excerpt">${post.excerpt}</p>
                    <a href="#" onclick="site.loadPage('blog/${post.slug}')" class="btn" style="margin-top: 1rem;">Read More</a>
                </div>
            </article>
        `).join('');

        return `
            <div class="container">
                <h1 class="section-title">Blog</h1>
                <div class="blog-posts">
                    ${postsHtml}
                </div>
            </div>
        `;
    }

    async loadBlogPost(slug) {
        try {
            const response = await fetch(`blog/${slug}.md`);
            if (!response.ok) {
                throw new Error(`Blog post not found: ${slug}`);
            }
            const markdown = await response.text();
            const html = marked.parse(markdown);
            
            // Find post metadata
            const post = this.blogPosts.find(p => p.slug === slug);
            const title = post ? post.title : slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            const date = post ? new Date(post.date).toLocaleDateString() : '';

            return `
                <div class="container">
                    <article class="blog-post">
                        <div class="blog-post-header">
                            <h1 class="blog-post-title">${title}</h1>
                            ${date ? `<div class="blog-post-meta">Published on ${date}</div>` : ''}
                        </div>
                        <div class="blog-post-content markdown-content">
                            ${html}
                        </div>
                    </article>
                    <div style="margin-top: 2rem;">
                        <a href="#" onclick="site.loadPage('blog')" class="btn">← Back to Blog</a>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error loading blog post:', error);
            return `
                <div class="container">
                    <div class="error">Blog post not found: ${slug}</div>
                    <div style="margin-top: 1rem;">
                        <a href="#" onclick="site.loadPage('blog')" class="btn">← Back to Blog</a>
                    </div>
                </div>
            `;
        }
    }

    updateActiveNavLink(pageName) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page link
        const activeLink = document.querySelector(`.nav-link[onclick="loadPage('${pageName}')"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Global functions for onclick handlers
function loadPage(pageName) {
    site.loadPage(pageName);
}

// Initialize the site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.site = new StaticSite();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        site.loadPage(event.state.page);
    }
});

// Update browser history when navigating
const originalLoadPage = StaticSite.prototype.loadPage;
StaticSite.prototype.loadPage = function(pageName) {
    // Update browser history
    const url = pageName === 'home' ? '/' : `/${pageName}`;
    history.pushState({ page: pageName }, '', url);
    
    // Call original loadPage method
    return originalLoadPage.call(this, pageName);
};
