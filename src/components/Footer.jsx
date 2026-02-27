import { Link } from 'react-router-dom'
import { Github, Twitter, BookOpen, MessageSquare, Heart, ExternalLink } from 'lucide-react'
import './Footer.css'

const footerLinks = {
    Product: [
        { label: 'Features', path: '/features' },
        { label: 'How It Works', path: '/how-it-works' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'Use Cases', path: '/use-cases' },
        { label: 'Playground', path: '/playground' },
    ],
    Developers: [
        { label: 'Documentation', path: '/docs' },
        { label: 'Quick Start', path: '/docs/quickstart' },
        { label: 'API Reference', path: '/docs/api' },
        { label: 'SDK Reference', path: '/docs/sdk' },
        { label: 'FHIR Guide', path: '/docs/fhir' },
    ],
    Community: [
        { label: 'Contributors', path: '/community/contributors' },
        { label: 'Showcase', path: '/community/showcase' },
        { label: 'Roadmap', path: '/community/roadmap' },
        { label: 'Forum', path: '/community/forum' },
        { label: 'Blog', path: '/blog' },
    ],
    Resources: [
        { label: 'Agent Guides', path: '/docs/agents' },
        { label: 'Deployment', path: '/docs/deployment' },
        { label: 'Benchmarks', path: '/docs/benchmarks' },
        { label: 'Config Reference', path: '/docs/config' },
        { label: 'About', path: '/about' },
    ],
}

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-gradient" />
            <div className="container-lg">
                {/* Main Footer */}
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                <circle cx="16" cy="16" r="14" stroke="url(#footer-grad)" strokeWidth="2.5" />
                                <circle cx="10" cy="14" r="3" fill="#2563EB" />
                                <circle cx="22" cy="14" r="3" fill="#7C3AED" />
                                <circle cx="16" cy="22" r="3" fill="#60A5FA" />
                                <defs>
                                    <linearGradient id="footer-grad" x1="0" y1="0" x2="32" y2="32">
                                        <stop stopColor="#2563EB" />
                                        <stop offset="1" stopColor="#7C3AED" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span>MediSync</span>
                        </Link>
                        <p className="footer-desc">
                            Open-source, multi-agent SDK for clinical documentation, drug interaction analysis, and medical coding.
                        </p>
                        <div className="footer-social">
                            <a href="https://github.com/medisync-ai/medisync" target="_blank" rel="noopener" className="social-link" aria-label="GitHub"><Github size={18} /></a>
                            <a href="#" className="social-link" aria-label="Twitter"><Twitter size={18} /></a>
                            <a href="/docs" className="social-link" aria-label="Docs"><BookOpen size={18} /></a>
                            <a href="/community/forum" className="social-link" aria-label="Forum"><MessageSquare size={18} /></a>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="footer-column">
                            <h4 className="footer-column-title">{title}</h4>
                            <ul className="footer-link-list">
                                {links.map(link => (
                                    <li key={link.path}>
                                        <Link to={link.path} className="footer-link">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <span>© {new Date().getFullYear()} MediSync. MIT License.</span>
                        <span className="footer-separator">·</span>
                        <span className="footer-note">Not a medical device — for informational purposes only.</span>
                    </div>
                    <div className="footer-bottom-right">
                        <span className="flex items-center gap-1 text-caption">
                            Made with <Heart size={12} className="text-critical" /> for clinicians and developers
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
