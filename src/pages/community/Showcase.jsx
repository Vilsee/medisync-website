import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const showcaseItems = [
    { title: 'DiabetesAI — Smart Glucose Monitoring EHR', desc: 'Integrated MediSync SDK for auto-generating SOAP notes during telemedicine visits. Reduced documentation time by 55%.', type: 'EHR Integration', link: '#' },
    { title: 'MedCode Research — ICD-10 Benchmark Study', desc: 'Used MediSync\'s coding agent as a baseline in a published study on automated medical coding accuracy.', type: 'Research Paper', link: '#' },
    { title: 'ClinicalPipeline.io — Agent Orchestration Platform', desc: 'Built on top of MediSync SDK to add custom agents for radiology report generation and clinical trial matching.', type: 'Derivative Tool', link: '#' },
    { title: 'HealthBridge Africa — Rural Clinic Deployment', desc: 'Deployed MediSync in Library Mode with Ollama across 12 rural clinics in Kenya for offline clinical documentation.', type: 'Deployment', link: '#' },
    { title: 'PharmSafe — Drug Interaction Alert System', desc: 'Wrapped MediSync\'s Drug Interaction Analyst into a standalone pharmacist alerting tool with SMS notifications.', type: 'Derivative Tool', link: '#' },
    { title: 'Uni of Melbourne — NLP in Healthcare Course', desc: 'Uses MediSync as a teaching tool in their graduate NLP for Healthcare course, with students contributing back.', type: 'Education', link: '#' },
]

export default function Showcase() {
    return (
        <div>
            <section className="section-lg" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
                <div className="container text-center">
                    <motion.span className="badge" initial="hidden" animate="visible" variants={fadeUp}>Showcase</motion.span>
                    <motion.h1 className="text-display" style={{ margin: 'var(--space-4) auto' }} initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        Built with <span className="text-gradient">MediSync</span>
                    </motion.h1>
                    <motion.p className="text-dim" style={{ maxWidth: 500, margin: '0 auto' }} initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        See how the community is using MediSync in the wild.
                    </motion.p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <motion.div className="grid grid-3" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {showcaseItems.map((item, i) => (
                            <motion.div key={item.title} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }} variants={fadeUp} custom={i}>
                                <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: 'var(--space-3)' }}>{item.type}</span>
                                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>{item.title}</h3>
                                <p className="text-dim text-small" style={{ lineHeight: 1.6, flex: 1, marginBottom: 'var(--space-4)' }}>{item.desc}</p>
                                <a href={item.link} className="btn btn-ghost text-small" style={{ padding: 0, justifyContent: 'flex-start' }}>
                                    View Project <ExternalLink size={12} />
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="section text-center" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container">
                    <h2 className="text-h1" style={{ marginBottom: 'var(--space-4)' }}>Submit Your Project</h2>
                    <p className="text-dim" style={{ maxWidth: 400, margin: '0 auto var(--space-6)' }}>Using MediSync? We'd love to feature your work.</p>
                    <a href="https://github.com/medisync-ai/medisync/discussions" target="_blank" rel="noopener" className="btn btn-primary btn-lg">
                        Submit via GitHub Discussions <ArrowRight size={16} />
                    </a>
                </div>
            </section>
        </div>
    )
}
