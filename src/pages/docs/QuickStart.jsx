import DocsSidebar from '../../components/DocsSidebar'
import { motion } from 'framer-motion'
import { CheckCircle2, Copy, Terminal, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }) }

const steps = [
    { title: 'Install MediSync', code: 'pip install medisync-agents', desc: 'Install the SDK from PyPI. Requires Python 3.11+.' },
    { title: 'Configure your LLM', code: 'export OPENAI_API_KEY="sk-your-key"\n# Or for local: ollama pull llama3.1', desc: 'Set your LLM API key, or use Ollama for free local inference.' },
    { title: 'Run the demo', code: 'medisync demo', desc: 'Generates a Synthea patient, runs the full 3-agent pipeline, and displays results.' },
    { title: 'Call the API', code: 'curl -X POST http://localhost:8080/v1/run \\\n  -H "Authorization: Bearer demo-key" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"fhir_bundle": {...}, "config": {"agents": ["scribe","drug_interactions","coding"]}}\'', desc: 'Submit a FHIR bundle to the REST API and get back a unified AgentResponse.' },
    { title: 'Use the SDK', code: 'from medisync import MediSyncClient\n\nclient = MediSyncClient()\nresult = await client.run(fhir_bundle)\n\nprint(result.scribe.soap_note)\nprint(result.drug_interactions)\nprint(result.coding.icd10)', desc: 'Import the SDK, create a client, and run the pipeline programmatically.' },
]

const troubleshooting = [
    { q: 'pip install fails with "Python version not supported"', a: 'MediSync requires Python 3.11+. Check your version with python --version. Use pyenv or conda to install a compatible version.' },
    { q: 'Connection refused on localhost:8080', a: 'The API server may not be running. Start it with: medisync serve or docker compose up. Check that port 8080 is not in use.' },
    { q: 'LLM API key not found', a: 'Ensure your API key is set as an environment variable (OPENAI_API_KEY or ANTHROPIC_API_KEY). For Ollama, ensure the Ollama service is running on localhost:11434.' },
    { q: 'Timeout on first run', a: 'The first run may take longer as models are loaded. Subsequent runs will be faster. For Ollama, ensure the model is fully downloaded.' },
]

export default function QuickStart() {
    const [openFaq, setOpenFaq] = useState(null)

    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <div className="docs-layout">
                <DocsSidebar />
                <div>
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp}>
                            <span className="badge badge-success" style={{ marginBottom: 'var(--space-3)' }}><Terminal size={10} /> Quick Start</span>
                            <h1 className="text-h1" style={{ marginBottom: 'var(--space-3)' }}>Get Started in 60 Minutes</h1>
                            <p className="text-dim" style={{ maxWidth: 600, lineHeight: 1.7, marginBottom: 'var(--space-10)' }}>
                                Follow these five steps to go from zero to your first AI-generated SOAP note.
                            </p>
                        </motion.div>

                        {/* Steps */}
                        {steps.map((step, i) => (
                            <motion.div key={step.title} className="glass-card" style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-6)' }} variants={fadeUp} custom={i + 1}>
                                <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-3)' }}>
                                    <div className="step-number" style={{ width: 32, height: 32, fontSize: 'var(--text-xs)' }}>{i + 1}</div>
                                    <h3 style={{ fontSize: 'var(--text-lg)' }}>{step.title}</h3>
                                </div>
                                <p className="text-dim text-small" style={{ marginBottom: 'var(--space-3)', lineHeight: 1.6 }}>{step.desc}</p>
                                <div style={{ position: 'relative' }}>
                                    <div className="code-block-header">
                                        <span>terminal</span>
                                        <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText(step.code)}>
                                            <Copy size={12} />
                                        </button>
                                    </div>
                                    <pre className="code-block-body">
                                        <code>{step.code}</code>
                                    </pre>
                                </div>
                            </motion.div>
                        ))}

                        {/* Expected Output */}
                        <motion.div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-10)' }} variants={fadeUp} custom={7}>
                            <h3 style={{ marginBottom: 'var(--space-3)' }}>Expected Output</h3>
                            <div className="code-block" style={{ fontSize: 'var(--text-xs)' }}>
                                {`{
  "trace_id": "ms_01J2X...",
  "status": "completed",
  "latency_ms": 3842,
  "scribe": {
    "soap_note": {
      "subjective": "Patient presents with...",
      "objective": "Vitals: BP 128/82...",
      "assessment": "New-onset Type 2 DM...",
      "plan": "Start metformin 500mg..."
    },
    "confidence": 0.89
  },
  "drug_interactions": [...],
  "coding": {
    "icd10": [{"code": "E11.9", "confidence": 0.94}]
  }
}`}
                            </div>
                        </motion.div>

                        {/* Troubleshooting */}
                        <motion.div variants={fadeUp} custom={8}>
                            <h2 style={{ marginBottom: 'var(--space-4)' }}>Troubleshooting</h2>
                            {troubleshooting.map((item, i) => (
                                <div key={i} className="accordion-item">
                                    <button className="accordion-trigger" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                        {item.q}
                                        <ChevronDown size={14} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                                    </button>
                                    {openFaq === i && <div className="accordion-content">{item.a}</div>}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
