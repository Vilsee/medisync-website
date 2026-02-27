import DocsSidebar from '../../components/DocsSidebar'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const configItems = [
    { category: 'LLM Provider', key: 'LLM_PROVIDER', type: 'str', default: 'openai', desc: 'Active LLM provider (openai, anthropic, ollama, litellm)' },
    { category: 'LLM Provider', key: 'LLM_MODEL', type: 'str', default: 'gpt-4o', desc: 'Default model for all agents' },
    { category: 'LLM Provider', key: 'LLM_FALLBACK_MODEL', type: 'str', default: 'claude-3.5-haiku', desc: 'Fallback model when primary exceeds latency SLA' },
    { category: 'LLM Provider', key: 'LLM_FALLBACK_LATENCY_MS', type: 'int', default: '4000', desc: 'Latency threshold to trigger fallback (ms)' },
    { category: 'LLM Provider', key: 'OPENAI_API_KEY', type: 'str', default: '', desc: 'OpenAI API key' },
    { category: 'LLM Provider', key: 'ANTHROPIC_API_KEY', type: 'str', default: '', desc: 'Anthropic API key' },
    { category: 'Confidence', key: 'CONFIDENCE_THRESHOLD', type: 'float', default: '0.7', desc: 'Minimum confidence score — below triggers human review flag' },
    { category: 'Confidence', key: 'CONFIDENCE_LOW_FLAG', type: 'bool', default: 'true', desc: 'Add low_confidence warning when below threshold' },
    { category: 'Token Budget', key: 'MAX_TOKENS_PER_AGENT', type: 'int', default: '8000', desc: 'Maximum token context window per sub-agent call' },
    { category: 'Token Budget', key: 'MAX_OUTPUT_TOKENS', type: 'int', default: '2000', desc: 'Maximum output tokens per agent response' },
    { category: 'Token Budget', key: 'DYNAMIC_BUDGET', type: 'bool', default: 'true', desc: 'Adjust token budget based on encounter complexity' },
    { category: 'RAG', key: 'RAG_ENABLED', type: 'bool', default: 'true', desc: 'Enable RAG-enhanced context for Scribe agent' },
    { category: 'RAG', key: 'RAG_TOP_K', type: 'int', default: '5', desc: 'Number of similar historical notes to retrieve' },
    { category: 'RAG', key: 'RAG_SIMILARITY_THRESHOLD', type: 'float', default: '0.75', desc: 'Minimum similarity score for RAG results' },
    { category: 'Audit Logging', key: 'AUDIT_ENABLED', type: 'bool', default: 'true', desc: 'Enable append-only audit logging' },
    { category: 'Audit Logging', key: 'AUDIT_HASH_ALGORITHM', type: 'str', default: 'sha256', desc: 'Hashing algorithm for input/output audit' },
    { category: 'Audit Logging', key: 'AUDIT_LOG_CONTENT', type: 'bool', default: 'false', desc: 'Log full FHIR bundle content (disable for PHI safety)' },
    { category: 'Rate Limiting', key: 'RATE_LIMIT_ENABLED', type: 'bool', default: 'true', desc: 'Enable API rate limiting' },
    { category: 'Rate Limiting', key: 'RATE_LIMIT_RPM', type: 'int', default: '60', desc: 'Requests per minute per API key' },
    { category: 'Streaming', key: 'STREAMING_ENABLED', type: 'bool', default: 'true', desc: 'Enable SSE streaming for Scribe agent' },
    { category: 'Streaming', key: 'STREAM_BUFFER_SIZE', type: 'int', default: '10', desc: 'Token buffer size before flushing SSE event' },
    { category: 'Database', key: 'DATABASE_URL', type: 'str', default: 'postgresql://...', desc: 'PostgreSQL connection string' },
    { category: 'Database', key: 'PGVECTOR_DIMS', type: 'int', default: '3072', desc: 'Embedding dimensions for pgvector' },
]

export default function ConfigReference() {
    const [search, setSearch] = useState('')
    const filtered = search ? configItems.filter(c => c.key.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase())) : configItems
    const categories = [...new Set(filtered.map(c => c.category))]

    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <div className="docs-layout">
                <DocsSidebar />
                <div>
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp}>
                            <h1 className="text-h1" style={{ marginBottom: 'var(--space-3)' }}>Configuration Reference</h1>
                            <p className="text-dim" style={{ marginBottom: 'var(--space-6)' }}>Every configuration option documented. Set via environment variables or config file.</p>
                        </motion.div>

                        <motion.div className="search-box" style={{ marginBottom: 'var(--space-8)' }} variants={fadeUp} custom={1}>
                            <Search size={16} className="search-icon" />
                            <input className="input" placeholder="Search configuration..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 'var(--space-10)' }} />
                        </motion.div>

                        {categories.map((cat, ci) => (
                            <motion.div key={cat} className="glass-card" style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-6)' }} variants={fadeUp} custom={ci + 2}>
                                <h3 style={{ marginBottom: 'var(--space-4)' }}>{cat}</h3>
                                <div className="table-wrapper">
                                    <table className="table">
                                        <thead><tr><th>Key</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                                        <tbody>
                                            {filtered.filter(c => c.category === cat).map(c => (
                                                <tr key={c.key}>
                                                    <td><code className="code-inline" style={{ fontSize: 'var(--text-xs)' }}>{c.key}</code></td>
                                                    <td className="text-dim text-small">{c.type}</td>
                                                    <td><code className="code-inline" style={{ fontSize: 'var(--text-xs)' }}>{c.default || '—'}</code></td>
                                                    <td className="text-dim text-small">{c.desc}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
