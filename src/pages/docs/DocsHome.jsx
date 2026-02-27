import DocsSidebar from '../../components/DocsSidebar'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Rocket, Code2, Server, Brain, Database, Layers, Settings, BarChart3, Terminal, Search, Github, ExternalLink } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }) }

const cards = [
    { icon: Rocket, title: 'Quick Start', desc: 'pip install → first SOAP note in 60 minutes', path: '/docs/quickstart', color: 'var(--status-success)' },
    { icon: Code2, title: 'SDK Reference', desc: 'Full Python SDK API with examples', path: '/docs/sdk', color: 'var(--brand-electric)' },
    { icon: Server, title: 'REST API', desc: 'Interactive OpenAPI 3.1 Swagger UI', path: '/docs/api', color: 'var(--accent-violet)' },
    { icon: Brain, title: 'Agent Guides', desc: 'Deep-dive into each AI agent', path: '/docs/agents', color: 'var(--status-warning)' },
    { icon: Database, title: 'FHIR Integration', desc: 'Build valid FHIR R4 Bundles', path: '/docs/fhir', color: 'var(--brand-sky)' },
    { icon: Layers, title: 'Deployment', desc: 'Docker, Kubernetes, Library Mode', path: '/docs/deployment', color: 'var(--accent-emerald)' },
    { icon: Settings, title: 'Configuration', desc: 'Every config option documented', path: '/docs/config', color: 'var(--neutral-dim)' },
    { icon: BarChart3, title: 'Benchmarks', desc: 'Accuracy scores and latency metrics', path: '/docs/benchmarks', color: 'var(--status-critical)' },
]

export default function DocsHome() {
    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <div className="docs-layout">
                <DocsSidebar />
                <div>
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 'var(--space-8)' }}>
                            <h1 className="text-display" style={{ marginBottom: 'var(--space-3)' }}>Documentation</h1>
                            <p className="text-dim" style={{ maxWidth: 600, lineHeight: 1.7 }}>
                                Everything you need to integrate MediSync into your application — from Quick Start to deployment guides.
                            </p>
                        </motion.div>

                        {/* Quick Start Hero */}
                        <motion.div className="glass-card" style={{ padding: 'var(--space-8)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: 'var(--space-10)' }} variants={fadeUp} custom={1}>
                            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-3)' }}>
                                <Terminal size={20} className="text-success" />
                                <h2 style={{ fontSize: 'var(--text-xl)' }}>Quick Start</h2>
                            </div>
                            <p className="text-dim text-small" style={{ marginBottom: 'var(--space-4)' }}>
                                From <code className="code-inline">pip install</code> to your first SOAP note in under 60 minutes.
                            </p>
                            <div className="code-block" style={{ marginBottom: 'var(--space-4)' }}>
                                <span style={{ color: 'var(--status-success)' }}>$</span> pip install medisync-agents{'\n'}
                                <span style={{ color: 'var(--status-success)' }}>$</span> medisync demo
                            </div>
                            <Link to="/docs/quickstart" className="btn btn-primary btn-sm">Get Started →</Link>
                        </motion.div>

                        {/* Doc Cards Grid */}
                        <motion.div className="grid grid-2" variants={fadeUp} custom={2}>
                            {cards.map((card, i) => (
                                <motion.div key={card.path} variants={fadeUp} custom={i + 3}>
                                    <Link to={card.path} style={{ textDecoration: 'none' }}>
                                        <div className="glass-card" style={{ cursor: 'pointer' }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                                                <card.icon size={20} style={{ color: card.color }} />
                                            </div>
                                            <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-1)' }}>{card.title}</h3>
                                            <p className="text-dim text-small">{card.desc}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Codespaces Button */}
                        <motion.div className="glass-card text-center" style={{ marginTop: 'var(--space-10)', padding: 'var(--space-8)' }} variants={fadeUp} custom={12}>
                            <Github size={28} className="text-dim mx-auto" style={{ marginBottom: 'var(--space-3)' }} />
                            <h3 style={{ marginBottom: 'var(--space-2)' }}>Zero-Setup Onboarding</h3>
                            <p className="text-dim text-small" style={{ marginBottom: 'var(--space-4)' }}>Open MediSync in GitHub Codespaces — no local setup required.</p>
                            <a href="https://github.com/codespaces/new?repo=medisync-ai/medisync" target="_blank" rel="noopener" className="btn btn-secondary">
                                <ExternalLink size={14} /> Open in Codespaces
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
