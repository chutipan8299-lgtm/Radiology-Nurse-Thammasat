"use client";

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

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
const initialStaffData: StaffMember[] = [
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
  { label: "รังสีวินิจฉัย", sublabel: "Diagnostic Radiology", icon: "🩺", route: "/staff/medicalequipmentpage_screening" },
];

// ---- Hook: detect mobile ----
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ---- Edit Modal ----
interface EditModalProps {
  staff: StaffMember;
  onClose: () => void;
  onSave: (updated: StaffMember) => void;
}

function EditModal({ staff, onClose, onSave }: EditModalProps) {
  const [name, setName] = useState(staff.name);
  const [equipment, setEquipment] = useState<Equipment[]>(
    staff.equipment.map((e) => ({ ...e }))
  );

  const handleEqChange = (idx: number, value: string) => {
    setEquipment((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, id: value, label: value } : e))
    );
  };

  const handleAddEq = () => {
    const newId = `NEW-${Date.now()}`;
    setEquipment((prev) => [...prev, { id: newId, label: newId }]);
  };

  const handleRemoveEq = (idx: number) => {
    setEquipment((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), equipment });
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(3px)",
          zIndex: 999,
        }}
      />
      <div
        style={{
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff", borderRadius: 20, zIndex: 1000,
          width: "min(480px, 92vw)", maxHeight: "85vh",
          display: "flex", flexDirection: "column",
          boxShadow: "0 24px 64px rgba(190,24,93,0.18), 0 4px 16px rgba(0,0,0,0.10)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #be185d, #e879a0)",
          padding: "16px 20px", display: "flex", alignItems: "center", gap: 12,
          flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>✏️</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>แก้ไขข้อมูลเจ้าหน้าที่</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 2 }}>
              แก้ไขชื่อและรายการเครื่องมือแพทย์
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.15)", border: "none",
              borderRadius: 8, width: 30, height: 30, cursor: "pointer",
              color: "#fff", fontSize: 16, display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 20px", overflowY: "auto", flex: 1 }}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#be185d", marginBottom: 6 }}>
              ชื่อเจ้าหน้าที่
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%", padding: "9px 14px",
                border: "1.5px solid #fbb6ce", borderRadius: 10,
                fontSize: 14, outline: "none", color: "#1e1b4b",
                boxSizing: "border-box", background: "#fff5f8",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#be185d")}
              onBlur={(e) => (e.target.style.borderColor = "#fbb6ce")}
            />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#be185d" }}>
                รายการเครื่องมือแพทย์
              </label>
              <button
                onClick={handleAddEq}
                style={{
                  marginLeft: "auto",
                  background: "linear-gradient(135deg, #e879a0, #be185d)",
                  border: "none", borderRadius: 8, padding: "5px 12px",
                  color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer",
                }}
              >+ เพิ่มรายการ</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {equipment.map((eq, idx) => (
                <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, background: "#fce7f3",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: "#be185d", flexShrink: 0,
                  }}>{idx + 1}</div>
                  <input
                    value={eq.label}
                    onChange={(e) => handleEqChange(idx, e.target.value)}
                    style={{
                      flex: 1, minWidth: 0, padding: "7px 12px",
                      border: "1.5px solid #e5e7eb", borderRadius: 8,
                      fontSize: 13, outline: "none", color: "#374151", background: "#fafafa",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                  <button
                    onClick={() => handleRemoveEq(idx)}
                    style={{
                      width: 28, height: 28, borderRadius: 8, background: "#fee2e2",
                      border: "none", cursor: "pointer", color: "#dc2626",
                      fontSize: 14, display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0,
                    }}
                  >🗑</button>
                </div>
              ))}
              {equipment.length === 0 && (
                <div style={{ textAlign: "center", padding: "20px", color: "#9ca3af", fontSize: 13 }}>
                  ยังไม่มีรายการเครื่องมือ
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 20px", borderTop: "1px solid #f3f4f6",
          display: "flex", gap: 10, justifyContent: "flex-end",
          background: "#fafafa", flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              background: "#fff", border: "1.5px solid #e5e7eb",
              borderRadius: 10, padding: "8px 20px",
              fontSize: 13, fontWeight: 600, color: "#6b7280", cursor: "pointer",
            }}
          >ยกเลิก</button>
          <button
            onClick={handleSave}
            style={{
              background: "linear-gradient(135deg, #e879a0, #be185d)",
              border: "none", borderRadius: 10, padding: "8px 24px",
              fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(190,24,93,0.25)",
            }}
          >💾 บันทึก</button>
        </div>
      </div>
    </>
  );
}

// ---- Sub-components ----
function ActionLink({ label, color }: { label: string; color: string }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? color + "15" : "transparent",
        border: "none", color, fontSize: 11, fontWeight: 600,
        cursor: "pointer", padding: "3px 6px", borderRadius: 6,
        textAlign: "left", textDecoration: h ? "underline" : "none",
        transition: "all 0.15s",
      }}
    >🔗 {label}</button>
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
        borderRadius: 16, padding: "12px 10px 10px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        cursor: "pointer", transition: "all 0.2s ease",
        boxShadow: hovered ? "0 4px 20px rgba(232,121,160,0.18)" : "0 1px 4px rgba(0,0,0,0.06)",
        // responsive card sizing
        flex: "1 1 110px",
        maxWidth: 160,
        minWidth: 100,
      }}
    >
      <div style={{
        width: "100%", aspectRatio: "4/3", borderRadius: 10,
        background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#dbeafe" />
          <path d="M12 28V16l8-4 8 4v12" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="16" y="20" width="8" height="8" rx="1" fill="#93c5fd" />
          <circle cx="20" cy="14" r="2" fill="#60a5fa" />
        </svg>
      </div>
      <div style={{
        background: "#1e40af", color: "#fff", fontSize: 11, fontWeight: 700,
        padding: "3px 8px", borderRadius: 6, textAlign: "center",
        width: "100%", boxSizing: "border-box", wordBreak: "break-all",
      }}>{eq.label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
        <ActionLink label="แบบการตรวจสอบ" color="#e879a0" />
        <ActionLink label="รายงานตรวจสอบ" color="#f59e0b" />
      </div>
    </div>
  );
}

interface StaffSectionProps {
  staff: StaffMember;
  isAdmin: boolean;
  onEdit: (staff: StaffMember) => void;
  onDelete: (name: string) => void;
}

function StaffSection({ staff, isAdmin, onEdit, onDelete }: StaffSectionProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div style={{
      marginBottom: 20, background: "#ffffff",
      borderRadius: 16, border: "1px solid #f3f4f6",
      overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
    }}>
      {/* Header row — wraps on mobile */}
      <div style={{
        background: "linear-gradient(90deg, #fce7f3 0%, #fdf2f8 100%)",
        borderLeft: "4px solid #e879a0",
        padding: "10px 14px",
        display: "flex", alignItems: "center",
        gap: 8, flexWrap: "wrap", rowGap: 6,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: "linear-gradient(135deg, #e879a0, #be185d)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>{staff.name.slice(0, 1)}</div>

        <span style={{
          fontSize: 14, fontWeight: 700, color: "#be185d",
          flex: 1, minWidth: 0,
        }}>{staff.name}</span>

        <span style={{
          background: "#e879a020", color: "#be185d",
          fontSize: 11, fontWeight: 600, padding: "2px 8px",
          borderRadius: 20, border: "1px solid #fbb6ce",
          whiteSpace: "nowrap", flexShrink: 0,
        }}>{staff.equipment.length} รายการ</span>

        {isAdmin && (
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button
              onClick={() => onEdit(staff)}
              style={{
                background: "#fff", border: "1.5px solid #e879a0",
                borderRadius: 8, padding: "4px 10px",
                fontSize: 11, fontWeight: 700, color: "#be185d",
                cursor: "pointer", whiteSpace: "nowrap",
              }}
            >✏️ แก้ไข</button>

            {confirmDelete ? (
              <>
                <button
                  onClick={() => onDelete(staff.name)}
                  style={{
                    background: "#dc2626", border: "none", borderRadius: 8,
                    padding: "4px 10px", fontSize: 11, fontWeight: 700,
                    color: "#fff", cursor: "pointer", whiteSpace: "nowrap",
                  }}
                >ยืนยันลบ</button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  style={{
                    background: "#f3f4f6", border: "none", borderRadius: 8,
                    padding: "4px 10px", fontSize: 11, fontWeight: 700,
                    color: "#6b7280", cursor: "pointer", whiteSpace: "nowrap",
                  }}
                >ยกเลิก</button>
              </>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                style={{
                  background: "#fff", border: "1.5px solid #fca5a5",
                  borderRadius: 8, padding: "4px 10px",
                  fontSize: 11, fontWeight: 700, color: "#dc2626",
                  cursor: "pointer", whiteSpace: "nowrap",
                }}
              >🗑 ลบ</button>
            )}
          </div>
        )}
      </div>

      {/* Equipment cards */}
      <div style={{ padding: "14px", display: "flex", flexWrap: "wrap", gap: 10 }}>
        {staff.equipment.map((eq) => <EquipmentCard key={eq.id} eq={eq} />)}
      </div>
    </div>
  );
}

// ---- Desktop Sidebar ----
function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside style={{
      width: 240, flexShrink: 0, background: "#ffffff",
      borderRight: "1px solid #f3e8f0", display: "flex",
      flexDirection: "column", padding: "20px 0",
      minHeight: "100vh",
      boxShadow: "2px 0 12px rgba(232,121,160,0.07)",
    }}>
      <div style={{ padding: "0 16px 20px" }}>
        <div style={{
          background: "linear-gradient(135deg, #e879a0, #be185d)",
          borderRadius: 14, padding: "14px 16px", color: "#fff",
        }}>
          <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.3 }}>Radiology Nursing</div>
          <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>Care · Guidance · Trust</div>
        </div>
      </div>
      <div style={{ padding: "0 16px 10px", fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: 1.2, textTransform: "uppercase" }}>
        งานการพยาบาล
      </div>
      {sidebarDepts.map((dept) => (
        <button
          key={dept.label}
          onClick={() => navigate({ to: dept.route as any })}
          style={{
            background: dept.active ? "linear-gradient(90deg, #fce7f3, #fdf2f8)" : "transparent",
            border: "none", borderLeft: dept.active ? "3px solid #e879a0" : "3px solid transparent",
            padding: "10px 16px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10,
            textAlign: "left", transition: "all 0.15s", marginBottom: 2, width: "100%",
          }}
        >
          <span style={{ fontSize: 18 }}>{dept.icon}</span>
          <div>
            <div style={{
              fontSize: 13, fontWeight: dept.active ? 700 : 500,
              color: dept.active ? "#be185d" : "#374151", lineHeight: 1.3,
            }}>{dept.label}</div>
            {dept.sublabel && (
              <div style={{ fontSize: 10, color: dept.active ? "#e879a0" : "#9ca3af", fontWeight: 500 }}>
                {dept.sublabel}
              </div>
            )}
          </div>
        </button>
      ))}
    </aside>
  );
}

// ---- Mobile Bottom Nav ----
function BottomNav() {
  const navigate = useNavigate();
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#fff", borderTop: "1px solid #f3e8f0",
      display: "flex", zIndex: 100,
      boxShadow: "0 -2px 12px rgba(0,0,0,0.07)",
    }}>
      {sidebarDepts.map((dept) => (
        <button
          key={dept.label}
          onClick={() => navigate({ to: dept.route as any })}
          style={{
            flex: 1, background: dept.active ? "#fce7f3" : "transparent",
            border: "none", borderTop: dept.active ? "2px solid #e879a0" : "2px solid transparent",
            padding: "8px 4px 10px", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          }}
        >
          <span style={{ fontSize: 18 }}>{dept.icon}</span>
          <span style={{
            fontSize: 9, fontWeight: dept.active ? 700 : 400,
            color: dept.active ? "#be185d" : "#9ca3af",
            textAlign: "center", lineHeight: 1.2,
          }}>{dept.sublabel || dept.label.slice(0, 4)}</span>
        </button>
      ))}
    </nav>
  );
}

// ---- SearchBar ----
function SearchBar({
  value, onChange, totalStaff, totalEq, isMobile,
}: {
  value: string; onChange: (v: string) => void;
  totalStaff: number; totalEq: number; isMobile: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: isMobile ? "wrap" : "nowrap" }}>
      <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 15 }}>🔍</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ค้นหาชื่อเจ้าหน้าที่หรือรหัสเครื่องมือ..."
          style={{
            width: "100%", padding: "9px 14px 9px 36px",
            border: "1.5px solid #e5e7eb", borderRadius: 10,
            fontSize: 13, outline: "none", color: "#374151",
            background: "#fff", boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />
      </div>
      <div style={{
        background: "#fce7f3", border: "1px solid #fbb6ce",
        borderRadius: 10, padding: "8px 12px",
        fontSize: 12, fontWeight: 600, color: "#be185d",
        whiteSpace: "nowrap", flexShrink: 0,
      }}>
        {totalStaff} คน · {totalEq} รายการ
      </div>
    </div>
  );
}

// ---- Main Component ----
function MedicalEquipmentPage() {
  const { isAdmin } = useAdminAuth();
  const isMobile = useIsMobile();

  const [staffData, setStaffData] = useState<StaffMember[]>(initialStaffData);
  const [search, setSearch] = useState("");
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  const filtered = staffData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.equipment.some((e) => e.label.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (updated: StaffMember) => {
    setStaffData((prev) =>
      prev.map((s) => (s.name === editingStaff?.name ? updated : s))
    );
    setEditingStaff(null);
  };

  const handleDelete = (name: string) => {
    setStaffData((prev) => prev.filter((s) => s.name !== name));
  };

  const handleAddStaff = () => {
    const newStaff: StaffMember = { name: "เจ้าหน้าที่ใหม่", equipment: [] };
    setStaffData((prev) => [...prev, newStaff]);
    setEditingStaff(newStaff);
  };

  return (
    <div style={{
      fontFamily: "'Noto Sans Thai', 'Sarabun', sans-serif",
      background: "#fafafa", minHeight: "100vh", display: "flex",
      paddingBottom: isMobile ? 70 : 0,
    }}>
      {!isMobile && <Sidebar />}

      <main style={{ flex: 1, padding: isMobile ? "16px 12px" : "28px 32px", overflowY: "auto", minWidth: 0 }}>

        {/* Breadcrumb — hide on mobile to save space */}
        {!isMobile && (
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <span>งานการพยาบาลรังสีวิทยา</span><span>›</span>
            <span>รังสีร่วมรักษา</span><span>›</span>
            <span style={{ color: "#be185d", fontWeight: 600 }}>เครื่องมือแพทย์แยกตามรายบุคคล</span>
          </div>
        )}

        {/* Page Header */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            display: "flex", gap: 12,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
          }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: 0, fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#1e1b4b" }}>
                เครื่องมือแพทย์แยกตามรายบุคคล
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>
                ฝ่ายรังสีร่วมรักษา (Intervention) · โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ
              </p>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", width: isMobile ? "100%" : "auto" }}>
              {isAdmin && (
                <div style={{
                  background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                  border: "1px solid #fbbf24", borderRadius: 10,
                  padding: "7px 12px", fontSize: 12, fontWeight: 700,
                  color: "#92400e", whiteSpace: "nowrap",
                }}>🔐 โหมดผู้ดูแลระบบ</div>
              )}
              <button
                onClick={isAdmin ? handleAddStaff : undefined}
                disabled={!isAdmin}
                style={{
                  background: isAdmin ? "linear-gradient(135deg, #e879a0, #be185d)" : "#e5e7eb",
                  border: "none", borderRadius: 10, padding: "8px 16px",
                  color: isAdmin ? "#fff" : "#9ca3af",
                  fontSize: 13, fontWeight: 700,
                  cursor: isAdmin ? "pointer" : "not-allowed",
                  whiteSpace: "nowrap", flex: isMobile ? 1 : "none",
                }}
              >➕ เพิ่มเครื่องมือ</button>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, #fbb6ce, transparent)", marginBottom: 18 }} />

        <SearchBar
          value={search}
          onChange={setSearch}
          totalStaff={staffData.length}
          totalEq={staffData.reduce((s, d) => s + d.equipment.length, 0)}
          isMobile={isMobile}
        />

        {filtered.length === 0
          ? <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontSize: 14 }}>
              ไม่พบข้อมูลที่ค้นหา
            </div>
          : filtered.map((staff) => (
            <StaffSection
              key={staff.name}
              staff={staff}
              isAdmin={isAdmin}
              onEdit={setEditingStaff}
              onDelete={handleDelete}
            />
          ))
        }
      </main>

      {isMobile && <BottomNav />}

      {editingStaff && (
        <EditModal
          staff={editingStaff}
          onClose={() => setEditingStaff(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}