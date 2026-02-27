import { motion } from 'framer-motion'
import { useState } from 'react'
import { MessageSquare, HelpCircle, Lightbulb, Trophy, Megaphone, Search } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const categories = [
    { name: 'All', icon: MessageSquare, count: 47 },
    { name: 'Help & Support', icon: HelpCircle, count: 18 },
    { name: 'Feature Requests', icon: Lightbulb, count: 12 },
    { name: 'Show & Tell', icon: Trophy, count: 8 },
    { name: 'Research', icon: MessageSquare, count: 5 },
    { name: 'Announcements', icon: Megaphone, count: 4 },
]

const discussions = [
    { title: 'How to configure MediSync with Azure OpenAI?', category: 'Help & Support', replies: 5, author: 'dev_sarah', time: '2 hours ago', solved: true },
    { title: 'Feature: Add support for DiagnosticReport FHIR resource', category: 'Feature Requests', replies: 8, author: 'fhir_expert', time: '5 hours ago', solved: false },
    { title: 'Deployed MediSync to 12 rural clinics — here\'s what we learned', category: 'Show & Tell', replies: 23, author: 'healthbridge_ke', time: '1 day ago', solved: false },
    { title: 'Benchmarking Llama 3.1 vs GPT-4o for SOAP note generation', category: 'Research', replies: 14, author: 'mwebb_research', time: '2 days ago', solved: false },
    { title: 'MediSync v1.0.0-alpha.3 Release Notes', category: 'Announcements', replies: 3, author: 'medisync-bot', time: '3 days ago', solved: false },
    { title: 'Rate limiting configuration not working as expected', category: 'Help & Support', replies: 4, author: 'api_ninja', time: '3 days ago', solved: true },
    { title: 'Suggestion: Webhook notifications for async pipeline completion', category: 'Feature Requests', replies: 6, author: 'async_dev', time: '4 days ago', solved: false },
    { title: 'Using MediSync for Clinical Trial Eligibility — proof of concept', category: 'Research', replies: 11, author: 'trial_researcher', time: '5 days ago', solved: false },
]

export default function Forum() {
    const [activeCategory, setActiveCategory] = useState('All')
    const filtered = activeCategory === 'All' ? discussions : discussions.filter(d => d.category === activeCategory)

    return (
        <div>
            <section className="section-lg" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
                <div className="container text-center">
                    <motion.h1 className="text-display" style={{ marginBottom: 'var(--space-3)' }} initial="hidden" animate="visible" variants={fadeUp}>
                        Community <span className="text-gradient">Forum</span>
                    </motion.h1>
                    <motion.p className="text-dim" style={{ maxWidth: 500, margin: '0 auto' }} initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        Ask questions, share your projects, and connect with the MediSync community.
                    </motion.p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--space-6)' }}>
                        {/* Categories Sidebar */}
                        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                            <div className="glass-surface" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)' }}>
                                <div className="sidebar-title">Categories</div>
                                {categories.map(cat => (
                                    <button key={cat.name} className={`sidebar-link ${activeCategory === cat.name ? 'active' : ''}`} onClick={() => setActiveCategory(cat.name)} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <span className="flex items-center gap-2"><cat.icon size={14} />{cat.name}</span>
                                        <span className="text-caption">{cat.count}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Discussion List */}
                        <motion.div initial="hidden" animate="visible">
                            <motion.div className="search-box" style={{ marginBottom: 'var(--space-4)' }} variants={fadeUp}>
                                <Search size={16} className="search-icon" />
                                <input className="input" placeholder="Search discussions..." style={{ paddingLeft: 'var(--space-10)' }} />
                            </motion.div>

                            {filtered.map((d, i) => (
                                <motion.div key={d.title} className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-3)', cursor: 'pointer' }} variants={fadeUp} custom={i + 1}>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-1)' }}>
                                                <span className="text-white text-small" style={{ fontWeight: 500 }}>{d.title}</span>
                                                {d.solved && <span className="badge badge-success" style={{ fontSize: 9 }}>Solved</span>}
                                            </div>
                                            <div className="flex items-center gap-3 text-caption">
                                                <span className="badge" style={{ fontSize: 9 }}>{d.category}</span>
                                                <span>@{d.author}</span>
                                                <span>{d.time}</span>
                                            </div>
                                        </div>
                                        <span className="flex items-center gap-1 text-caption"><MessageSquare size={12} /> {d.replies}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
