import { motion } from 'framer-motion'
import { useState } from 'react'
import { Play, Copy, Loader2, Settings, ChevronDown } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const demoBundles = {
    'Diabetes Management': '{\n  "resourceType": "Bundle",\n  "type": "collection",\n  "entry": [\n    {"resource": {"resourceType": "Patient", "id": "p1", "name": [{"given":["John"],"family":"Smith"}], "birthDate": "1965-03-15"}},\n    {"resource": {"resourceType": "Encounter", "id": "e1", "status": "in-progress", "reasonCode": [{"text": "Diabetes follow-up"}]}},\n    {"resource": {"resourceType": "Observation", "id": "o1", "code": {"text": "HbA1c"}, "valueQuantity": {"value": 7.8, "unit": "%"}}},\n    {"resource": {"resourceType": "MedicationRequest", "id": "m1", "status": "active", "medicationCodeableConcept": {"text": "Metformin 500mg"}}},\n    {"resource": {"resourceType": "Condition", "id": "c1", "code": {"text": "Type 2 Diabetes (E11.9)"}, "clinicalStatus": {"coding": [{"code": "active"}]}}}\n  ]\n}',
    'Post-Op Follow-Up': '{\n  "resourceType": "Bundle",\n  "type": "collection",\n  "entry": [\n    {"resource": {"resourceType": "Patient", "id": "p2", "name": [{"given":["Maria"],"family":"Garcia"}], "birthDate": "1978-11-22"}},\n    {"resource": {"resourceType": "Encounter", "id": "e2", "status": "in-progress", "reasonCode": [{"text": "Post-operative follow-up, knee replacement"}]}},\n    {"resource": {"resourceType": "Observation", "id": "o2", "code": {"text": "BP"}, "valueQuantity": {"value": 135, "unit": "mmHg"}}},\n    {"resource": {"resourceType": "MedicationRequest", "id": "m2", "status": "active", "medicationCodeableConcept": {"text": "Oxycodone 5mg"}}},\n    {"resource": {"resourceType": "MedicationRequest", "id": "m3", "status": "active", "medicationCodeableConcept": {"text": "Warfarin 5mg"}}}\n  ]\n}',
}

const mockResponse = {
    trace_id: 'ms_playground_demo',
    status: 'completed',
    latency_ms: 3842,
    scribe: {
        soap_note: { subjective: 'Patient presents for diabetes management follow-up. Reports improved adherence to metformin regimen. Denies hypoglycemic episodes. Notes mild fatigue and increased thirst.', objective: 'Vitals: BP 128/82, HR 76, Temp 98.4°F. HbA1c: 7.8% (previous: 8.2%). Fasting glucose: 186 mg/dL. BMI: 28.4. Foot exam: intact sensation, no lesions.', assessment: 'Type 2 Diabetes Mellitus (E11.9) with improving but suboptimal glycemic control. HbA1c trending down from 8.2% to 7.8%.', plan: '1. Continue metformin 500mg BID\n2. Add lifestyle modifications counseling\n3. Diabetes self-management education referral\n4. Follow-up HbA1c in 3 months\n5. Annual eye exam referral' },
        confidence: 0.89,
    },
    drug_interactions: [
        { pair: ['metformin', 'N/A'], severity: 'none', description: 'No significant interactions detected with current medications' }
    ],
    coding: {
        icd10: [
            { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications', confidence: 0.94 },
            { code: 'R53.83', description: 'Other fatigue', confidence: 0.72 },
            { code: 'R63.1', description: 'Polydipsia', confidence: 0.68 },
        ],
        cpt: [{ code: '99214', description: 'Office/outpatient visit, established patient, moderate complexity', confidence: 0.87 }],
    },
}

export default function Playground() {
    const [input, setInput] = useState(demoBundles['Diabetes Management'])
    const [agents, setAgents] = useState({ scribe: true, drug: true, coding: true })
    const [llm, setLlm] = useState('gpt-4o')
    const [running, setRunning] = useState(false)
    const [result, setResult] = useState(null)

    const run = () => {
        setRunning(true)
        setResult(null)
        setTimeout(() => {
            setRunning(false)
            setResult(mockResponse)
        }, 2500)
    }

    return (
        <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-6))' }}>
            <div className="container-lg">
                <motion.div initial="hidden" animate="visible">
                    <motion.div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-6)' }} variants={fadeUp}>
                        <div>
                            <h1 className="text-h1" style={{ marginBottom: 'var(--space-1)' }}>Live Playground</h1>
                            <p className="text-dim text-small">Paste a FHIR bundle, select agents, and see real-time output. Rate limited: 10 runs/hour.</p>
                        </div>
                    </motion.div>

                    <motion.div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', minHeight: 600 }} variants={fadeUp} custom={1}>
                        {/* Input Panel */}
                        <div className="glass-surface" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 'var(--radius-xl)' }}>
                            <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span className="text-small text-white" style={{ fontWeight: 600 }}>Input — FHIR R4 Bundle</span>
                                <div className="flex gap-2">
                                    {Object.keys(demoBundles).map(name => (
                                        <button key={name} className="btn btn-ghost btn-sm" style={{ fontSize: 'var(--text-xs)' }} onClick={() => setInput(demoBundles[name])}>{name}</button>
                                    ))}
                                </div>
                            </div>
                            <textarea value={input} onChange={e => setInput(e.target.value)} style={{ flex: 1, width: '100%', padding: 'var(--space-4)', background: 'rgba(0,0,0,0.3)', border: 'none', color: 'var(--brand-sky)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', resize: 'none', outline: 'none', lineHeight: 1.6 }} />
                            <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                <div className="flex gap-3">
                                    {['scribe', 'drug', 'coding'].map(a => (
                                        <label key={a} className="flex items-center gap-1 text-small text-dim" style={{ cursor: 'pointer' }}>
                                            <input type="checkbox" checked={agents[a]} onChange={() => setAgents(prev => ({ ...prev, [a]: !prev[a] }))} style={{ accentColor: 'var(--brand-electric)' }} />
                                            {a === 'scribe' ? 'Scribe' : a === 'drug' ? 'Drug' : 'Coding'}
                                        </label>
                                    ))}
                                </div>
                                <select value={llm} onChange={e => setLlm(e.target.value)} className="input" style={{ width: 'auto', padding: '4px 8px', fontSize: 'var(--text-xs)' }}>
                                    <option value="gpt-4o">GPT-4o</option>
                                    <option value="claude-3.5-sonnet">Claude 3.5 Sonnet</option>
                                    <option value="llama3.1">Llama 3.1 (Ollama)</option>
                                </select>
                                <button onClick={run} disabled={running} className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>
                                    {running ? <><Loader2 size={14} className="animate-spin" /> Running...</> : <><Play size={14} /> Run Pipeline</>}
                                </button>
                            </div>
                        </div>

                        {/* Output Panel */}
                        <div className="glass-surface" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 'var(--radius-xl)' }}>
                            <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="text-small text-white" style={{ fontWeight: 600 }}>Output — AgentResponse</span>
                                {result && (
                                    <div className="flex items-center gap-3">
                                        <span className="badge badge-success">{result.latency_ms}ms</span>
                                        <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText(JSON.stringify(result, null, 2))}><Copy size={12} /></button>
                                    </div>
                                )}
                            </div>
                            <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-4)' }}>
                                {running && (
                                    <div className="text-center" style={{ padding: 'var(--space-16)' }}>
                                        <Loader2 size={32} className="text-electric mx-auto animate-spin" style={{ marginBottom: 'var(--space-4)' }} />
                                        <p className="text-dim text-small">Running agents...</p>
                                        <div className="animate-shimmer" style={{ width: '60%', height: 8, borderRadius: 4, margin: 'var(--space-4) auto' }} />
                                    </div>
                                )}
                                {!running && !result && (
                                    <div className="text-center" style={{ padding: 'var(--space-16)', color: 'var(--neutral-slate)' }}>
                                        <Play size={32} style={{ margin: '0 auto var(--space-3)', opacity: 0.3 }} />
                                        <p className="text-small">Click "Run Pipeline" to see results</p>
                                    </div>
                                )}
                                {result && (
                                    <div>
                                        {/* SOAP Note */}
                                        <div style={{ marginBottom: 'var(--space-6)' }}>
                                            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-3)' }}>
                                                <h4>SOAP Note</h4>
                                                <span className="badge badge-success">Confidence: {result.scribe.confidence}</span>
                                            </div>
                                            {['subjective', 'objective', 'assessment', 'plan'].map(s => (
                                                <div key={s} style={{ marginBottom: 'var(--space-3)' }}>
                                                    <span style={{ display: 'inline-block', padding: '2px 8px', background: 'rgba(37,99,235,0.1)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--brand-sky)', marginBottom: 4, textTransform: 'capitalize' }}>{s}</span>
                                                    <p className="text-dim text-small" style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{result.scribe.soap_note[s]}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {/* ICD-10 Codes */}
                                        <div style={{ marginBottom: 'var(--space-6)' }}>
                                            <h4 style={{ marginBottom: 'var(--space-3)' }}>ICD-10 Codes</h4>
                                            {result.coding.icd10.map(code => (
                                                <div key={code.code} className="flex justify-between items-center" style={{ padding: 'var(--space-2) 0', borderBottom: '1px solid var(--glass-border)' }}>
                                                    <div>
                                                        <code className="code-inline" style={{ fontSize: 'var(--text-xs)' }}>{code.code}</code>
                                                        <span className="text-dim text-small" style={{ marginLeft: 'var(--space-2)' }}>{code.description}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="progress-bar" style={{ width: 80 }}>
                                                            <div className={`progress-fill ${code.confidence >= 0.8 ? 'progress-fill-success' : code.confidence >= 0.6 ? '' : 'progress-fill-warning'}`} style={{ width: `${code.confidence * 100}%` }} />
                                                        </div>
                                                        <span className="text-small" style={{ fontWeight: 600, color: code.confidence >= 0.8 ? 'var(--status-success)' : 'var(--neutral-dim)' }}>{(code.confidence * 100).toFixed(0)}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Drug Interactions */}
                                        <div>
                                            <h4 style={{ marginBottom: 'var(--space-3)' }}>Drug Interactions</h4>
                                            {result.drug_interactions.map((di, i) => (
                                                <div key={i} className={`badge ${di.severity === 'none' ? 'badge-success' : di.severity === 'moderate' ? 'badge-warning' : 'badge-critical'}`}>
                                                    {di.severity === 'none' ? '✓ No interactions detected' : `${di.pair.join(' ↔ ')} — ${di.severity}`}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
