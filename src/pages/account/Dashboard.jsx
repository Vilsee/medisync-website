import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Key, BarChart3, Clock, Zap, Copy, Eye, EyeOff, Trash2, Plus, ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const usageData = [
    { date: 'Today', calls: 12, tokens: 48200, latency: '3.4s' },
    { date: 'Yesterday', calls: 28, tokens: 112800, latency: '3.1s' },
    { date: 'This Week', calls: 87, tokens: 348400, latency: '3.2s' },
    { date: 'This Month', calls: 234, tokens: 936000, latency: '3.3s' },
]

const agentBreakdown = [
    { name: 'Clinical Scribe', calls: 234, percentage: 100, color: 'var(--brand-electric)' },
    { name: 'Drug Interaction', calls: 198, percentage: 85, color: 'var(--status-warning)' },
    { name: 'Medical Coding', calls: 212, percentage: 91, color: 'var(--accent-violet)' },
]

export default function Dashboard() {
    const [showKey, setShowKey] = useState(false)

    return (
        <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-6))' }}>
            <div className="container-lg">
                <motion.div initial="hidden" animate="visible">
                    <motion.div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-8)' }} variants={fadeUp}>
                        <div>
                            <h1 className="text-h1" style={{ marginBottom: 'var(--space-1)' }}>Dashboard</h1>
                            <p className="text-dim text-small">Welcome back, developer. Here's your usage overview.</p>
                        </div>
                        <a href="https://github.com/medisync-ai/medisync" target="_blank" rel="noopener" className="btn btn-secondary btn-sm"><Github size={14} /> View Repo</a>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div className="grid grid-4" style={{ marginBottom: 'var(--space-8)' }} variants={fadeUp} custom={1}>
                        {[
                            { icon: Zap, label: 'API Calls (Month)', value: '234', color: 'var(--brand-electric)' },
                            { icon: BarChart3, label: 'Tokens Used', value: '936K', color: 'var(--accent-violet)' },
                            { icon: Clock, label: 'Avg Latency', value: '3.3s', color: 'var(--status-success)' },
                            { icon: Key, label: 'Active Keys', value: '2', color: 'var(--status-warning)' },
                        ].map((stat, i) => (
                            <div key={stat.label} className="glass-card" style={{ padding: 'var(--space-5)' }}>
                                <stat.icon size={20} style={{ color: stat.color, marginBottom: 'var(--space-2)' }} />
                                <div className="stat-value" style={{ fontSize: 'var(--text-2xl)' }}>{stat.value}</div>
                                <div className="text-caption">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                        {/* Usage Table */}
                        <motion.div className="glass-card" style={{ padding: 'var(--space-6)' }} variants={fadeUp} custom={2}>
                            <h3 style={{ marginBottom: 'var(--space-4)' }}>Usage Summary</h3>
                            <div className="table-wrapper">
                                <table className="table">
                                    <thead><tr><th>Period</th><th>Calls</th><th>Tokens</th><th>Avg Latency</th></tr></thead>
                                    <tbody>
                                        {usageData.map(row => (
                                            <tr key={row.date}>
                                                <td style={{ color: 'white', fontWeight: 500 }}>{row.date}</td>
                                                <td className="text-dim">{row.calls}</td>
                                                <td className="text-dim">{row.tokens.toLocaleString()}</td>
                                                <td className="text-dim">{row.latency}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Agent Breakdown */}
                        <motion.div className="glass-card" style={{ padding: 'var(--space-6)' }} variants={fadeUp} custom={3}>
                            <h3 style={{ marginBottom: 'var(--space-4)' }}>Agent Breakdown</h3>
                            {agentBreakdown.map(agent => (
                                <div key={agent.name} style={{ marginBottom: 'var(--space-4)' }}>
                                    <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-1)' }}>
                                        <span className="text-small text-dim">{agent.name}</span>
                                        <span className="text-small text-white" style={{ fontWeight: 600 }}>{agent.calls} calls</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${agent.percentage}%`, background: agent.color }} />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* API Keys */}
                    <motion.div className="glass-card" style={{ padding: 'var(--space-6)' }} variants={fadeUp} custom={4}>
                        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-4)' }}>
                            <h3>API Keys</h3>
                            <button className="btn btn-primary btn-sm"><Plus size={14} /> Generate New Key</button>
                        </div>
                        <div className="table-wrapper">
                            <table className="table">
                                <thead><tr><th>Name</th><th>Key</th><th>Scope</th><th>Created</th><th>Actions</th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td style={{ color: 'white', fontWeight: 500 }}>Development</td>
                                        <td>
                                            <code className="code-inline" style={{ fontSize: 'var(--text-xs)' }}>
                                                {showKey ? 'ms_dev_a1b2c3d4e5f6g7h8' : 'ms_dev_•••••••••••••'}
                                            </code>
                                            <button className="btn btn-ghost btn-sm" onClick={() => setShowKey(!showKey)} style={{ marginLeft: 4 }}>
                                                {showKey ? <EyeOff size={12} /> : <Eye size={12} />}
                                            </button>
                                            <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText('ms_dev_a1b2c3d4e5f6g7h8')}>
                                                <Copy size={12} />
                                            </button>
                                        </td>
                                        <td><span className="badge" style={{ fontSize: 10 }}>read + write</span></td>
                                        <td className="text-dim text-small">2025-06-01</td>
                                        <td><button className="btn btn-ghost btn-sm text-critical"><Trash2 size={12} /></button></td>
                                    </tr>
                                    <tr>
                                        <td style={{ color: 'white', fontWeight: 500 }}>Production</td>
                                        <td><code className="code-inline" style={{ fontSize: 'var(--text-xs)' }}>ms_prod_•••••••••••••</code></td>
                                        <td><span className="badge badge-success" style={{ fontSize: 10 }}>admin</span></td>
                                        <td className="text-dim text-small">2025-06-10</td>
                                        <td><button className="btn btn-ghost btn-sm text-critical"><Trash2 size={12} /></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    <motion.div className="text-center" style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-8)' }} variants={fadeUp} custom={5}>
                        <span className="badge" style={{ marginBottom: 'var(--space-2)' }}>v1.1 Feature</span>
                        <p className="text-caption">Dashboard is a preview of the v1.1 developer account feature.</p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
