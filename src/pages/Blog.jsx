import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Tag, User } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const tags = ['All', 'Engineering', 'Clinical', 'Community', 'Research']

const posts = [
    {
        title: 'Introducing MediSync: An Open-Source Multi-Agent EHR Copilot',
        excerpt: 'We\'re launching MediSync — a pip-installable, multi-agent SDK for clinical documentation, drug interaction analysis, and medical coding. Here\'s why we built it and what it can do.',
        date: '2025-06-15',
        readTime: '8 min',
        tag: 'Engineering',
        author: 'Vilse Kumar',
        featured: true,
    },
    {
        title: 'How We Built the Drug Interaction Agent',
        excerpt: 'A deep-dive into architecting the Drug Interaction Analyst — from RxNorm lookups to BioBERT NER to severity classification with evidence chains.',
        date: '2025-06-10',
        readTime: '12 min',
        tag: 'Engineering',
        author: 'MediSync Core',
    },
    {
        title: 'Benchmarking SOAP Note Quality: Our Physician Evaluation Framework',
        excerpt: 'How we designed a 5-point rubric for blind physician evaluation of AI-generated SOAP notes, and what our early results show.',
        date: '2025-06-08',
        readTime: '6 min',
        tag: 'Clinical',
        author: 'MediSync Core',
    },
    {
        title: 'ICD-10 Coding Accuracy: MIMIC-IV Evaluation Results',
        excerpt: 'Our Medical Coding Advisor achieves 88%+ top-3 accuracy on MIMIC-IV discharge summaries. Here\'s the methodology and results breakdown.',
        date: '2025-06-05',
        readTime: '10 min',
        tag: 'Research',
        author: 'MediSync Core',
    },
    {
        title: 'Setting Up MediSync with Ollama for Air-Gapped Deployments',
        excerpt: 'A step-by-step guide to running MediSync entirely offline using Ollama and SQLite. Perfect for HIPAA-sensitive environments.',
        date: '2025-06-01',
        readTime: '5 min',
        tag: 'Engineering',
        author: 'MediSync Core',
    },
    {
        title: 'Community Spotlight: First External Contributors',
        excerpt: 'Meet the developers who submitted our first external PRs — from new agent prototypes to documentation improvements.',
        date: '2025-05-28',
        readTime: '4 min',
        tag: 'Community',
        author: 'MediSync Core',
    },
]

export default function Blog() {
    const [activeTag, setActiveTag] = useState('All')
    const filtered = activeTag === 'All' ? posts : posts.filter(p => p.tag === activeTag)

    return (
        <div>
            <section className="section-lg" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
                <div className="container">
                    <motion.div className="text-center" initial="hidden" animate="visible">
                        <motion.span className="badge" variants={fadeUp}>Blog</motion.span>
                        <motion.h1 className="text-display" style={{ margin: 'var(--space-4) auto' }} variants={fadeUp} custom={1}>
                            Updates & <span className="text-gradient">Insights</span>
                        </motion.h1>
                        <motion.p className="text-dim" style={{ maxWidth: 500, margin: '0 auto var(--space-8)' }} variants={fadeUp} custom={2}>
                            Release notes, technical deep-dives, benchmark results, and community spotlights.
                        </motion.p>
                    </motion.div>

                    {/* Tag Filters */}
                    <motion.div className="flex gap-2 justify-center" style={{ marginBottom: 'var(--space-10)' }} initial="hidden" animate="visible" variants={fadeUp} custom={3}>
                        {tags.map(tag => (
                            <button key={tag} className={`tab ${activeTag === tag ? 'active' : ''}`} onClick={() => setActiveTag(tag)}>
                                {tag}
                            </button>
                        ))}
                    </motion.div>

                    {/* Featured Post */}
                    {filtered.find(p => p.featured) && (
                        <motion.div className="glass-card" style={{ padding: 'var(--space-10)', marginBottom: 'var(--space-8)', border: '1px solid rgba(37,99,235,0.2)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <span className="badge" style={{ marginBottom: 'var(--space-4)' }}>Featured</span>
                            <h2 style={{ marginBottom: 'var(--space-3)' }}>{filtered.find(p => p.featured).title}</h2>
                            <p className="text-dim" style={{ lineHeight: 1.7, marginBottom: 'var(--space-4)', maxWidth: 700 }}>{filtered.find(p => p.featured).excerpt}</p>
                            <div className="flex items-center gap-4 text-caption">
                                <span className="flex items-center gap-1"><User size={12} /> {filtered.find(p => p.featured).author}</span>
                                <span className="flex items-center gap-1"><Calendar size={12} /> {filtered.find(p => p.featured).date}</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {filtered.find(p => p.featured).readTime}</span>
                                <span className="badge" style={{ fontSize: 10 }}><Tag size={10} /> {filtered.find(p => p.featured).tag}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Post Grid */}
                    <motion.div className="grid grid-3" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {filtered.filter(p => !p.featured).map((post, i) => (
                            <motion.article key={post.title} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }} variants={fadeUp} custom={i}>
                                <span className={`badge ${post.tag === 'Clinical' ? 'badge-success' : post.tag === 'Community' ? 'badge-violet' : post.tag === 'Research' ? 'badge-warning' : ''}`} style={{ alignSelf: 'flex-start', marginBottom: 'var(--space-3)' }}>
                                    <Tag size={10} /> {post.tag}
                                </span>
                                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>{post.title}</h3>
                                <p className="text-dim text-small" style={{ lineHeight: 1.6, marginBottom: 'var(--space-4)', flex: 1 }}>{post.excerpt}</p>
                                <div className="flex items-center gap-3 text-caption">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
