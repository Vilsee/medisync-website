import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, GraduationCap, Globe2, FlaskConical, UserCircle } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const useCases = [
    {
        icon: Building2, title: 'Small EHR Startups', color: 'var(--brand-electric)',
        persona: 'Aditya Sharma, 28 — Software Engineer',
        narrative: 'Your startup is building an EHR module and needs AI-powered clinical documentation. Commercial solutions cost $100+/physician/month and offer no SDK. MediSync lets you pip install and ship AI features in one sprint — with full TypeScript types, clear docs, and SOC-2 audit trail support.',
        benefits: ['Embed AI docs features in one sprint', 'Zero licensing cost', 'Well-documented SDK with type stubs', 'FHIR abstraction layer included'],
    },
    {
        icon: GraduationCap, title: 'Academic Medical Centres', color: 'var(--accent-violet)',
        persona: 'Dr. Sarah Chen, 42 — CMIO',
        narrative: 'Your health system needs to reduce physician documentation time by 30% — but commercial tools can\'t be customised to your specific workflows or payer mix. MediSync gives you explainable AI with confidence scores, evidence trails, and the ability to customise coding suggestions.',
        benefits: ['Reduce documentation burden 30%', 'Confidence scores for compliance', 'Customisable to specific payer mix', 'Bypasses 18-month procurement'],
    },
    {
        icon: Globe2, title: 'International Health Systems', color: 'var(--status-success)',
        persona: 'International CMIO / Health Informaticist',
        narrative: 'Proprietary US-based clinical AI tools don\'t support your local workflows, language, or regulatory environment. MediSync is MIT licensed, self-hostable, and designed for customisation. Deploy on your own infrastructure with full data sovereignty.',
        benefits: ['Full data sovereignty', 'Self-hosted, air-gapped deployments', 'Customisable for local workflows', 'Multi-language support (v1.1)'],
    },
    {
        icon: FlaskConical, title: 'Research Labs', color: 'var(--status-warning)',
        persona: 'Marcus Webb, 31 — ML Engineer',
        narrative: 'You need a standardised baseline for clinical agent evaluation — but every project re-implements the same FHIR parsing boilerplate. MediSync provides a benchmarked framework you can extend with your own models, run ablation studies against, and publish results with.',
        benefits: ['Standardised evaluation framework', 'Swap in fine-tuned models easily', 'MIMIC-IV benchmarking suite', 'Contribute new agents back'],
    },
]

export default function UseCases() {
    return (
        <div>
            <section className="section-lg" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
                <div className="container text-center">
                    <motion.span className="badge" initial="hidden" animate="visible" variants={fadeUp}>Use Cases</motion.span>
                    <motion.h1 className="text-display" style={{ margin: 'var(--space-4) auto', maxWidth: 800 }} initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        Built for <span className="text-gradient">Every Scale</span>
                    </motion.h1>
                    <motion.p className="text-dim" style={{ maxWidth: 600, margin: '0 auto' }} initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        From one-person health-tech startups to international health systems — MediSync adapts to your workflow.
                    </motion.p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <motion.div className="grid grid-2" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {useCases.map((uc, i) => (
                            <motion.div key={uc.title} className="glass-card" style={{ padding: 'var(--space-8)' }} variants={fadeUp} custom={i}>
                                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: `${uc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                                    <uc.icon size={24} style={{ color: uc.color }} />
                                </div>
                                <h3 style={{ marginBottom: 'var(--space-2)' }}>{uc.title}</h3>
                                <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-4)' }}>
                                    <UserCircle size={14} className="text-slate" />
                                    <span className="text-caption">{uc.persona}</span>
                                </div>
                                <p className="text-dim text-small" style={{ lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>{uc.narrative}</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                                    {uc.benefits.map(b => (
                                        <li key={b} className="flex items-center gap-2 text-small text-dim">
                                            <ArrowRight size={12} className="text-success" style={{ flexShrink: 0 }} />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/docs/quickstart" className="btn btn-ghost text-small" style={{ padding: 0 }}>
                                    See how → <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="section text-center">
                <div className="container">
                    <h2 className="text-h1" style={{ marginBottom: 'var(--space-4)' }}>Don't see your use case?</h2>
                    <p className="text-dim" style={{ marginBottom: 'var(--space-8)' }}>Open a GitHub Discussion — we'd love to hear how you're using MediSync.</p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/community/forum" className="btn btn-primary btn-lg">Join Discussion</Link>
                        <Link to="/docs" className="btn btn-secondary btn-lg">Read Docs</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
