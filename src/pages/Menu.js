import React from "react";
import { useAuth } from "../contexts/AuthContexts";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const menuItems = [
  { name: "Biro Hukum", number: 1, path: "/satuan-kerja/biro-hukum" },
  { name: "Biro Keuangan", number: 2, path: "/satuan-kerja/biro-keuangan" },
  { name: "Biro OSDMA", number: 3, path: "/satuan-kerja/biro-osdma" },
  {
    name: "Biro Perencanaan",
    number: 4,
    path: "/satuan-kerja/biro-perencanaan",
  },
  { name: "Biro Umum", number: 5, path: "/satuan-kerja/biro-umum" },
  { name: "Biro Humas", number: 6, path: "/satuan-kerja/biro-humas" },
  { name: "PPSDM", number: 7, path: "/satuan-kerja/ppsdm" },
  { name: "Politeknik", number: 8, path: "/satuan-kerja/politeknik" },
  {
    name: "Rekapitulasi Dok SPP",
    number: 9,
    path: "/satuan-kerja/rekap-dokumen-spp",
  },
];

function MenuPage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "10px 1rem" }}>
      <Breadcrumbs items={[{ name: "Satuan Kerja", path: "/satuan-kerja" }]} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        {menuItems.map((data, index) => (
          <Link to={data.path} style={{ textDecoration: "none" }} key={index}>
            <div className="card">
              <div className="card-number">{data.number}</div>
              <div className="card-title">{data.name}</div>
            </div>
          </Link>
        ))}
      </div>

      <style>
        {`
          .card {
            width: calc(95vw / 5);
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border-radius: 6px;
            overflow: hidden;
          }

          .card:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
            font-weight: 600;
          }

          .card-number {
            height: 100px;
            background: #4CD4B0;
            color: #2bb490;
            font-weight: 900;
            font-size: 100px;
            display: flex;
            align-items: center;
          }

          .card-title {
            background: white;
            padding: 20px;
          }
        `}
      </style>
    </div>
  );
}

export default MenuPage;
