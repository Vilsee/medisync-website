import DocsSidebar from '../../components/DocsSidebar'
import { motion } from 'framer-motion'
import { PenTool, FlaskConical, Code2, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const agentGuides = [
    {
        id: 'scribe', icon: PenTool, color: 'scribe', title: 'Clinical Scribe Agent', tagline: 'Automated SOAP note drafting',
        whatItDoes: 'Generates structured SOAP (Subjective, Objective, Assessment, Plan) note drafts from encounter transcripts and FHIR Observation resources. Uses RAG-enhanced historical patient context for personalised drafts.',
        inputs: ['FHIR Patient resource', 'FHIR Encounter resource', 'FHIR Observation resources (vitals, labs)', 'Optional: encounter transcript text', 'Optional: historical DocumentReference resources'],
        outputSchema: '{\n  "soap_note": {\n    "subjective": "string",\n    "objective": "string",\n    "assessment": "string",\n    "plan": "string"\n  },\n  "confidence": 0.89,\n  "evidence": ["source1", "source2"],\n  "streaming_supported": true\n}',
        confidence: 'Calibrated against MIMIC-III physician notes. Score of 0.8+ indicates high clinical accuracy. Scores below 0.6 trigger human review.',
        customisation: ['Swap LLM provider (GPT-4o, Claude, Llama)', 'Adjust prompt templates for specific specialties', 'Configure RAG context window size', 'Set minimum confidence threshold'],
        limitations: ['Not a substitute for physician review', 'Best performance on common encounter types', 'Multi-language support in v1.1'],
    },
    {
        id: 'drug', icon: FlaskConical, color: 'drug', title: 'Drug Interaction Analyst', tagline: 'Medication safety cross-referencing',
        whatItDoes: 'Cross-references all active medications (from MedicationRequest FHIR resources) against the RxNorm interaction graph. Returns severity-classified interaction pairs with evidence citations from DrugBank.',
        inputs: ['FHIR MedicationRequest resources (active)', 'FHIR Condition resources (for context)', 'Optional: patient allergies (AllergyIntolerance)'],
        outputSchema: '{\n  "interactions": [\n    {\n      "pair": ["metformin", "lisinopril"],\n      "severity": "moderate",\n      "description": "Potential hypoglycemia risk",\n      "evidence": "DrugBank DB00331",\n      "clinical_significance": "Monitor blood glucose"\n    }\n  ],\n  "confidence": 0.92\n}',
        confidence: '94%+ recall on DrugBank gold standard validation set. Severity classification trained on FDA adverse event reports.',
        customisation: ['Configure severity threshold (moderate/severe/contraindicated)', 'Add custom drug interaction rules', 'Use local RxNorm SQLite cache for offline', 'Adjust evidence source priority'],
        limitations: ['Covers RxNorm-catalogued drugs only', 'Supplement/herbal interactions limited', 'Requires structured medication data'],
    },
    {
        id: 'coding', icon: Code2, color: 'coding', title: 'Medical Coding Advisor', tagline: 'ICD-10 and CPT code suggestions',
        whatItDoes: 'Suggests ICD-10-CM diagnosis codes and CPT procedure codes from encounter note context. Provides confidence scores, primary vs. secondary code ranking, and payer-specific billing notes.',
        inputs: ['Scribe agent output (SOAP note)', 'FHIR Encounter resource', 'FHIR Condition resources', 'Optional: payer configuration'],
        outputSchema: '{\n  "icd10": [\n    {\n      "code": "E11.9",\n      "description": "Type 2 Diabetes Mellitus",\n      "confidence": 0.94,\n      "rank": "primary",\n      "payer_notes": "Requires HbA1c documentation"\n    }\n  ],\n  "cpt": [\n    {\n      "code": "99213",\n      "description": "Office/outpatient visit, est. patient",\n      "confidence": 0.87\n    }\n  ]\n}',
        confidence: '88%+ top-3 accuracy on MIMIC-IV discharge summaries. Calibrated against professional coder reviews.',
        customisation: ['Configure for specific payer mix', 'Adjust code ranking algorithm', 'Set minimum confidence for suggestions', 'Add institution-specific coding rules'],
        limitations: ['Suggestions only — not a replacement for certified coders', 'Best accuracy on US ICD-10-CM', 'CPT suggestions are advisory'],
    },
]

export default function AgentGuides() {
    const [activeAgent, setActiveAgent] = useState('scribe')
    const agent = agentGuides.find(a => a.id === activeAgent)

    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <div className="docs-layout">
                <DocsSidebar />
                <div>
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp}>
                            <h1 className="text-h1" style={{ marginBottom: 'var(--space-3)' }}>Agent Guides</h1>
                            <p className="text-dim" style={{ marginBottom: 'var(--space-6)' }}>Deep-dive into each AI agent's capabilities, inputs, outputs, and customisation options.</p>
                        </motion.div>

                        {/* Agent Tabs */}
                        <motion.div className="tabs" style={{ marginBottom: 'var(--space-8)' }} variants={fadeUp} custom={1}>
                            {agentGuides.map(a => (
                                <button key={a.id} className={`tab flex items-center gap-2 ${activeAgent === a.id ? 'active' : ''}`} onClick={() => setActiveAgent(a.id)}>
                                    <a.icon size={14} /> {a.title.split(' ').slice(0, 2).join(' ')}
                                </button>
                            ))}
                        </motion.div>

                        {agent && (
                            <motion.div key={agent.id} initial="hidden" animate="visible">
                                <motion.div className="glass-card" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-6)' }} variants={fadeUp}>
                                    <div className={`agent-icon agent-icon-${agent.color}`} style={{ marginBottom: 'var(--space-4)' }}>
                                        <agent.icon size={24} />
                                    </div>
                                    <h2 style={{ marginBottom: 'var(--space-2)' }}>{agent.title}</h2>
                                    <p className="text-dim text-small" style={{ marginBottom: 'var(--space-4)' }}>{agent.tagline}</p>
                                    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>What it does</h3>
                                    <p className="text-dim text-small" style={{ lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>{agent.whatItDoes}</p>

                                    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Input Requirements</h3>
                                    <ul style={{ listStyle: 'none', marginBottom: 'var(--space-6)' }}>
                                        {agent.inputs.map(inp => <li key={inp} className="flex items-center gap-2 text-small text-dim" style={{ marginBottom: 'var(--space-1)' }}><CheckCircle2 size={14} className="text-success" style={{ flexShrink: 0 }} />{inp}</li>)}
                                    </ul>

                                    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Output Schema</h3>
                                    <pre className="code-block" style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-6)' }}>{agent.outputSchema}</pre>

                                    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Confidence Scoring</h3>
                                    <p className="text-dim text-small" style={{ lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>{agent.confidence}</p>

                                    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Customisation Options</h3>
                                    <ul style={{ listStyle: 'none', marginBottom: 'var(--space-6)' }}>
                                        {agent.customisation.map(c => <li key={c} className="flex items-center gap-2 text-small text-dim" style={{ marginBottom: 'var(--space-1)' }}><CheckCircle2 size={14} className="text-electric" style={{ flexShrink: 0 }} />{c}</li>)}
                                    </ul>

                                    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Known Limitations</h3>
                                    <ul style={{ listStyle: 'none' }}>
                                        {agent.limitations.map(l => <li key={l} className="flex items-center gap-2 text-small text-dim" style={{ marginBottom: 'var(--space-1)' }}><AlertTriangle size={14} className="text-warning" style={{ flexShrink: 0 }} />{l}</li>)}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
