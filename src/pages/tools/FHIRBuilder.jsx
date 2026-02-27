import { motion } from 'framer-motion'
import { useState } from 'react'
import { Plus, Trash2, Copy, Download, CheckCircle2 } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

export default function FHIRBuilder() {
    const [patient, setPatient] = useState({ given: 'John', family: 'Smith', dob: '1965-03-15', gender: 'male', mrn: 'MRN-001' })
    const [conditions, setConditions] = useState([{ text: 'Type 2 Diabetes Mellitus', code: 'E11.9', status: 'active' }])
    const [medications, setMedications] = useState([{ text: 'Metformin 500 MG', rxnorm: '860975', status: 'active' }])
    const [observations, setObservations] = useState([{ text: 'Blood Pressure', value: '128', unit: 'mmHg', loinc: '85354-9' }])
    const [encounter, setEncounter] = useState({ reason: 'Diabetes management follow-up', class: 'AMB' })
    const [copied, setCopied] = useState(false)

    const bundle = JSON.stringify({
        resourceType: 'Bundle', type: 'collection',
        entry: [
            { resource: { resourceType: 'Patient', id: 'patient-001', name: [{ given: [patient.given], family: patient.family }], birthDate: patient.dob, gender: patient.gender, identifier: [{ value: patient.mrn }] } },
            { resource: { resourceType: 'Encounter', id: 'encounter-001', status: 'in-progress', class: { code: encounter.class }, reasonCode: [{ text: encounter.reason }], subject: { reference: 'Patient/patient-001' } } },
            ...conditions.map((c, i) => ({ resource: { resourceType: 'Condition', id: `condition-${i}`, code: { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10-cm', code: c.code, display: c.text }] }, clinicalStatus: { coding: [{ code: c.status }] }, subject: { reference: 'Patient/patient-001' } } })),
            ...medications.map((m, i) => ({ resource: { resourceType: 'MedicationRequest', id: `med-${i}`, status: m.status, medicationCodeableConcept: { coding: [{ system: 'http://www.nlm.nih.gov/research/umls/rxnorm', code: m.rxnorm, display: m.text }] }, subject: { reference: 'Patient/patient-001' } } })),
            ...observations.map((o, i) => ({ resource: { resourceType: 'Observation', id: `obs-${i}`, code: { coding: [{ system: 'http://loinc.org', code: o.loinc, display: o.text }] }, valueQuantity: { value: parseFloat(o.value), unit: o.unit }, subject: { reference: 'Patient/patient-001' } } })),
        ]
    }, null, 2)

    const copyBundle = () => { navigator.clipboard?.writeText(bundle); setCopied(true); setTimeout(() => setCopied(false), 2000) }

    const Field = ({ label, value, onChange, placeholder, width }) => (
        <div style={{ flex: width || 1 }}>
            <label className="text-xs text-slate" style={{ display: 'block', marginBottom: 2, fontWeight: 500 }}>{label}</label>
            <input className="input" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ fontSize: 'var(--text-sm)' }} />
        </div>
    )

    return (
        <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-6))' }}>
            <div className="container-lg">
                <motion.div initial="hidden" animate="visible">
                    <motion.div variants={fadeUp} style={{ marginBottom: 'var(--space-6)' }}>
                        <h1 className="text-h1" style={{ marginBottom: 'var(--space-1)' }}>FHIR Bundle Builder</h1>
                        <p className="text-dim text-small">Build a valid FHIR R4 Bundle without writing raw JSON.</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                        {/* Form Panel */}
                        <motion.div variants={fadeUp} custom={1}>
                            {/* Patient */}
                            <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-4)' }}>
                                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>Patient Demographics</h3>
                                <div className="flex gap-3" style={{ marginBottom: 'var(--space-2)' }}>
                                    <Field label="First Name" value={patient.given} onChange={v => setPatient(p => ({ ...p, given: v }))} />
                                    <Field label="Last Name" value={patient.family} onChange={v => setPatient(p => ({ ...p, family: v }))} />
                                </div>
                                <div className="flex gap-3">
                                    <Field label="Date of Birth" value={patient.dob} onChange={v => setPatient(p => ({ ...p, dob: v }))} placeholder="YYYY-MM-DD" />
                                    <div style={{ flex: 1 }}>
                                        <label className="text-xs text-slate" style={{ display: 'block', marginBottom: 2, fontWeight: 500 }}>Gender</label>
                                        <select className="input" value={patient.gender} onChange={e => setPatient(p => ({ ...p, gender: e.target.value }))} style={{ fontSize: 'var(--text-sm)' }}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <Field label="MRN" value={patient.mrn} onChange={v => setPatient(p => ({ ...p, mrn: v }))} />
                                </div>
                            </div>

                            {/* Encounter */}
                            <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-4)' }}>
                                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>Encounter</h3>
                                <div className="flex gap-3">
                                    <Field label="Reason" value={encounter.reason} onChange={v => setEncounter(e => ({ ...e, reason: v }))} width="3" />
                                    <div style={{ flex: 1 }}>
                                        <label className="text-xs text-slate" style={{ display: 'block', marginBottom: 2, fontWeight: 500 }}>Class</label>
                                        <select className="input" value={encounter.class} onChange={e => setEncounter(enc => ({ ...enc, class: e.target.value }))} style={{ fontSize: 'var(--text-sm)' }}>
                                            <option value="AMB">Ambulatory</option>
                                            <option value="IMP">Inpatient</option>
                                            <option value="EMER">Emergency</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Conditions */}
                            <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-4)' }}>
                                <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-3)' }}>
                                    <h3 style={{ fontSize: 'var(--text-base)' }}>Active Conditions</h3>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setConditions(c => [...c, { text: '', code: '', status: 'active' }])}><Plus size={12} /> Add</button>
                                </div>
                                {conditions.map((c, i) => (
                                    <div key={i} className="flex gap-2 items-end" style={{ marginBottom: 'var(--space-2)' }}>
                                        <Field label="Description" value={c.text} onChange={v => { const n = [...conditions]; n[i].text = v; setConditions(n) }} />
                                        <Field label="ICD-10" value={c.code} onChange={v => { const n = [...conditions]; n[i].code = v; setConditions(n) }} />
                                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setConditions(c => c.filter((_, j) => j !== i))} style={{ marginBottom: 4 }}><Trash2 size={14} className="text-critical" /></button>
                                    </div>
                                ))}
                            </div>

                            {/* Medications */}
                            <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-4)' }}>
                                <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-3)' }}>
                                    <h3 style={{ fontSize: 'var(--text-base)' }}>Current Medications</h3>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setMedications(m => [...m, { text: '', rxnorm: '', status: 'active' }])}><Plus size={12} /> Add</button>
                                </div>
                                {medications.map((m, i) => (
                                    <div key={i} className="flex gap-2 items-end" style={{ marginBottom: 'var(--space-2)' }}>
                                        <Field label="Medication" value={m.text} onChange={v => { const n = [...medications]; n[i].text = v; setMedications(n) }} />
                                        <Field label="RxNorm Code" value={m.rxnorm} onChange={v => { const n = [...medications]; n[i].rxnorm = v; setMedications(n) }} />
                                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setMedications(m => m.filter((_, j) => j !== i))} style={{ marginBottom: 4 }}><Trash2 size={14} className="text-critical" /></button>
                                    </div>
                                ))}
                            </div>

                            {/* Observations */}
                            <div className="glass-card" style={{ padding: 'var(--space-5)' }}>
                                <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-3)' }}>
                                    <h3 style={{ fontSize: 'var(--text-base)' }}>Observations</h3>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setObservations(o => [...o, { text: '', value: '', unit: '', loinc: '' }])}><Plus size={12} /> Add</button>
                                </div>
                                {observations.map((o, i) => (
                                    <div key={i} className="flex gap-2 items-end" style={{ marginBottom: 'var(--space-2)' }}>
                                        <Field label="Observation" value={o.text} onChange={v => { const n = [...observations]; n[i].text = v; setObservations(n) }} />
                                        <Field label="Value" value={o.value} onChange={v => { const n = [...observations]; n[i].value = v; setObservations(n) }} />
                                        <Field label="Unit" value={o.unit} onChange={v => { const n = [...observations]; n[i].unit = v; setObservations(n) }} />
                                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setObservations(o => o.filter((_, j) => j !== i))} style={{ marginBottom: 4 }}><Trash2 size={14} className="text-critical" /></button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Preview Panel */}
                        <motion.div variants={fadeUp} custom={2}>
                            <div className="glass-surface" style={{ position: 'sticky', top: 'calc(var(--nav-height) + var(--space-6))', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                                <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="text-small text-white" style={{ fontWeight: 600 }}>Generated FHIR R4 Bundle</span>
                                    <div className="flex gap-2">
                                        <button className="btn btn-ghost btn-sm" onClick={copyBundle}>
                                            {copied ? <><CheckCircle2 size={12} className="text-success" /> Copied!</> : <><Copy size={12} /> Copy</>}
                                        </button>
                                    </div>
                                </div>
                                <pre style={{ padding: 'var(--space-4)', background: 'rgba(0,0,0,0.3)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--brand-sky)', maxHeight: 'calc(100vh - 200px)', overflow: 'auto', lineHeight: 1.6, margin: 0 }}>
                                    {bundle}
                                </pre>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
