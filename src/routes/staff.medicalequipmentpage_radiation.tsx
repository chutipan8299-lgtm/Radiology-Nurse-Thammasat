"use client";

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export const Route = createFileRoute('/staff/medicalequipmentpage_radiation')({
  component: MedicalEquipmentPageRadiation,
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

interface EditModalProps {
  staff: StaffMember;
  onClose: () => void;
  onSave: (updated: StaffMember) => void;
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
  { label: "รังสีร่วมรักษา", sublabel: "Intervention", icon: "💉", route: "/staff/medicalequipmentpage" },
  { label: "เวชศาสตร์นิวเคลียร์", sublabel: "SPECT / CT", icon: "☢️", route: "/staff/medicalequipmentpage_spect" },
  { label: "รังสีรักษาและมะเร็งวิทยา", sublabel: "Radiation Therapy", icon: "🎯", route: "/staff/medicalequipmentpage_radiation", active: true },
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
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 999,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          borderRadius: 20,
          zIndex: 1000,
          width: "min(480px, 92vw)",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "20px 20px 24px",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#be185d" }}>แก้ไขข้อมูล</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            marginBottom: 16,
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ddd",
            boxSizing: "border-box",
            fontSize: 14,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {equipment.map((eq, idx) => (
            <div key={idx} style={{ display: "flex", gap: 8 }}>
              <input
                value={eq.label}
                onChange={(e) => handleEqChange(idx, e.target.value)}
                style={{
                  flex: 1,
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  fontSize: 14,
                }}
              />
              <button
                onClick={() => handleRemoveEq(idx)}
                style={{
                  border: "none",
                  background: "#fee2e2",
                  borderRadius: 8,
                  padding: "0 12px",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddEq}
          style={{
            marginTop: 14,
            border: "none",
            background: "#fce7f3",
            color: "#be185d",
            padding: "8px 14px",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          + เพิ่มรายการ
        </button>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              border: "1px solid #ddd",
              background: "#fff",
              padding: "8px 16px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            style={{
              border: "none",
              background: "linear-gradient(135deg, #e879a0, #be185d)",
              color: "#fff",
              padding: "8px 18px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            💾 บันทึก
          </button>
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
        border: "none",
        color,
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer",
        padding: "3px 6px",
        borderRadius: 6,
        textAlign: "left",
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
        padding: "12px 10px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        transition: "all 0.2s ease",
        // ให้ card ยืดหยุ่นแทน minWidth คงที่
        flex: "1 1 120px",
        maxWidth: 160,
        minWidth: 110,
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "4/3",
          borderRadius: 10,
          background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
        }}
      >
        🩺
      </div>

      <div
        style={{
          background: "#1e40af",
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          padding: "3px 8px",
          borderRadius: 6,
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
          wordBreak: "break-all",
        }}
      >
        {eq.label}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "100%",
        }}
      >
        <ActionLink label="แบบการตรวจสอบ" color="#e879a0" />
        <ActionLink label="รายงานตรวจสอบ" color="#f59e0b" />
      </div>
    </div>
  );
}

function StaffSection({
  staff,
  isAdmin,
  onEdit,
  onDelete,
}: {
  staff: StaffMember;
  isAdmin: boolean;
  onEdit: (staff: StaffMember) => void;
  onDelete: (name: string) => void;
}) {
  return (
    <div
      style={{
        marginBottom: 20,
        background: "#ffffff",
        borderRadius: 16,
        border: "1px solid #f3f4f6",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div
        style={{
          background: "linear-gradient(90deg, #fce7f3 0%, #fdf2f8 100%)",
          borderLeft: "4px solid #e879a0",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          rowGap: 6,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e879a0, #be185d)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {staff.name.slice(0, 1)}
        </div>

        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#be185d",
            flex: 1,
            minWidth: 0,
          }}
        >
          {staff.name}
        </span>

        <span
          style={{
            background: "#e879a020",
            color: "#be185d",
            fontSize: 11,
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 20,
            whiteSpace: "nowrap",
          }}
        >
          {staff.equipment.length} รายการ
        </span>

        {isAdmin && (
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => onEdit(staff)}
              style={{
                border: "1px solid #e879a0",
                background: "#fff",
                color: "#be185d",
                borderRadius: 8,
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              ✏️ แก้ไข
            </button>
            <button
              onClick={() => onDelete(staff.name)}
              style={{
                border: "1px solid #fca5a5",
                background: "#fff",
                color: "#dc2626",
                borderRadius: 8,
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              🗑 ลบ
            </button>
          </div>
        )}
      </div>

      {/* Equipment cards */}
      <div
        style={{
          padding: "14px 14px",
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {staff.equipment.map((eq) => (
          <EquipmentCard key={eq.id} eq={eq} />
        ))}
      </div>
    </div>
  );
}

// ---- Desktop Sidebar ----
function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside
      style={{
        width: 240,
        background: "#ffffff",
        borderRight: "1px solid #f3e8f0",
        minHeight: "100vh",
        padding: "20px 0",
        flexShrink: 0,
      }}
    >
      {sidebarDepts.map((dept) => (
        <button
          key={dept.label}
          onClick={() => navigate({ to: dept.route as any })}
          style={{
            background: dept.active
              ? "linear-gradient(90deg, #fce7f3, #fdf2f8)"
              : "transparent",
            border: "none",
            borderLeft: dept.active ? "3px solid #e879a0" : "3px solid transparent",
            width: "100%",
            padding: "12px 16px",
            textAlign: "left",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: dept.active ? 700 : 500,
            color: dept.active ? "#be185d" : "#374151",
          }}
        >
          <span style={{ marginRight: 8 }}>{dept.icon}</span>
          {dept.label}
          {dept.sublabel && (
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
              {dept.sublabel}
            </div>
          )}
        </button>
      ))}
    </aside>
  );
}

// ---- Mobile Bottom Nav ----
function BottomNav() {
  const navigate = useNavigate();
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff",
        borderTop: "1px solid #f3e8f0",
        display: "flex",
        zIndex: 100,
        boxShadow: "0 -2px 12px rgba(0,0,0,0.07)",
      }}
    >
      {sidebarDepts.map((dept) => (
        <button
          key={dept.label}
          onClick={() => navigate({ to: dept.route as any })}
          style={{
            flex: 1,
            background: dept.active ? "#fce7f3" : "transparent",
            border: "none",
            borderTop: dept.active ? "2px solid #e879a0" : "2px solid transparent",
            padding: "8px 4px 10px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <span style={{ fontSize: 18 }}>{dept.icon}</span>
          <span
            style={{
              fontSize: 9,
              fontWeight: dept.active ? 700 : 400,
              color: dept.active ? "#be185d" : "#9ca3af",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {dept.sublabel || dept.label.slice(0, 4)}
          </span>
        </button>
      ))}
    </nav>
  );
}

// ---- SearchBar ----
function SearchBar({
  value,
  onChange,
  totalStaff,
  totalEq,
  isMobile,
}: {
  value: string;
  onChange: (v: string) => void;
  totalStaff: number;
  totalEq: number;
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
        flexWrap: isMobile ? "wrap" : "nowrap",
      }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ค้นหาชื่อหรืออุปกรณ์..."
        style={{
          flex: 1,
          minWidth: 0,
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #ddd",
          fontSize: 14,
        }}
      />

      <div
        style={{
          background: "#fce7f3",
          border: "1px solid #fbb6ce",
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: 12,
          fontWeight: 600,
          color: "#be185d",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {totalStaff} คน · {totalEq} รายการ
      </div>
    </div>
  );
}

// ---- Main Component ----
function MedicalEquipmentPageRadiation() {
  const { isAdmin } = useAdminAuth();
  const isMobile = useIsMobile();

  const [search, setSearch] = useState("");
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaffData);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  const filtered = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.equipment.some((e) =>
        e.label.toLowerCase().includes(search.toLowerCase())
      )
  );

  const handleSave = (updated: StaffMember) => {
    setStaffList((prev) =>
      prev.map((s) => (s.name === editingStaff?.name ? updated : s))
    );
    setEditingStaff(null);
  };

  const handleDelete = (name: string) => {
    setStaffList((prev) => prev.filter((s) => s.name !== name));
  };

  const handleAddStaff = () => {
    const newStaff: StaffMember = { name: "เจ้าหน้าที่ใหม่", equipment: [] };
    setStaffList((prev) => [...prev, newStaff]);
    setEditingStaff(newStaff);
  };

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Thai', 'Sarabun', sans-serif",
        background: "#fafafa",
        minHeight: "100vh",
        display: "flex",
        // บนมือถือเพิ่ม padding ล่างให้ Bottom Nav
        paddingBottom: isMobile ? 70 : 0,
      }}
    >
      {/* Sidebar — แสดงเฉพาะ desktop */}
      {!isMobile && <Sidebar />}

      <main
        style={{
          flex: 1,
          padding: isMobile ? "16px 12px" : "28px 32px",
          minWidth: 0,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              gap: 12,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? 18 : 22,
                  fontWeight: 800,
                  color: "#1e1b4b",
                }}
              >
                เครื่องมือแพทย์แยกตามรายบุคคล
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>
                ฝ่ายรังสีรักษาและมะเร็งวิทยา
              </p>
            </div>

            {/* Action row */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {isAdmin && (
                <div
                  style={{
                    background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                    border: "1px solid #fbbf24",
                    borderRadius: 10,
                    padding: "7px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#92400e",
                    whiteSpace: "nowrap",
                  }}
                >
                  🔐 โหมดผู้ดูแลระบบ
                </div>
              )}

              <button
                onClick={isAdmin ? handleAddStaff : undefined}
                disabled={!isAdmin}
                style={{
                  background: isAdmin
                    ? "linear-gradient(135deg, #e879a0, #be185d)"
                    : "#e5e7eb",
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 16px",
                  color: isAdmin ? "#fff" : "#9ca3af",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: isAdmin ? "pointer" : "not-allowed",
                  whiteSpace: "nowrap",
                  flex: isMobile ? 1 : "none",
                }}
              >
                ➕ เพิ่มเครื่องมือ
              </button>
            </div>
          </div>
        </div>

        <SearchBar
          value={search}
          onChange={setSearch}
          totalStaff={staffList.length}
          totalEq={staffList.reduce((s, d) => s + d.equipment.length, 0)}
          isMobile={isMobile}
        />

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#9ca3af",
            }}
          >
            ไม่พบข้อมูลที่ค้นหา
          </div>
        ) : (
          filtered.map((staff) => (
            <StaffSection
              key={staff.name}
              staff={staff}
              isAdmin={isAdmin}
              onEdit={setEditingStaff}
              onDelete={handleDelete}
            />
          ))
        )}
      </main>

      {/* Bottom Nav — แสดงเฉพาะ mobile */}
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