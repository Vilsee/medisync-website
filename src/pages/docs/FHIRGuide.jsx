import DocsSidebar from '../../components/DocsSidebar'
import { motion } from 'framer-motion'
import { Copy } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const resources = [
    { type: 'Patient', required: true, desc: 'Demographics, identifiers, contact information' },
    { type: 'Encounter', required: true, desc: 'Current clinical encounter context' },
    { type: 'Observation', required: true, desc: 'Vitals, lab results, clinical measurements' },
    { type: 'MedicationRequest', required: true, desc: 'Active medication orders' },
    { type: 'Condition', required: true, desc: 'Active diagnoses and problems' },
    { type: 'DocumentReference', required: false, desc: 'Historical notes (for RAG context)' },
    { type: 'AllergyIntolerance', required: false, desc: 'Known allergies (v1.1)' },
]

const exampleBundle = `{
  "resourceType": "Bundle",
  "type": "collection",
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "patient-001",
        "name": [{ "given": ["John"], "family": "Smith" }],
        "birthDate": "1965-03-15",
        "gender": "male"
      }
    },
    {
      "resource": {
        "resourceType": "Encounter",
        "id": "encounter-001",
        "status": "in-progress",
        "class": { "code": "AMB" },
        "subject": { "reference": "Patient/patient-001" },
        "reasonCode": [{ "text": "Follow-up for diabetes management" }]
      }
    },
    {
      "resource": {
        "resourceType": "Observation",
        "id": "obs-bp",
        "code": { "coding": [{ "system": "http://loinc.org", "code": "85354-9" }] },
        "valueQuantity": { "value": 128, "unit": "mmHg" },
        "subject": { "reference": "Patient/patient-001" }
      }
    },
    {
      "resource": {
        "resourceType": "MedicationRequest",
        "id": "med-001",
        "status": "active",
        "medicationCodeableConcept": {
          "coding": [{ "system": "http://www.nlm.nih.gov/research/umls/rxnorm", "code": "860975", "display": "Metformin 500 MG" }]
        },
        "subject": { "reference": "Patient/patient-001" }
      }
    },
    {
      "resource": {
        "resourceType": "Condition",
        "id": "cond-001",
        "code": { "coding": [{ "system": "http://hl7.org/fhir/sid/icd-10-cm", "code": "E11.9", "display": "Type 2 diabetes mellitus" }] },
        "subject": { "reference": "Patient/patient-001" },
        "clinicalStatus": { "coding": [{ "code": "active" }] }
      }
    }
  ]
}`

export default function FHIRGuide() {
    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <div className="docs-layout">
                <DocsSidebar />
                <div>
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp}>
                            <h1 className="text-h1" style={{ marginBottom: 'var(--space-3)' }}>FHIR Integration Guide</h1>
                            <p className="text-dim" style={{ marginBottom: 'var(--space-8)' }}>How to construct a valid FHIR R4 Bundle for MediSync.</p>
                        </motion.div>

                        <motion.div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }} variants={fadeUp} custom={1}>
                            <h2 style={{ marginBottom: 'var(--space-4)' }}>Supported Resource Types</h2>
                            <div className="table-wrapper">
                                <table className="table">
                                    <thead><tr><th>Resource Type</th><th>Required</th><th>Description</th></tr></thead>
                                    <tbody>
                                        {resources.map(r => (
                                            <tr key={r.type}>
                                                <td><code className="code-inline">{r.type}</code></td>
                                                <td>{r.required ? <span className="badge badge-success">Required</span> : <span className="badge">Optional</span>}</td>
                                                <td className="text-dim text-small">{r.desc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        <motion.div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }} variants={fadeUp} custom={2}>
                            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-3)' }}>
                                <h2>Example FHIR R4 Bundle</h2>
                                <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText(exampleBundle)}>
                                    <Copy size={12} /> Copy
                                </button>
                            </div>
                            <p className="text-dim text-small" style={{ marginBottom: 'var(--space-4)' }}>Diabetes management follow-up encounter with active metformin prescription.</p>
                            <pre className="code-block" style={{ fontSize: 'var(--text-xs)', maxHeight: 400, overflow: 'auto' }}>{exampleBundle}</pre>
                        </motion.div>

                        <motion.div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }} variants={fadeUp} custom={3}>
                            <h2 style={{ marginBottom: 'var(--space-3)' }}>Validation Rules</h2>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                {[
                                    'Bundle must have resourceType: "Bundle" and type: "collection"',
                                    'At least one Patient and one Encounter resource required',
                                    'All resources must have a unique id field',
                                    'References must use relative format: "Patient/patient-001"',
                                    'MedicationRequest must include RxNorm coding for drug interaction analysis',
                                    'Condition must include ICD-10-CM coding for coding advisor',
                                    'All date fields must be ISO 8601 format',
                                ].map(rule => (
                                    <li key={rule} className="flex items-center gap-2 text-small text-dim">
                                        <span style={{ color: 'var(--brand-electric)' }}>→</span> {rule}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div className="glass-card" style={{ padding: 'var(--space-6)' }} variants={fadeUp} custom={4}>
                            <h2 style={{ marginBottom: 'var(--space-3)' }}>De-Identification (Demo Mode)</h2>
                            <p className="text-dim text-small" style={{ lineHeight: 1.7 }}>
                                In demo mode, MediSync automatically de-identifies patient data before processing. Names, dates, and identifiers are replaced with synthetic equivalents. The de-identification pipeline uses Presidio for entity recognition and replacement. <strong style={{ color: 'white' }}>Never submit real PHI to the demo environment.</strong>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
