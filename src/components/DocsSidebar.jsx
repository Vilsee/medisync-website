import { NavLink } from 'react-router-dom'
import { BookOpen, Rocket, Code2, Server, Brain, Database, Settings, BarChart3, Layers } from 'lucide-react'

const sections = [
    {
        title: 'Getting Started',
        links: [
            { label: 'Documentation Home', path: '/docs', icon: BookOpen },
            { label: 'Quick Start Guide', path: '/docs/quickstart', icon: Rocket },
        ]
    },
    {
        title: 'API & SDK',
        links: [
            { label: 'SDK Reference', path: '/docs/sdk', icon: Code2 },
            { label: 'REST API Reference', path: '/docs/api', icon: Server },
        ]
    },
    {
        title: 'Guides',
        links: [
            { label: 'Agent Guides', path: '/docs/agents', icon: Brain },
            { label: 'FHIR Integration', path: '/docs/fhir', icon: Database },
            { label: 'Deployment Guide', path: '/docs/deployment', icon: Layers },
        ]
    },
    {
        title: 'Reference',
        links: [
            { label: 'Configuration', path: '/docs/config', icon: Settings },
            { label: 'Benchmarks', path: '/docs/benchmarks', icon: BarChart3 },
        ]
    }
]

export default function DocsSidebar() {
    return (
        <aside className="docs-sidebar glass-surface" style={{ padding: 'var(--space-4)' }}>
            {sections.map(section => (
                <div key={section.title} className="sidebar-section">
                    <div className="sidebar-title">{section.title}</div>
                    {section.links.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/docs'}
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        >
                            <span className="flex items-center gap-2">
                                <link.icon size={14} />
                                {link.label}
                            </span>
                        </NavLink>
                    ))}
                </div>
            ))}
        </aside>
    )
}
