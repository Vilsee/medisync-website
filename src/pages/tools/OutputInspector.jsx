import { motion } from 'framer-motion'
import { useState } from 'react'
import { Upload, FileJson, Eye, Copy, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const sampleResponse = `{
  "trace_id": "ms_01J2XABC123",
  "status": "completed",
  "latency_ms": 4210,
  "scribe": {
    "soap_note": {
      "subjective": "Patient presents for routine follow-up of Type 2 Diabetes. Reports improved dietary adherence over past month. Denies episodes of hypoglycemia or hyperglycemia. Continues daily walking for 30 minutes. Occasional mild headaches, attributed to stress.",
      "objective": "Vitals: BP 130/84 mmHg, HR 72 bpm, Temp 98.6°F, SpO2 98%. Weight: 194 lbs (previously 198 lbs). HbA1c: 7.4% (previously 7.8%). Fasting glucose: 142 mg/dL. Foot exam: intact pedal pulses, no skin breakdown. Monofilament test: normal sensation.",
      "assessment": "1. Type 2 Diabetes Mellitus (E11.9) — improving glycemic control, HbA1c trending down 7.8% → 7.4%. 2. Essential Hypertension (I10) — borderline controlled on current regimen. 3. Obesity (E66.9) — positive weight trend, lost 4 lbs.",
      "plan": "1. Continue metformin 1000mg BID — well tolerated\\n2. Continue lisinopril 20mg daily for BP management\\n3. Reinforce dietary modifications — DASH diet counseling referral\\n4. Repeat HbA1c and metabolic panel in 3 months\\n5. Annual diabetic eye exam — referral placed\\n6. Follow-up in 3 months"
    },
    "confidence": 0.91,
    "evidence": ["MIMIC-III note patterns", "ADA 2025 Standards of Care"]
  },
  "drug_interactions": [
    {
      "pair": ["metformin", "lisinopril"],
      "severity": "moderate",
      "description": "Concurrent use may increase risk of hypoglycemia and lactic acidosis in patients with renal impairment.",
      "evidence": "DrugBank DB00331 / DB00722",
      "clinical_significance": "Monitor renal function and blood glucose. Generally safe with normal GFR."
    }
  ],
  "coding": {
    "icd10": [
      { "code": "E11.9", "description": "Type 2 diabetes mellitus without complications", "confidence": 0.94, "rank": "primary" },
      { "code": "I10", "description": "Essential (primary) hypertension", "confidence": 0.91, "rank": "secondary" },
      { "code": "E66.9", "description": "Obesity, unspecified", "confidence": 0.78, "rank": "secondary" }
    ],
    "cpt": [
      { "code": "99214", "description": "Office visit, established patient, moderate complexity", "confidence": 0.89 }
    ]
  },
  "audit_hash": "sha256:a1b2c3d4e5f6...",
  "warnings": []
}`

export default function OutputInspector() {
    const [input, setInput] = useState(sampleResponse)
    const [parsed, setParsed] = useState(null)
    const [error, setError] = useState(null)

    const inspect = () => {
        try {
            const data = JSON.parse(input)
            setParsed(data)
            setError(null)
        } catch (e) {
            setError('Invalid JSON: ' + e.message)
            setParsed(null)
        }
    }

    const severityColor = s => s === 'severe' || s === 'contraindicated' ? 'var(--status-critical)' : s === 'moderate' ? 'var(--status-warning)' : 'var(--status-success)'

    return (
        <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-6))' }}>
            <div className="container-lg">
                <motion.div initial="hidden" animate="visible">
                    <motion.div variants={fadeUp} style={{ marginBottom: 'var(--space-6)' }}>
                        <h1 className="text-h1" style={{ marginBottom: 'var(--space-1)' }}>Agent Output Inspector</h1>
                        <p className="text-dim text-small">Paste a MediSync AgentResponse JSON and view it in a human-readable format.</p>
                    </motion.div>

                    {/* Input Section */}
                    <motion.div className="glass-surface" style={{ marginBottom: 'var(--space-6)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }} variants={fadeUp} custom={1}>
                        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="text-small text-white" style={{ fontWeight: 600 }}><FileJson size={14} style={{ display: 'inline', verticalAlign: -2, marginRight: 6 }} />Paste AgentResponse JSON</span>
                            <button onClick={inspect} className="btn btn-primary btn-sm"><Eye size={14} /> Inspect</button>
                        </div>
                        <textarea value={input} onChange={e => setInput(e.target.value)} style={{ width: '100%', minHeight: 200, padding: 'var(--space-4)', background: 'rgba(0,0,0,0.3)', border: 'none', color: 'var(--brand-sky)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', resize: 'vertical', outline: 'none', lineHeight: 1.5 }} />
                    </motion.div>

                    {error && <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)', borderColor: 'rgba(225,29,72,0.3)' }}><span className="text-critical flex items-center gap-2"><AlertTriangle size={16} /> {error}</span></div>}

                    {/* Rendered Output */}
                    {parsed && (
                        <motion.div initial="hidden" animate="visible">
                            {/* Meta */}
                            <motion.div className="flex gap-4 flex-wrap" style={{ marginBottom: 'var(--space-6)' }} variants={fadeUp}>
                                <div className="glass-card" style={{ padding: 'var(--space-4)', flex: 1 }}>
                                    <span className="text-caption">Trace ID</span>
                                    <div className="text-white" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>{parsed.trace_id}</div>
                                </div>
                                <div className="glass-card" style={{ padding: 'var(--space-4)', flex: 1 }}>
                                    <span className="text-caption">Status</span>
                                    <div><span className={`badge ${parsed.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{parsed.status}</span></div>
                                </div>
                                <div className="glass-card" style={{ padding: 'var(--space-4)', flex: 1 }}>
                                    <span className="text-caption">Latency</span>
                                    <div className="flex items-center gap-2"><Clock size={14} className="text-electric" /><span className="text-white" style={{ fontWeight: 700 }}>{parsed.latency_ms}ms</span></div>
                                </div>
                            </motion.div>

                            {/* SOAP Note */}
                            {parsed.scribe && (
                                <motion.div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }} variants={fadeUp} custom={1}>
                                    <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-4)' }}>
                                        <h3>📝 SOAP Note</h3>
                                        <span className="badge badge-success">Confidence: {parsed.scribe.confidence}</span>
                                    </div>
                                    {parsed.scribe.soap_note && Object.entries(parsed.scribe.soap_note).map(([key, val]) => (
                                        <div key={key} style={{ marginBottom: 'var(--space-4)' }}>
                                            <span style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(37,99,235,0.1)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--brand-sky)', marginBottom: 6, textTransform: 'capitalize' }}>{key}</span>
                                            <p className="text-dim" style={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{val}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Drug Interactions */}
                            {parsed.drug_interactions?.length > 0 && (
                                <motion.div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }} variants={fadeUp} custom={2}>
                                    <h3 style={{ marginBottom: 'var(--space-4)' }}>💊 Drug Interactions</h3>
                                    {parsed.drug_interactions.map((di, i) => (
                                        <div key={i} className="glass-surface" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-3)', borderLeft: `3px solid ${severityColor(di.severity)}` }}>
                                            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-2)' }}>
                                                <span className={`badge ${di.severity === 'moderate' ? 'badge-warning' : di.severity === 'severe' ? 'badge-critical' : 'badge-success'}`}>{di.severity?.toUpperCase()}</span>
                                                <span className="text-white" style={{ fontWeight: 600 }}>{di.pair?.join(' ↔ ')}</span>
                                            </div>
                                            <p className="text-dim text-small" style={{ marginBottom: 'var(--space-1)' }}>{di.description}</p>
                                            {di.clinical_significance && <p className="text-small" style={{ color: 'var(--brand-sky)' }}>ℹ️ {di.clinical_significance}</p>}
                                            {di.evidence && <span className="text-caption">Evidence: {di.evidence}</span>}
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Coding */}
                            {parsed.coding && (
                                <motion.div className="glass-card" style={{ padding: 'var(--space-6)' }} variants={fadeUp} custom={3}>
                                    <h3 style={{ marginBottom: 'var(--space-4)' }}>🏥 Medical Codes</h3>
                                    {parsed.coding.icd10?.length > 0 && (
                                        <div style={{ marginBottom: 'var(--space-4)' }}>
                                            <span className="text-xs text-slate" style={{ fontWeight: 600, display: 'block', marginBottom: 'var(--space-2)' }}>ICD-10-CM</span>
                                            {parsed.coding.icd10.map(code => (
                                                <div key={code.code} className="flex justify-between items-center" style={{ padding: 'var(--space-2) 0', borderBottom: '1px solid var(--glass-border)' }}>
                                                    <div className="flex items-center gap-3">
                                                        <code className="code-inline" style={{ fontSize: 'var(--text-xs)' }}>{code.code}</code>
                                                        <span className="text-dim text-small">{code.description}</span>
                                                        {code.rank && <span className="badge" style={{ fontSize: 10 }}>{code.rank}</span>}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="progress-bar" style={{ width: 60 }}>
                                                            <div className="progress-fill progress-fill-success" style={{ width: `${(code.confidence || 0) * 100}%` }} />
                                                        </div>
                                                        <span className="text-small text-success" style={{ fontWeight: 600 }}>{((code.confidence || 0) * 100).toFixed(0)}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {parsed.coding.cpt?.length > 0 && (
                                        <div>
                                            <span className="text-xs text-slate" style={{ fontWeight: 600, display: 'block', marginBottom: 'var(--space-2)' }}>CPT</span>
                                            {parsed.coding.cpt.map(code => (
                                                <div key={code.code} className="flex justify-between items-center" style={{ padding: 'var(--space-2) 0' }}>
                                                    <div className="flex items-center gap-3">
                                                        <code className="code-inline" style={{ fontSize: 'var(--text-xs)' }}>{code.code}</code>
                                                        <span className="text-dim text-small">{code.description}</span>
                                                    </div>
                                                    <span className="text-small text-success" style={{ fontWeight: 600 }}>{((code.confidence || 0) * 100).toFixed(0)}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
