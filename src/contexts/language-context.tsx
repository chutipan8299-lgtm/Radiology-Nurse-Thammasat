import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "th";

type Entry = { en: string; th: string };

export const translations: Record<string, Entry> = {
  // Brand
  "brand.name": { en: "Radiology Nursing", th: "หน่วยพยาบาลรังสีวิทยา" },
  "brand.tagline": { en: "Care · Guidance · Trust", th: "ดูแล · แนะนำ · ไว้วางใจ" },
  "brand.fullName": { en: "Radiology Nursing Unit", th: "หน่วยพยาบาลรังสีวิทยา" },

  // Nav
  "nav.home": { en: "Home", th: "หน้าแรก" },
  "nav.procedures": { en: "Procedures", th: "หัตถการ" },
  "nav.journey": { en: "Patient Journey", th: "ขั้นตอนผู้ป่วย" },
  "nav.contact": { en: "Contact", th: "ติดต่อ" },

  // Mode
  "mode.patient": { en: "Patient", th: "ผู้ป่วย" },
  "mode.staff": { en: "Staff", th: "เจ้าหน้าที่" },
  "mode.staffBadge": { en: "Staff Mode", th: "โหมดเจ้าหน้าที่" },

  // Home
  "home.badge.patient": { en: "Patient-friendly guides", th: "คู่มือสำหรับผู้ป่วย" },
  "home.badge.staff": { en: "Staff resources & protocols", th: "ทรัพยากรและโปรโตคอลเจ้าหน้าที่" },
  "home.title.prefix": { en: "Radiology Nursing", th: "หน่วยพยาบาล" },
  "home.title.highlight": { en: "Unit", th: "รังสีวิทยา" },
  "home.subtitle": {
    en: "Preparation & guidance for radiology procedures — clear, calm, and trustworthy. Know what to expect before, during, and after your visit.",
    th: "การเตรียมตัวและคำแนะนำสำหรับหัตถการรังสีวิทยา — ชัดเจน อุ่นใจ และเชื่อถือได้ รู้ทุกขั้นตอนก่อน ระหว่าง และหลังการเข้ารับบริการ",
  },
  "home.cta.prepare": { en: "Prepare Before Your Visit", th: "เตรียมตัวก่อนเข้ารับบริการ" },
  "home.cta.search": { en: "Search Procedures", th: "ค้นหาหัตถการ" },
  "home.search.placeholder": { en: "Search e.g. CT scan, Lung biopsy", th: "ค้นหาเช่น CT scan, ตรวจชิ้นเนื้อปอด" },
  "home.search.button": { en: "Search", th: "ค้นหา" },
  "home.card.title": { en: "Your visit at a glance", th: "ภาพรวมการมาพบแพทย์" },
  "home.card.today": { en: "Today", th: "วันนี้" },
  "home.card.safe.t": { en: "Safe & evidence-based", th: "ปลอดภัยและอิงหลักฐาน" },
  "home.card.safe.d": { en: "Care follows the latest hospital protocols.", th: "ดูแลตามโปรโตคอลล่าสุดของโรงพยาบาล" },
  "home.card.team.t": { en: "Compassionate team", th: "ทีมงานที่เอาใจใส่" },
  "home.card.team.d": { en: "Nurses guide you through every step.", th: "พยาบาลแนะนำในทุกขั้นตอน" },
  "home.card.time.t": { en: "On-time & efficient", th: "ตรงเวลาและมีประสิทธิภาพ" },
  "home.card.time.d": { en: "Most visits take 15–60 minutes.", th: "ส่วนใหญ่ใช้เวลา 15–60 นาที" },

  "home.services.title": { en: "Our Services", th: "บริการของเรา" },
  "home.services.subtitle": { en: "Choose a category to explore procedures and prepare ahead.", th: "เลือกหมวดหมู่เพื่อเรียนรู้หัตถการและเตรียมตัวล่วงหน้า" },
  "home.services.viewAll": { en: "View all procedures →", th: "ดูหัตถการทั้งหมด →" },
  "home.services.explore": { en: "Explore", th: "สำรวจ" },

  "service.diagnostic.name": { en: "Diagnostic Radiology", th: "รังสีวินิจฉัย" },
  "service.diagnostic.desc": { en: "X-ray, CT, MRI, ultrasound — see what's inside, safely.", th: "เอกซเรย์, CT, MRI, อัลตราซาวด์ — มองภายในร่างกายอย่างปลอดภัย" },
  "service.interventional.name": { en: "Interventional Radiology", th: "รังสีร่วมรักษา" },
  "service.interventional.desc": { en: "Minimally invasive image-guided treatments.", th: "การรักษาแผลเล็กโดยใช้ภาพนำทาง" },
  "service.nuclear.name": { en: "Nuclear Medicine", th: "เวชศาสตร์นิวเคลียร์" },
  "service.nuclear.desc": { en: "PET, SPECT and tracer-based diagnostics.", th: "PET, SPECT และการวินิจฉัยด้วยสารเภสัชรังสี" },
  "service.radiation.name": { en: "Radiation Therapy", th: "รังสีรักษา" },
  "service.radiation.desc": { en: "Targeted radiation treatment for cancer care.", th: "การฉายรังสีรักษาเฉพาะจุดสำหรับโรคมะเร็ง" },

  "home.quick.staff.title": { en: "Staff Quick Access", th: "ทางลัดสำหรับเจ้าหน้าที่" },
  "home.quick.patient.title": { en: "Helpful Resources", th: "ข้อมูลที่เป็นประโยชน์" },
  "home.quick.staff.desc": { en: "Fast links to protocols, guidelines, and common procedures.", th: "ลิงก์ด่วนสู่โปรโตคอล แนวทาง และหัตถการที่พบบ่อย" },
  "home.quick.patient.desc": { en: "Information sheets and emergency guidance — at your fingertips.", th: "เอกสารข้อมูลและคำแนะนำกรณีฉุกเฉิน — เข้าถึงได้ง่าย" },
  "home.quick.protocols.t": { en: "Download Protocols", th: "ดาวน์โหลดโปรโตคอล" },
  "home.quick.protocols.d": { en: "Standardized clinical procedures (PDF).", th: "โปรโตคอลคลินิกมาตรฐาน (PDF)" },
  "home.quick.emergency.t": { en: "Emergency Guidelines", th: "แนวทางกรณีฉุกเฉิน" },
  "home.quick.emergency.d": { en: "Contrast reactions, codes, and escalation.", th: "ปฏิกิริยาสารทึบรังสี, รหัสฉุกเฉิน, การส่งต่อ" },
  "home.quick.common.t": { en: "Common Procedures", th: "หัตถการที่พบบ่อย" },
  "home.quick.common.d": { en: "Quick reference for daily workflows.", th: "อ้างอิงด่วนสำหรับงานประจำวัน" },

  // Procedures listing
  "proc.title": { en: "Radiology Procedures", th: "หัตถการรังสีวิทยา" },
  "proc.subtitle": { en: "Find a procedure to learn what to expect, how to prepare, and what to do after.", th: "ค้นหาหัตถการเพื่อรู้สิ่งที่จะเกิดขึ้น วิธีเตรียมตัว และการดูแลหลังทำ" },
  "proc.filter": { en: "Filter:", th: "กรอง:" },
  "proc.all": { en: "All", th: "ทั้งหมด" },
  "proc.anyType": { en: "Any type", th: "ทุกประเภท" },
  "proc.anyComplexity": { en: "Any complexity", th: "ทุกระดับความซับซ้อน" },
  "proc.viewDetails": { en: "View details", th: "ดูรายละเอียด" },
  "proc.noResults": { en: "No procedures match your search.", th: "ไม่พบหัตถการที่ตรงกับการค้นหา" },
  "proc.type.Diagnostic": { en: "Diagnostic", th: "วินิจฉัย" },
  "proc.type.Treatment": { en: "Treatment", th: "รักษา" },
  "proc.complexity.Non-invasive": { en: "Non-invasive", th: "ไม่รุกล้ำ" },
  "proc.complexity.Invasive": { en: "Invasive", th: "รุกล้ำ" },

  // Procedure detail
  "detail.back": { en: "All procedures", th: "ย้อนกลับไปหัตถการทั้งหมด" },
  "detail.videoSoon": { en: "Patient education video coming soon", th: "วิดีโอให้ความรู้ผู้ป่วยเร็ว ๆ นี้" },
  "detail.who": { en: "Who is this for", th: "เหมาะสำหรับใคร" },
  "detail.risks": { en: "Risks & Warnings", th: "ความเสี่ยงและคำเตือน" },
  "detail.prep": { en: "Preparation (before your visit)", th: "การเตรียมตัว (ก่อนเข้ารับบริการ)" },
  "detail.steps": { en: "Procedure Steps", th: "ขั้นตอนหัตถการ" },
  "detail.after": { en: "Aftercare (post-procedure)", th: "การดูแลหลังหัตถการ" },
  "detail.faq": { en: "Frequently Asked Questions", th: "คำถามที่พบบ่อย" },
  "detail.clinicalNotes": { en: "Clinical Notes", th: "บันทึกทางคลินิก" },
  "detail.noNotes": { en: "No clinical notes for this procedure.", th: "ไม่มีบันทึกทางคลินิกสำหรับหัตถการนี้" },
  "detail.protocol": { en: "Internal Protocol", th: "โปรโตคอลภายใน" },
  "detail.checklist": { en: "Pre-procedure Checklist", th: "เช็กลิสต์ก่อนทำหัตถการ" },
  "detail.needHelp": { en: "Need help?", th: "ต้องการความช่วยเหลือ?" },
  "detail.contactHospital": { en: "Contact Hospital", th: "ติดต่อโรงพยาบาล" },
  "detail.viewLocation": { en: "View Location", th: "ดูสถานที่" },
  "detail.downloadInfo": { en: "Download Info Sheet", th: "ดาวน์โหลดเอกสารข้อมูล" },
  "detail.hours": { en: "Operating hours", th: "เวลาทำการ" },
  "detail.hours.mf": { en: "Mon–Fri 7:00–17:00", th: "จันทร์–ศุกร์ 7:00–17:00" },
  "detail.hours.sat": { en: "Sat 8:00–12:00", th: "เสาร์ 8:00–12:00" },
  "detail.notFound": { en: "Procedure not found", th: "ไม่พบหัตถการ" },

  // Journey
  "journey.badge": { en: "Your visit, step by step", th: "การมาพบแพทย์ของคุณ ทีละขั้นตอน" },
  "journey.title": { en: "Patient Journey", th: "ขั้นตอนผู้ป่วย" },
  "journey.subtitle": { en: "A simple, guided path so you feel prepared and confident at every stage of your radiology visit.", th: "เส้นทางที่เรียบง่ายและมีคำแนะนำ ให้คุณพร้อมและมั่นใจในทุกขั้นตอน" },
  "journey.s1.t": { en: "Identify your procedure", th: "ระบุหัตถการของคุณ" },
  "journey.s1.d": { en: "Look up your scheduled procedure to know exactly what to expect.", th: "ค้นหาหัตถการที่นัดไว้เพื่อรู้สิ่งที่จะเกิดขึ้น" },
  "journey.s2.t": { en: "Learn how to prepare", th: "เรียนรู้วิธีเตรียมตัว" },
  "journey.s2.d": { en: "Follow the preparation steps — fasting, medications, clothing, and more.", th: "ทำตามขั้นตอนเตรียมตัว — การงดอาหาร ยา การแต่งกาย และอื่น ๆ" },
  "journey.s3.t": { en: "Prepare documents", th: "เตรียมเอกสาร" },
  "journey.s3.d": { en: "Bring your ID, insurance card, referral letter, and prior imaging.", th: "นำบัตรประชาชน บัตรประกัน ใบส่งตัว และผลภาพถ่ายเก่า" },
  "journey.s4.t": { en: "Visit the hospital", th: "เข้าโรงพยาบาล" },
  "journey.s4.d": { en: "Check in at the Radiology Nursing Unit. Our team will guide you.", th: "เช็กอินที่หน่วยพยาบาลรังสีวิทยา ทีมงานจะแนะนำคุณ" },
  "journey.s5.t": { en: "Post-procedure care", th: "การดูแลหลังหัตถการ" },
  "journey.s5.d": { en: "Follow aftercare instructions and contact us if you have any concerns.", th: "ทำตามคำแนะนำการดูแลและติดต่อเราหากมีข้อกังวล" },
  "journey.cta.title": { en: "Ready to prepare?", th: "พร้อมเตรียมตัวหรือยัง?" },
  "journey.cta.desc": { en: "Find your procedure and get personalized preparation steps.", th: "ค้นหาหัตถการและรับคำแนะนำเฉพาะของคุณ" },
  "journey.cta.btn": { en: "Browse procedures", th: "ดูหัตถการทั้งหมด" },

  // Contact
  "contact.title": { en: "Contact Us", th: "ติดต่อเรา" },
  "contact.subtitle": { en: "We're here to help. Reach out by phone, email, or visit us in person.", th: "เราพร้อมช่วยเหลือ ติดต่อทางโทรศัพท์ อีเมล หรือมาพบเราด้วยตนเอง" },
  "contact.phone": { en: "Phone", th: "โทรศัพท์" },
  "contact.email": { en: "Email", th: "อีเมล" },
  "contact.location": { en: "Location", th: "สถานที่" },
  "contact.hours": { en: "Operating Hours", th: "เวลาทำการ" },
  "contact.phone.main": { en: "+66 2 123 4567", th: "+66 2 123 4567" },
  "contact.phone.emergency": { en: "Emergency: +66 2 123 4500", th: "ฉุกเฉิน: +66 2 123 4500" },
  "contact.address1": { en: "Building 3, Floor 2", th: "อาคาร 3 ชั้น 2" },
  "contact.address2": { en: "123 Hospital Road, Bangkok 10400", th: "123 ถนนโรงพยาบาล กรุงเทพฯ 10400" },
  "contact.hours.weekday": { en: "Monday – Friday: 7:00 – 17:00", th: "จันทร์ – ศุกร์: 7:00 – 17:00" },
  "contact.hours.sat": { en: "Saturday: 8:00 – 12:00", th: "เสาร์: 8:00 – 12:00" },
  "contact.hours.closed": { en: "Sunday & Holidays: Closed", th: "อาทิตย์และวันหยุด: ปิดทำการ" },
  "contact.emergency.title": { en: "In an emergency", th: "กรณีฉุกเฉิน" },
  "contact.emergency.desc": { en: "Call 1669 or go to the nearest emergency department immediately.", th: "โทร 1669 หรือไปแผนกฉุกเฉินที่ใกล้ที่สุดโดยทันที" },

  // Footer
  "footer.about": { en: "Compassionate guidance and clear preparation for every radiology procedure — for patients and care teams alike.", th: "คำแนะนำที่อบอุ่นและการเตรียมตัวที่ชัดเจนสำหรับทุกหัตถการรังสีวิทยา — สำหรับทั้งผู้ป่วยและทีมแพทย์" },
  "footer.quickLinks": { en: "Quick Links", th: "ลิงก์ด่วน" },
  "footer.contact": { en: "Contact", th: "ติดต่อ" },
  "footer.copyright": { en: "Radiology Nursing Unit. For informational purposes only — not a substitute for medical advice.", th: "หน่วยพยาบาลรังสีวิทยา เพื่อให้ข้อมูลเท่านั้น — ไม่ใช่คำแนะนำทางการแพทย์ทดแทน" },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("rnu-lang") : null;
    if (stored === "en" || stored === "th") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("rnu-lang", l);
  };

  const t = (key: string) => translations[key]?.[lang] ?? key;

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
