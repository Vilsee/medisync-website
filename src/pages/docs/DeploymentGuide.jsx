import DocsSidebar from '../../components/DocsSidebar'
import { motion } from 'framer-motion'
import { Laptop, Cloud, Server, Copy } from 'lucide-react'
import { useState } from 'react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const tracks = [
    {
        id: 'local', icon: Laptop, title: 'Local (Docker Compose)', desc: 'Best for development and testing. One command, all services.',
        steps: [
            'git clone https://github.com/medisync-ai/medisync.git',
            'cd medisync',
            'cp .env.example .env  # Configure LLM keys',
            'docker compose up -d',
            '# API available at http://localhost:8080',
            '# Demo UI at http://localhost:3000',
        ],
        envVars: [
            { key: 'OPENAI_API_KEY', desc: 'OpenAI API key (or use Ollama)', default: '' },
            { key: 'DATABASE_URL', desc: 'PostgreSQL connection string', default: 'postgresql://medisync:medisync@postgres:5432/medisync' },
            { key: 'LLM_PROVIDER', desc: 'Default LLM provider', default: 'openai' },
            { key: 'LLM_MODEL', desc: 'Default model', default: 'gpt-4o' },
        ]
    },
    {
        id: 'cloud', icon: Cloud, title: 'Cloud (Kubernetes)', desc: 'Production deployment with auto-scaling. Tested on AWS EKS, GCP GKE, Azure AKS.',
        steps: [
            'helm repo add medisync https://charts.medisync.dev',
            'helm repo update',
            'helm install medisync medisync/medisync \\',
            '  --set llm.provider=openai \\',
            '  --set llm.apiKey=$OPENAI_API_KEY \\',
            '  --set postgres.enabled=true',
            '# Or use Terraform modules:',
            'cd terraform/aws',
            'terraform init && terraform apply',
        ],
        envVars: [
            { key: 'REPLICAS', desc: 'API server replicas', default: '3' },
            { key: 'HPA_MIN', desc: 'HPA minimum pods', default: '2' },
            { key: 'HPA_MAX', desc: 'HPA maximum pods', default: '10' },
            { key: 'HPA_CPU_TARGET', desc: 'CPU target for autoscaling', default: '70' },
        ]
    },
    {
        id: 'library', icon: Server, title: 'Library Mode (Air-Gapped)', desc: 'No network services. Import as a Python library with SQLite + Ollama.',
        steps: [
            'pip install medisync-agents',
            'ollama pull llama3.1  # Download local model',
            '',
            '# In your Python code:',
            'from medisync import MediSyncClient',
            '',
            'client = MediSyncClient(',
            '    provider="ollama",',
            '    model="llama3.1",',
            '    database="sqlite:///medisync.db"',
            ')',
            '',
            'result = await client.run(fhir_bundle)',
        ],
        envVars: [
            { key: 'OLLAMA_HOST', desc: 'Ollama server URL', default: 'http://localhost:11434' },
            { key: 'SQLITE_PATH', desc: 'SQLite database path', default: './medisync.db' },
        ]
    }
]

export default function DeploymentGuide() {
    const [activeTrack, setActiveTrack] = useState('local')
    const track = tracks.find(t => t.id === activeTrack)

    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <div className="docs-layout">
                <DocsSidebar />
                <div>
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp}>
                            <h1 className="text-h1" style={{ marginBottom: 'var(--space-3)' }}>Deployment Guide</h1>
                            <p className="text-dim" style={{ marginBottom: 'var(--space-6)' }}>Three deployment tracks: Local Docker, Cloud Kubernetes, and Library Mode.</p>
                        </motion.div>

                        <motion.div className="tabs" style={{ marginBottom: 'var(--space-8)' }} variants={fadeUp} custom={1}>
                            {tracks.map(t => (
                                <button key={t.id} className={`tab flex items-center gap-2 ${activeTrack === t.id ? 'active' : ''}`} onClick={() => setActiveTrack(t.id)}>
                                    <t.icon size={14} /> {t.title.split('(')[0].trim()}
                                </button>
                            ))}
                        </motion.div>

                        {track && (
                            <motion.div key={track.id} initial="hidden" animate="visible">
                                <motion.div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }} variants={fadeUp}>
                                    <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-3)' }}>
                                        <track.icon size={24} className="text-electric" />
                                        <div>
                                            <h2>{track.title}</h2>
                                            <p className="text-dim text-small">{track.desc}</p>
                                        </div>
                                    </div>
                                    <div style={{ position: 'relative', marginTop: 'var(--space-4)' }}>
                                        <div className="code-block-header">
                                            <span>terminal</span>
                                            <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText(track.steps.join('\n'))}>
                                                <Copy size={12} />
                                            </button>
                                        </div>
                                        <pre className="code-block-body">{track.steps.join('\n')}</pre>
                                    </div>
                                </motion.div>

                                <motion.div className="glass-card" style={{ padding: 'var(--space-6)' }} variants={fadeUp} custom={1}>
                                    <h3 style={{ marginBottom: 'var(--space-4)' }}>Environment Variables</h3>
                                    <div className="table-wrapper">
                                        <table className="table">
                                            <thead><tr><th>Variable</th><th>Description</th><th>Default</th></tr></thead>
                                            <tbody>
                                                {track.envVars.map(v => (
                                                    <tr key={v.key}>
                                                        <td><code className="code-inline" style={{ fontSize: 'var(--text-xs)' }}>{v.key}</code></td>
                                                        <td className="text-dim text-small">{v.desc}</td>
                                                        <td><code className="code-inline" style={{ fontSize: 'var(--text-xs)' }}>{v.default || '—'}</code></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
