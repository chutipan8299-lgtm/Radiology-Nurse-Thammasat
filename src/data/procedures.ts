export type Category =
  | "Diagnostic Radiology"
  | "Interventional Radiology"
  | "Nuclear Medicine"
  | "Radiation Therapy";

export type Complexity = "Non-invasive" | "Invasive";
export type Type = "Diagnostic" | "Treatment";

export interface ProcedureI18n {
  name?: string;
  description?: string;
  whoFor?: string;
  duration?: string;
  risks?: string[];
  preparation?: string[];
  steps?: string[];
  aftercare?: string[];
  faq?: { q: string; a: string }[];
}

export interface Procedure {
  id: string;
  name: string;
  category: Category;
  type: Type;
  complexity: Complexity;
  description: string;
  whoFor: string;
  duration: string;
  keywords: string[];
  risks: string[];
  preparation: string[];
  steps: string[];
  aftercare: string[];
  faq: { q: string; a: string }[];
  videoUrl?: string;
  pdfUrl?: string;
  staffNotes?: string[];
  protocol?: string[];
  checklist?: string[];
  i18n?: { th?: ProcedureI18n };
}

export const procedures: Procedure[] = [
  {
    id: "ct-scan",
    name: "CT Scan (Computed Tomography)",
    category: "Diagnostic Radiology",
    type: "Diagnostic",
    complexity: "Non-invasive",
    description:
      "A detailed cross-sectional imaging exam using X-rays to view internal organs and tissues.",
    whoFor:
      "Patients needing detailed imaging of the chest, abdomen, head, or vascular system.",
    duration: "15–30 minutes",
    keywords: ["ct", "computed tomography", "scan", "x-ray", "imaging"],
    risks: [
      "Low-dose radiation exposure",
      "Possible reaction to contrast dye (rare)",
      "Not recommended during pregnancy unless necessary",
    ],
    preparation: [
      "Fast for 4–6 hours before the scan if contrast is required.",
      "Wear comfortable, loose clothing with no metal.",
      "Inform staff of allergies, kidney issues, or pregnancy.",
      "Bring previous imaging results if available.",
    ],
    steps: [
      "Check in at the radiology department.",
      "Change into a hospital gown if requested.",
      "Lie down on the CT table; the table slides into the scanner.",
      "Stay still and follow breathing instructions.",
      "Scan completes in a few minutes; staff will guide you out.",
    ],
    aftercare: [
      "Drink plenty of water to flush contrast dye (if used).",
      "Resume normal activities immediately.",
      "Watch for any rash or shortness of breath and report it.",
    ],
    faq: [
      { q: "Is a CT scan painful?", a: "No, the scan itself is painless." },
      {
        q: "Can I eat before the scan?",
        a: "Only if no contrast is used. Otherwise, fast 4–6 hours.",
      },
      {
        q: "How long until I get results?",
        a: "Usually within 1–3 working days from your physician.",
      },
    ],
    staffNotes: [
      "Confirm eGFR ≥ 30 before iodinated contrast.",
      "Verify pregnancy status for women of childbearing age.",
      "Pre-medicate known contrast-allergic patients per protocol.",
    ],
    protocol: [
      "Standard chest CT: 120 kVp, automated mAs, 1.25 mm slice.",
      "Contrast: 80–100 mL iohexol @ 3 mL/s, 25s delay (arterial).",
    ],
    checklist: [
      "Consent form signed",
      "IV access established (18–20G)",
      "Allergy and renal status reviewed",
      "Metal objects removed",
    ],
  },
  {
    id: "mri",
    name: "MRI (Magnetic Resonance Imaging)",
    category: "Diagnostic Radiology",
    type: "Diagnostic",
    complexity: "Non-invasive",
    description:
      "Uses magnetic fields and radio waves to produce detailed images of soft tissues, brain, and joints.",
    whoFor:
      "Patients needing high-detail imaging of the brain, spine, joints, or organs.",
    duration: "30–60 minutes",
    keywords: ["mri", "magnetic", "resonance", "brain", "spine"],
    risks: [
      "Not safe with certain implants (pacemakers, cochlear implants)",
      "Loud noise during the scan",
      "Claustrophobia in narrow scanners",
    ],
    preparation: [
      "Remove all metal objects, jewelry, and electronics.",
      "Inform staff of any implants, tattoos, or metal fragments.",
      "Wear comfortable clothing without zippers or metal.",
      "Eat normally unless told otherwise.",
    ],
    steps: [
      "Complete the MRI safety screening form.",
      "Change into provided gown.",
      "Lie still on the MRI table; ear protection provided.",
      "Stay calm and breathe normally during scan.",
      "Scan completes; staff helps you off the table.",
    ],
    aftercare: [
      "No downtime — return to normal activities right away.",
      "If sedated, arrange a ride home.",
    ],
    faq: [
      { q: "Is MRI safe?", a: "Yes, it uses no radiation. It's very safe for most patients." },
      { q: "Why is it loud?", a: "The magnets create knocking sounds. Earplugs are provided." },
    ],
    staffNotes: [
      "Verify MRI safety questionnaire before entry to Zone IV.",
      "Gadolinium contraindicated if eGFR < 30.",
    ],
    protocol: [
      "Brain MRI: T1, T2, FLAIR, DWI sequences standard.",
      "Use earplugs + headphones for hearing protection.",
    ],
    checklist: [
      "Safety screening completed",
      "Implant card reviewed",
      "All metal removed",
      "Patient comfortable / panic button explained",
    ],
  },
  {
    id: "xray",
    name: "X-Ray Imaging",
    category: "Diagnostic Radiology",
    type: "Diagnostic",
    complexity: "Non-invasive",
    description:
      "Quick imaging using low-dose radiation to view bones, lungs, and other dense structures.",
    whoFor: "Patients with suspected fractures, lung issues, or routine screening.",
    duration: "5–15 minutes",
    keywords: ["xray", "x-ray", "radiograph", "bone", "chest"],
    risks: ["Very low radiation exposure", "Avoid during pregnancy unless necessary"],
    preparation: [
      "Remove jewelry and metal items.",
      "Wear loose clothing.",
      "Inform staff if pregnant.",
    ],
    steps: [
      "Position as instructed by the technologist.",
      "Hold breath briefly during exposure.",
      "Multiple views may be taken.",
    ],
    aftercare: ["Resume normal activity. No special care needed."],
    faq: [
      { q: "How much radiation?", a: "Very small — equivalent to a few days of natural background radiation." },
    ],
    staffNotes: ["Apply ALARA principles. Use lead shielding when possible."],
    checklist: ["Pregnancy status verified", "Lead shielding in place", "Correct patient ID"],
  },
  {
    id: "lung-biopsy",
    name: "CT-Guided Lung Biopsy",
    category: "Interventional Radiology",
    type: "Diagnostic",
    complexity: "Invasive",
    description:
      "A minimally invasive procedure to take a small tissue sample from the lung using CT guidance.",
    whoFor: "Patients with suspicious lung nodules requiring tissue diagnosis.",
    duration: "30–60 minutes",
    keywords: ["lung biopsy", "biopsy", "nodule", "interventional"],
    risks: [
      "Pneumothorax (collapsed lung) — most common",
      "Bleeding or infection",
      "Pain at biopsy site",
    ],
    preparation: [
      "Fast for 6 hours before the procedure.",
      "Stop blood thinners as directed by your doctor.",
      "Arrange a companion for the day of procedure.",
      "Sign consent form after risks are explained.",
    ],
    steps: [
      "Lie on the CT table in the position needed.",
      "Local anesthetic is applied to numb the area.",
      "A thin needle is guided into the lung using CT.",
      "Small tissue samples are taken.",
      "Pressure dressing applied; you'll be observed for 2–4 hours.",
    ],
    aftercare: [
      "Rest for 24 hours; avoid heavy lifting for 1 week.",
      "Watch for chest pain, shortness of breath, or coughing blood.",
      "Return immediately if symptoms occur.",
      "Follow-up chest X-ray as scheduled.",
    ],
    faq: [
      { q: "Will I be awake?", a: "Yes, with local anesthetic. Sedation may be offered." },
      { q: "When do I get results?", a: "Pathology results take 3–7 days." },
    ],
    staffNotes: [
      "Check INR < 1.5, platelets > 50,000.",
      "Post-procedure CXR at 1h and 4h to rule out pneumothorax.",
    ],
    protocol: [
      "18–20G coaxial needle, 2–3 core samples.",
      "Patient positioning: prone or supine based on lesion location.",
    ],
    checklist: [
      "Coagulation labs reviewed",
      "Consent obtained",
      "IV access + emergency cart ready",
      "Recovery bed reserved",
    ],
  },
  {
    id: "angiography",
    name: "Angiography",
    category: "Interventional Radiology",
    type: "Diagnostic",
    complexity: "Invasive",
    description:
      "Imaging of blood vessels using contrast dye to detect blockages or abnormalities.",
    whoFor: "Patients with suspected vascular disease, aneurysm, or blockage.",
    duration: "30–90 minutes",
    keywords: ["angiography", "vascular", "blood vessel", "contrast"],
    risks: ["Bleeding at puncture site", "Contrast reaction", "Vessel injury (rare)"],
    preparation: [
      "Fast 6 hours prior.",
      "Inform team of allergies and medications.",
      "Shave groin area if requested.",
    ],
    steps: [
      "Local anesthetic applied at the groin or wrist.",
      "Catheter inserted into the artery.",
      "Contrast injected; X-ray images captured.",
      "Catheter removed; pressure applied for 15 minutes.",
    ],
    aftercare: [
      "Bed rest 4–6 hours after procedure.",
      "Drink fluids to flush contrast.",
      "Watch for swelling or bleeding at puncture site.",
    ],
    faq: [
      { q: "Is this painful?", a: "Mild discomfort at insertion site, otherwise minimal pain." },
    ],
    staffNotes: ["Monitor distal pulses post-procedure every 15 min × 4."],
    checklist: ["Coag labs OK", "Pulses marked", "Sandbag/closure device ready"],
  },
  {
    id: "pet-ct",
    name: "PET-CT Scan",
    category: "Nuclear Medicine",
    type: "Diagnostic",
    complexity: "Non-invasive",
    description:
      "Combines PET and CT to detect cancer, heart disease, and brain disorders using a radioactive tracer.",
    whoFor: "Cancer staging, recurrence detection, or metabolic studies.",
    duration: "2–3 hours total",
    keywords: ["pet", "pet-ct", "nuclear", "tracer", "cancer"],
    risks: ["Low radiation from tracer", "Allergic reaction (very rare)"],
    preparation: [
      "Fast 6 hours; no sugary drinks.",
      "Avoid strenuous exercise 24 hours before.",
      "Diabetic patients: follow special instructions.",
    ],
    steps: [
      "Tracer injection via IV.",
      "Rest quietly for 60 minutes for tracer uptake.",
      "Scan takes 20–40 minutes.",
    ],
    aftercare: [
      "Drink water to flush tracer.",
      "Avoid close contact with infants/pregnant women for 6 hours.",
    ],
    faq: [
      { q: "Am I radioactive after?", a: "Briefly. Levels are very low and dissipate within hours." },
    ],
    staffNotes: ["Verify blood glucose < 200 mg/dL prior to FDG injection."],
    checklist: ["Glucose checked", "IV access ready", "Tracer dose verified"],
  },
  {
    id: "radiation-therapy",
    name: "External Beam Radiation Therapy",
    category: "Radiation Therapy",
    type: "Treatment",
    complexity: "Non-invasive",
    description:
      "Targeted radiation delivered from outside the body to treat cancer over multiple sessions.",
    whoFor: "Cancer patients prescribed radiotherapy as part of treatment plan.",
    duration: "10–30 minutes per session",
    keywords: ["radiation", "radiotherapy", "cancer", "treatment"],
    risks: [
      "Skin irritation in treated area",
      "Fatigue",
      "Site-specific side effects (discussed at planning)",
    ],
    preparation: [
      "Attend simulation/planning session.",
      "Skin markings must be preserved between sessions.",
      "Wear comfortable, soft clothing.",
      "Maintain good nutrition and hydration.",
    ],
    steps: [
      "Lie on the treatment table in planned position.",
      "Therapist aligns you using markings and lasers.",
      "Machine delivers radiation; you must stay still.",
      "No sensation during treatment.",
    ],
    aftercare: [
      "Use only recommended skincare on treated area.",
      "Rest as needed; fatigue is common.",
      "Report any new symptoms to your care team.",
    ],
    faq: [
      { q: "Will I feel the radiation?", a: "No. Treatment itself is painless." },
      { q: "Can I be around others?", a: "Yes — external radiation does not make you radioactive." },
    ],
    staffNotes: [
      "Verify daily setup using IGRT.",
      "Document skin reactions weekly using RTOG scale.",
    ],
    checklist: ["Setup verified", "Dose double-checked", "Skin assessed"],
  },
  {
    id: "ultrasound",
    name: "Ultrasound",
    category: "Diagnostic Radiology",
    type: "Diagnostic",
    complexity: "Non-invasive",
    description:
      "Uses sound waves to create real-time images of organs, vessels, and pregnancy.",
    whoFor: "Abdominal exams, pregnancy, vascular studies, soft tissue evaluation.",
    duration: "15–45 minutes",
    keywords: ["ultrasound", "sonogram", "pregnancy", "abdomen"],
    risks: ["No known risks — uses no radiation."],
    preparation: [
      "Abdominal: fast 6 hours.",
      "Pelvic: drink water and hold full bladder.",
      "Wear loose clothing.",
    ],
    steps: [
      "Lie on the exam table.",
      "Gel applied to skin.",
      "Probe moved over the area to capture images.",
    ],
    aftercare: ["Wipe off gel; resume normal activity."],
    faq: [
      { q: "Is it safe in pregnancy?", a: "Yes — ultrasound is the safest imaging in pregnancy." },
    ],
    staffNotes: ["Document probe used and exam protocol."],
    checklist: ["Patient prep verified", "Probe disinfected"],
  },
];

export const categories: Category[] = [
  "Diagnostic Radiology",
  "Interventional Radiology",
  "Nuclear Medicine",
  "Radiation Therapy",
];