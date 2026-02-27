import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Github, ChevronDown, Terminal, BookOpen, FlaskConical, Users } from 'lucide-react'
import './Navbar.css'

const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
]

const docsLinks = [
    { label: 'Documentation', path: '/docs', icon: BookOpen },
    { label: 'Quick Start', path: '/docs/quickstart', icon: Terminal },
    { label: 'API Reference', path: '/docs/api', icon: BookOpen },
    { label: 'Agent Guides', path: '/docs/agents', icon: FlaskConical },
]

const toolsLinks = [
    { label: 'Playground', path: '/playground' },
    { label: 'FHIR Builder', path: '/tools/fhir-builder' },
    { label: 'Output Inspector', path: '/tools/inspector' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [docsOpen, setDocsOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setMobileOpen(false)
        setDocsOpen(false)
    }, [location])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav className={`navbar glass-nav ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-inner container-lg">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="14" stroke="url(#logo-grad)" strokeWidth="2.5" />
                            <circle cx="10" cy="14" r="3" fill="#2563EB" />
                            <circle cx="22" cy="14" r="3" fill="#7C3AED" />
                            <circle cx="16" cy="22" r="3" fill="#60A5FA" />
                            <line x1="10" y1="14" x2="22" y2="14" stroke="#2563EB" strokeWidth="1.5" opacity="0.4" />
                            <line x1="10" y1="14" x2="16" y2="22" stroke="#60A5FA" strokeWidth="1.5" opacity="0.4" />
                            <line x1="22" y1="14" x2="16" y2="22" stroke="#7C3AED" strokeWidth="1.5" opacity="0.4" />
                            <defs>
                                <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
                                    <stop stopColor="#2563EB" />
                                    <stop offset="1" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="logo-text">MediSync</span>
                </Link>

                {/* Desktop Links */}
                <div className="navbar-links">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    {/* Docs Dropdown */}
                    <div className="nav-dropdown" onMouseEnter={() => setDocsOpen(true)} onMouseLeave={() => setDocsOpen(false)}>
                        <button className="nav-link nav-dropdown-trigger">
                            Docs <ChevronDown size={14} />
                        </button>
                        {docsOpen && (
                            <div className="nav-dropdown-menu glass-surface">
                                <div className="dropdown-section">
                                    <span className="dropdown-label">Developer Docs</span>
                                    {docsLinks.map(link => (
                                        <Link key={link.path} to={link.path} className="dropdown-item">
                                            <link.icon size={16} />
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                                <div className="dropdown-divider" />
                                <div className="dropdown-section">
                                    <span className="dropdown-label">Interactive Tools</span>
                                    {toolsLinks.map(link => (
                                        <Link key={link.path} to={link.path} className="dropdown-item">
                                            <FlaskConical size={16} />
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                                <div className="dropdown-divider" />
                                <Link to="/community/contributors" className="dropdown-item">
                                    <Users size={16} /> Community
                                </Link>
                            </div>
                        )}
                    </div>

                    <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Blog
                    </NavLink>
                </div>

                {/* Right Actions */}
                <div className="navbar-actions">
                    <a href="https://github.com/medisync-ai/medisync" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-icon" aria-label="GitHub">
                        <Github size={20} />
                    </a>
                    <Link to="/docs/quickstart" className="btn btn-primary btn-sm">
                        <Terminal size={14} />
                        Install SDK
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="navbar-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="navbar-mobile glass-surface">
                    {navLinks.map(link => (
                        <NavLink key={link.path} to={link.path} className="mobile-link">{link.label}</NavLink>
                    ))}
                    <div className="divider" style={{ margin: '8px 0' }} />
                    <span className="mobile-section-label">Developer</span>
                    {docsLinks.map(link => (
                        <NavLink key={link.path} to={link.path} className="mobile-link">{link.label}</NavLink>
                    ))}
                    <div className="divider" style={{ margin: '8px 0' }} />
                    <span className="mobile-section-label">Tools</span>
                    {toolsLinks.map(link => (
                        <NavLink key={link.path} to={link.path} className="mobile-link">{link.label}</NavLink>
                    ))}
                    <div className="divider" style={{ margin: '8px 0' }} />
                    <NavLink to="/blog" className="mobile-link">Blog</NavLink>
                    <NavLink to="/community/contributors" className="mobile-link">Community</NavLink>
                    <div style={{ padding: '12px 16px' }}>
                        <Link to="/docs/quickstart" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                            <Terminal size={14} /> Install SDK
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
