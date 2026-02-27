import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Github, GitPullRequest, Star, ArrowRight, ExternalLink } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const contributors = [
    { name: 'Vilse Kumar', handle: 'vilseekumar', prs: 47, additions: 12400, avatar: 'VK' },
    { name: 'Alex Chen', handle: 'alexchen-dev', prs: 12, additions: 3200, avatar: 'AC' },
    { name: 'Priya Patel', handle: 'priyap', prs: 8, additions: 1800, avatar: 'PP' },
    { name: 'Jordan Smith', handle: 'jsmith-ml', prs: 6, additions: 1400, avatar: 'JS' },
    { name: 'Sarah Kim', handle: 'skim-fhir', prs: 5, additions: 900, avatar: 'SK' },
    { name: 'Marcus Webb', handle: 'mwebb-research', prs: 4, additions: 2100, avatar: 'MW' },
    { name: 'Emily Zhao', handle: 'ezhao', prs: 3, additions: 600, avatar: 'EZ' },
    { name: 'David Okafor', handle: 'dokafor-health', prs: 3, additions: 450, avatar: 'DO' },
]

const goodFirstIssues = [
    { title: 'Add AllergyIntolerance FHIR resource support', labels: ['good first issue', 'enhancement'], number: 42 },
    { title: 'Improve error messages for invalid FHIR bundles', labels: ['good first issue', 'dx'], number: 38 },
    { title: 'Add Spanish SOAP note template', labels: ['good first issue', 'i18n'], number: 55 },
    { title: 'Write integration test for Drug Interaction fallback', labels: ['good first issue', 'testing'], number: 61 },
]

export default function Contributors() {
    return (
        <div>
            <section className="section-lg" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
                <div className="container text-center">
                    <motion.span className="badge badge-violet" initial="hidden" animate="visible" variants={fadeUp}>Community</motion.span>
                    <motion.h1 className="text-display" style={{ margin: 'var(--space-4) auto' }} initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        Built by the <span className="text-gradient">Community</span>
                    </motion.h1>
                    <motion.p className="text-dim" style={{ maxWidth: 500, margin: '0 auto' }} initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        MediSync is open source and community-driven. Every contributor matters.
                    </motion.p>
                </div>
            </section>

            {/* Contributor Wall */}
            <section className="section">
                <div className="container">
                    <motion.div className="grid grid-4" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {contributors.map((c, i) => (
                            <motion.a key={c.handle} href={`https://github.com/${c.handle}`} target="_blank" rel="noopener" style={{ textDecoration: 'none' }} variants={fadeUp} custom={i}>
                                <div className="glass-card text-center">
                                    <div className="avatar avatar-lg mx-auto" style={{ marginBottom: 'var(--space-3)' }}>{c.avatar}</div>
                                    <h4 style={{ fontSize: 'var(--text-sm)', marginBottom: 2 }}>{c.name}</h4>
                                    <p className="text-caption" style={{ marginBottom: 'var(--space-3)' }}>@{c.handle}</p>
                                    <div className="flex justify-center gap-4 text-caption">
                                        <span className="flex items-center gap-1"><GitPullRequest size={12} className="text-success" /> {c.prs} PRs</span>
                                        <span className="flex items-center gap-1"><span className="text-electric">+</span>{c.additions.toLocaleString()}</span>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Good First Issues */}
            <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container" style={{ maxWidth: 700 }}>
                    <motion.h2 className="text-h1 text-center" style={{ marginBottom: 'var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        Good First Issues
                    </motion.h2>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {goodFirstIssues.map((issue, i) => (
                            <motion.a key={issue.number} href={`https://github.com/medisync-ai/medisync/issues/${issue.number}`} target="_blank" rel="noopener" style={{ textDecoration: 'none', display: 'block', marginBottom: 'var(--space-3)' }} variants={fadeUp} custom={i}>
                                <div className="glass-card" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <span className="text-white text-small" style={{ fontWeight: 500 }}>#{issue.number} {issue.title}</span>
                                        <div className="flex gap-2" style={{ marginTop: 4 }}>
                                            {issue.labels.map(l => <span key={l} className="badge" style={{ fontSize: 10 }}>{l}</span>)}
                                        </div>
                                    </div>
                                    <ExternalLink size={14} className="text-slate" />
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="section text-center">
                <div className="container">
                    <h2 className="text-h1" style={{ marginBottom: 'var(--space-4)' }}>Become a Contributor</h2>
                    <p className="text-dim" style={{ maxWidth: 500, margin: '0 auto var(--space-8)' }}>Read our contribution guide, pick an issue, and submit your first PR.</p>
                    <div className="flex gap-4 justify-center">
                        <a href="https://github.com/medisync-ai/medisync" target="_blank" rel="noopener" className="btn btn-primary btn-lg"><Github size={16} /> View on GitHub</a>
                        <Link to="/docs" className="btn btn-secondary btn-lg">Read Docs</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
