import { motion } from 'framer-motion'
import { Github, Shield, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

export default function SignUp() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--nav-height)' }}>
            <div className="container" style={{ maxWidth: 480 }}>
                <motion.div className="glass-card" style={{ padding: 'var(--space-10)', border: '1px solid rgba(37,99,235,0.2)' }} initial="hidden" animate="visible" variants={fadeUp}>
                    <div className="text-center" style={{ marginBottom: 'var(--space-8)' }}>
                        <div className="avatar avatar-lg mx-auto" style={{ marginBottom: 'var(--space-4)' }}>
                            <Shield size={28} />
                        </div>
                        <h1 style={{ marginBottom: 'var(--space-2)' }}>Developer Account</h1>
                        <p className="text-dim text-small">Sign in with GitHub to get a personal API key and higher rate limits.</p>
                    </div>

                    <button className="btn btn-secondary btn-lg w-full" style={{ justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                        <Github size={20} />
                        Continue with GitHub
                    </button>

                    <p className="text-caption text-center" style={{ marginBottom: 'var(--space-6)' }}>
                        No passwords — GitHub OAuth only. We only request public profile access.
                    </p>

                    <div className="divider" style={{ marginBottom: 'var(--space-6)' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        <h4 style={{ fontSize: 'var(--text-sm)' }}>What you get:</h4>
                        {[
                            'Personal API key for the hosted demo environment',
                            'Higher rate limits (100 runs/hour vs. 10 anonymous)',
                            'Usage dashboard with token tracking',
                            'Early access to new features',
                        ].map(item => (
                            <div key={item} className="flex items-center gap-2 text-small text-dim">
                                <ArrowRight size={12} className="text-success" style={{ flexShrink: 0 }} />
                                {item}
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 'var(--space-8)' }}>
                        <span className="badge" style={{ marginBottom: 'var(--space-2)' }}>v1.1 Feature</span>
                        <p className="text-caption">Developer accounts are a v1.1 feature. For now, use the anonymous playground or self-host the SDK.</p>
                    </div>

                    <div className="text-center" style={{ marginTop: 'var(--space-6)' }}>
                        <Link to="/playground" className="text-small text-electric">Skip — use anonymous playground →</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
