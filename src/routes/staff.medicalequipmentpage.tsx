"use client";

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from "react";

export const Route = createFileRoute('/staff/medicalequipmentpage')({
  component: MedicalEquipmentPage,
});

// ---- Types ----
interface Equipment {
  id: string;
  label: string;
}

interface StaffMember {
  name: string;
  equipment: Equipment[];
}

// ---- Mock Data ----
const staffData: StaffMember[] = [
  { name: "น.ส.ชญาภา กฤติพงศ์ณวกุล", equipment: [{ id: "TUH-03980", label: "TUH-03980" }] },
  { name: "นายกิติศักดิ์ คู่กระสังข์", equipment: [{ id: "TUH-03437", label: "TUH-03437" }] },
  { name: "นายอัศรา สิงหล้า", equipment: [{ id: "TUH-01922", label: "TUH-01922" }] },
  { name: "น.ส.ดารารัศมี มีมูซอ", equipment: [{ id: "TUH-01932", label: "TUH-01932" }] },
  { name: "น.ส.นฤมล ราชสีหา", equipment: [{ id: "TUH-03664", label: "TUH-03664" }] },
  { name: "น.ส.โยษิตา ค้าผล", equipment: [{ id: "TUH-04166", label: "TUH-04166" }] },
  { name: "น.ส.ญาราภรณ์ ปรังฤทธิ์", equipment: [{ id: "TUH-03600", label: "TUH-03600" }] },
  {
    name: "น.ส.ลลิตา กล้าหาญ",
    equipment: [
      { id: "Pressure bag 1", label: "Pressure bag 1" },
      { id: "Pressure bag 2", label: "Pressure bag 2" },
      { id: "Pressure bag 3", label: "Pressure bag 3" },
      { id: "Pressure bag 4", label: "Pressure bag 4" },
      { id: "Pressure bag 5", label: "Pressure bag 5" },
    ],
  },
  { name: "น.ส.ศศิธร พุทธทอง", equipment: [{ id: "TUH-03921", label: "TUH-03921" }] },
  { name: "นายพรเทพ เทาดี", equipment: [{ id: "TUH-01912", label: "TUH-01912" }] },
  {
    name: "น.ส.สุจิตตรา กองพีรี",
    equipment: [
      { id: "TUH-52721", label: "TUH-52721" },
      { id: "TUH-52722", label: "TUH-52722" },
      { id: "TUH-52724", label: "TUH-52724" },
      { id: "TUH-52849", label: "TUH-52849" },
    ],
  },
  {
    name: "น.ส.ฐาปราณี มาช่วย",
    equipment: [
      { id: "TUH-03287", label: "TUH-03287" },
      { id: "Stethoscope 1", label: "Stethoscope 1" },
      { id: "Stethoscope 2", label: "Stethoscope 2" },
      { id: "Stethoscope 3", label: "Stethoscope 3" },
    ],
  },
  {
    name: "น.ส.สุภลักษณ์ สุกประดิษฐ์",
    equipment: [
      { id: "TUH-52847", label: "TUH-52847" },
      { id: "Kipper", label: "Kipper" },
    ],
  },
  {
    name: "นายกิตติพงศ์ ม่วงรื่น",
    equipment: [
      { id: "TUH-52723", label: "TUH-52723" },
      { id: "TUH-52848", label: "TUH-52848" },
      { id: "TUH-52850", label: "TUH-52850" },
    ],
  },
];

// ---- Sidebar Config ----
const sidebarDepts = [
  { label: "บริหารภายใน", icon: "🏠", route: "/staff/internal" },
  { label: "รังสีร่วมรักษา", sublabel: "Intervention", icon: "💉", route: "/staff/medicalequipmentpage", active: true },
  { label: "เวชศาสตร์นิวเคลียร์", sublabel: "SPECT / CT", icon: "☢️", route: "/staff/medicalequipmentpage_spect" },
  { label: "รังสีรักษาและมะเร็งวิทยา", sublabel: "Radiation Therapy", icon: "🎯", route: "/staff/medicalequipmentpage_radiation" },
  { label: "รังสีวินิจฉัย", sublabel: "Diagnostic Radiology", icon: "🩺", route: "/staff/medicalequipmentpage_sceening" },
];

// ---- Sub-components ----
function ActionLink({ label, color }: { label: string; color: string }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? color + "15" : "transparent",
        border: "none",
        color,
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer",
        padding: "3px 6px",
        borderRadius: 6,
        textAlign: "left",
        textDecoration: h ? "underline" : "none",
        transition: "all 0.15s",
      }}
    >
      🔗 {label}
    </button>
  );
}

function EquipmentCard({ eq }: { eq: Equipment }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#fff5f8" : "#ffffff",
        border: hovered ? "1.5px solid #e879a0" : "1.5px solid #e5e7eb",
        borderRadius: 16,
        padding: "12px 12px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 4px 20px rgba(232,121,160,0.18)" : "0 1px 4px rgba(0,0,0,0.06)",
        minWidth: 140,
        maxWidth: 170,
        flex: "0 0 auto",
      }}
    >
      <div style={{ width: 110, height: 90, borderRadius: 10, background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#dbeafe" />
          <path d="M12 28V16l8-4 8 4v12" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="16" y="20" width="8" height="8" rx="1" fill="#93c5fd" />
          <circle cx="20" cy="14" r="2" fill="#60a5fa" />
        </svg>
      </div>
      <div style={{ background: "#1e40af", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, textAlign: "center", width: "100%" }}>
        {eq.label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
        <ActionLink label="แบบการตรวจสอบ" color="#e879a0" />
        <ActionLink label="รายงานตรวจสอบ" color="#f59e0b" />
      </div>
    </div>
  );
}

function StaffSection({ staff }: { staff: StaffMember }) {
  return (
    <div style={{ marginBottom: 28, background: "#ffffff", borderRadius: 16, border: "1px solid #f3f4f6", overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
      <div style={{ background: "linear-gradient(90deg, #fce7f3 0%, #fdf2f8 100%)", borderLeft: "4px solid #e879a0", padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #e879a0, #be185d)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
          {staff.name.slice(0, 1)}
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#be185d", fontFamily: "'Noto Sans Thai', 'Sarabun', sans-serif" }}>{staff.name}</span>
        <span style={{ marginLeft: "auto", background: "#e879a020", color: "#be185d", fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, border: "1px solid #fbb6ce" }}>
          {staff.equipment.length} รายการ
        </span>
      </div>
      <div style={{ padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: 12 }}>
        {staff.equipment.map((eq) => <EquipmentCard key={eq.id} eq={eq} />)}
      </div>
    </div>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside style={{ width: 260, flexShrink: 0, background: "#ffffff", borderRight: "1px solid #f3e8f0", display: "flex", flexDirection: "column", padding: "20px 0", minHeight: "100vh", boxShadow: "2px 0 12px rgba(232,121,160,0.07)" }}>
      <div style={{ padding: "0 20px 24px" }}>
        <div style={{ background: "linear-gradient(135deg, #e879a0, #be185d)", borderRadius: 14, padding: "14px 16px", color: "#fff" }}>
          <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3 }}>Radiology Nursing</div>
          <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>Care · Guidance · Trust</div>
        </div>
      </div>
      <div style={{ padding: "0 20px 12px", fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: 1.2, textTransform: "uppercase" }}>
        งานการพยาบาล
      </div>
      {sidebarDepts.map((dept) => (
        <button
          key={dept.label}
          onClick={() => navigate({ to: dept.route as any })}
          style={{
            background: dept.active ? "linear-gradient(90deg, #fce7f3, #fdf2f8)" : "transparent",
            border: "none",
            borderLeft: dept.active ? "3px solid #e879a0" : "3px solid transparent",
            padding: "10px 20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            textAlign: "left",
            transition: "all 0.15s",
            marginBottom: 2,
            width: "100%",
          }}
        >
          <span style={{ fontSize: 18 }}>{dept.icon}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: dept.active ? 700 : 500, color: dept.active ? "#be185d" : "#374151", fontFamily: "'Noto Sans Thai', 'Sarabun', sans-serif", lineHeight: 1.3 }}>
              {dept.label}
            </div>
            {dept.sublabel && (
              <div style={{ fontSize: 10, color: dept.active ? "#e879a0" : "#9ca3af", fontWeight: 500 }}>{dept.sublabel}</div>
            )}
          </div>
        </button>
      ))}
    </aside>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
      <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 16 }}>🔍</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ค้นหาชื่อเจ้าหน้าที่หรือรหัสเครื่องมือ..."
          style={{ width: "100%", padding: "9px 16px 9px 38px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 13, outline: "none", fontFamily: "'Noto Sans Thai', 'Sarabun', sans-serif", color: "#374151", background: "#fff", boxSizing: "border-box" }}
          onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />
      </div>
      <div style={{ background: "#fce7f3", border: "1px solid #fbb6ce", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 600, color: "#be185d" }}>
        ทั้งหมด {staffData.length} คน · {staffData.reduce((s, d) => s + d.equipment.length, 0)} รายการ
      </div>
    </div>
  );
}

// ---- Main Component ----
function MedicalEquipmentPage() {
  const [search, setSearch] = useState("");
  const filtered = staffData.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.equipment.some((e) => e.label.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ fontFamily: "'Noto Sans Thai', 'Sarabun', sans-serif", background: "#fafafa", minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <span>งานการพยาบาลรังสีวิทยา</span><span>›</span><span>รังสีร่วมรักษา</span><span>›</span>
            <span style={{ color: "#be185d", fontWeight: 600 }}>เครื่องมือแพทย์แยกตามรายบุคคล</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e1b4b" }}>เครื่องมือแพทย์แยกตามรายบุคคล</h1>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>ฝ่ายรังสีร่วมรักษา (Intervention) · โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ</p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <button style={{ background: "linear-gradient(135deg, #e879a0, #be185d)", border: "none", borderRadius: 10, padding: "9px 20px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                ➕ เพิ่มเครื่องมือ
              </button>
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: "linear-gradient(90deg, #fbb6ce, transparent)", marginBottom: 24 }} />
        <SearchBar value={search} onChange={setSearch} />
        {filtered.length === 0
          ? <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontSize: 14 }}>ไม่พบข้อมูลที่ค้นหา</div>
          : filtered.map((staff) => <StaffSection key={staff.name} staff={staff} />)
        }
      </main>
    </div>
  );
}