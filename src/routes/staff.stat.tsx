"use client";

import { useEffect, useState } from "react";

export default function StatisticsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Noto+Serif+Thai:wght@600;700&display=swap");

        :root {
          --rose: #be185d;
          --rose-h: #9d174d;
          --rose-light: #f43f8a;
          --rose-pale: #fdf2f8;
          --rose-50: #fff0f8;
          --rose-100: #fce7f3;
          --rose-200: #fbcfe8;

          --navy: #0f172a;

          --gray-50: #f8fafc;
          --gray-100: #f1f5f9;
          --gray-200: #e2e8f0;
          --gray-400: #94a3b8;
          --gray-500: #64748b;
          --gray-900: #0f172a;

          --ir-color: #be185d;
          --ir-pale: #fdf2f8;

          --nm-color: #0369a1;
          --nm-pale: #f0f9ff;

          --rt-color: #7c3aed;
          --rt-pale: #faf5ff;
          --rt-border: #ddd6fe;

          --shadow-sm: 0 1px 6px rgba(0, 0, 0, 0.06);
          --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.07);

          --r: 12px;
          --r-lg: 20px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Noto Sans Thai", sans-serif;
          background: white;
          color: var(--gray-900);
        }

        .hero {
          background: linear-gradient(
            160deg,
            var(--rose-50) 0%,
            white 60%
          );
          padding: 56px 24px 48px;
        }

        .hero-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--rose-100);
          color: var(--rose);
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 16px;
        }

        .hero h1 {
          font-family: "Noto Serif Thai", serif;
          font-size: clamp(24px, 4vw, 38px);
          line-height: 1.3;
          margin-bottom: 12px;
        }

        .hero-desc {
          color: var(--gray-500);
          max-width: 520px;
        }

        .unit-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 28px;
        }

        .unit-pill {
          padding: 8px 16px;
          border-radius: 999px;
          background: white;
          border: 1px solid var(--gray-200);
          transition: 0.2s;
          cursor: pointer;
        }

        .main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }

        .stat-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--gray-200);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 40px;
        }

        .stat-bar-item {
          background: white;
          text-align: center;
          padding: 24px;
        }

        .sbi-num {
          font-size: 30px;
          font-weight: 700;
          color: var(--rose);
        }

        .sbi-label {
          font-size: 12px;
          color: var(--gray-400);
        }

        .stat-section {
          margin-bottom: 56px;
        }

        .sec-head {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .sec-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .icon-ir {
          background: var(--ir-pale);
        }

        .icon-nm {
          background: var(--nm-pale);
        }

        .icon-rt {
          background: var(--rt-pale);
        }

        .sec-title {
          font-size: 22px;
          font-weight: 700;
        }

        .sub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .sub-card {
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: var(--r);
          overflow: hidden;
          transition: 0.2s;
        }

        .sub-card-head {
          padding: 16px;
          border-bottom: 1px solid var(--gray-100);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sub-card-body {
          padding: 16px;
        }

        .item-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .note-card {
          background: var(--rose-50);
          border: 1px solid var(--rose-200);
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 18px;
        }

        .full-card {
          border: 1px solid var(--gray-200);
          border-radius: var(--r-lg);
          padding: 24px;
          background: white;
          box-shadow: var(--shadow-sm);
        }

        .site-footer {
          background: var(--navy);
          padding: 40px 24px;
          text-align: center;
          color: white;
        }

        @media (max-width: 768px) {
          .stat-bar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-tag">สำหรับเจ้าหน้าที่</div>

          <h1>
            สถิติผู้ป่วย
            <br />
            แต่ละหน่วยงาน
          </h1>

          <p className="hero-desc">
            ข้อมูลสถิติผู้รับบริการแยกตามหน่วยงาน
            พร้อมลิงก์สำหรับบันทึกและอัปเดตข้อมูลใหม่
          </p>

          <div className="unit-pills">
            <button
              className="unit-pill"
              onClick={() =>
                document
                  .getElementById("sec-ir")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              🫁 รังสีร่วมรักษา
            </button>

            <button
              className="unit-pill"
              onClick={() =>
                document
                  .getElementById("sec-nm")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              ☢️ เวชศาสตร์นิวเคลียร์
            </button>

            <button
              className="unit-pill"
              onClick={() =>
                document
                  .getElementById("sec-rt")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              🎯 รังสีรักษา
            </button>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="stat-bar">
          <div className="stat-bar-item">
            <div className="sbi-num">3</div>
            <div className="sbi-label">หน่วยงานที่บันทึกสถิติ</div>
          </div>

          <div className="stat-bar-item">
            <div className="sbi-num">12</div>
            <div className="sbi-label">ประเภทสถิติที่ติดตาม</div>
          </div>

          <div className="stat-bar-item">
            <div className="sbi-num">2560–</div>
            <div className="sbi-label">ข้อมูลตั้งแต่ปี</div>
          </div>
        </div>

        {/* IR */}
        <section className="stat-section" id="sec-ir">
          <div className="sec-head">
            <div className="sec-icon icon-ir">🫁</div>

            <div>
              <div className="sec-title">
                รังสีร่วมรักษา (Intervention)
              </div>
            </div>
          </div>

          <div className="sub-grid">
            {[
              "ข้อมูลผู้รับบริการที่ทำหัตถการห้อง DSA",
              "ข้อมูลผู้รับบริการที่ทำหัตถการห้อง Ultrasound",
              "การลงข้อมูลผู้รับบริการ Thrombectomy",
            ].map((title, i) => (
              <div className="sub-card" key={i}>
                <div className="sub-card-head">{title}</div>

                <div className="sub-card-body">
                  <ul className="item-list">
                    <li>จำนวนผู้รับบริการทั้งหมด</li>
                    <li>แยกประเภทหัตถการ</li>
                    <li>ภาวะแทรกซ้อนระหว่างหัตถการ</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NM */}
        <section className="stat-section" id="sec-nm">
          <div className="sec-head">
            <div className="sec-icon icon-nm">☢️</div>

            <div>
              <div className="sec-title">
                เวชศาสตร์นิวเคลียร์ (SPECT/CT)
              </div>
            </div>
          </div>

          <div className="sub-card">
            <div className="sub-card-head">สถิติผู้รับบริการ</div>

            <div className="sub-card-body">
              <ul className="item-list">
                <li>Bone Scan / Thyroid Scan</li>
                <li>PET/CT และ SPECT/CT</li>
                <li>Radioiodine Therapy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* RT */}
        <section className="stat-section" id="sec-rt">
          <div className="sec-head">
            <div className="sec-icon icon-rt">🎯</div>

            <div>
              <div className="sec-title">
                รังสีรักษาและมะเร็งวิทยา
              </div>
            </div>
          </div>

          <div className="note-card">
            ข้อมูลย้อนหลังปี 2560–2565 สามารถดูได้จากระบบย้อนหลัง
          </div>

          <div className="full-card">
            <ul className="item-list">
              <li>ผู้ป่วยที่ฉายแสงเสร็จครั้งสุดท้าย</li>
              <li>การปฏิเสธการรักษา</li>
              <li>ผู้ป่วยใส่แร่ครั้งแรก / ครั้งสุดท้าย</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        งานการพยาบาลรังสีวิทยา — โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ
      </footer>
    </>
  );
}