import React from "react";
// import { useAuth } from "../auth/AuthContext";
import { useAuth } from "../contexts/AuthContexts";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const menuItems = [
  { name: "Biro Hukum", number: 1, path: "/biro-hukum" },
  { name: "Biro Keuangan", number: 2, path: "/biro-keuangan" },
  { name: "Biro OSDMA", number: 3, path: "/biro-osdma" },
  { name: "Biro Perencanaan", number: 4, path: "/biro-perencanaan" },
  { name: "Biro Umum", number: 5, path: "/biro-umum" },
  { name: "Biro Humas", number: 6, path: "/biro-humas" },
  { name: "PPSDM", number: 7, path: "/ppsdm" },
  { name: "Politeknik", number: 8, path: "/politeknik" },
  { name: "Rekapitulasi Dok SPP", number: 9, path: "/rekap-dokumen-spp" },
];

function MenuPage() {
  const { user, logout } = useAuth();

  return (
    <div>
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
          <Link to={data.path} style={{ textDecoration: "none" }}>
            <div style={{ width: "calc(95vw/5)", cursor: "pointer" }}>
              <div
                style={{
                  height: 100,
                  background: "#4CD4B0",
                  color: "#2bb490",
                  fontWeight: "900",
                  fontSize: 100,
                }}
              >
                {data.number}
              </div>
              <div style={{ background: "white", padding: 20 }}>
                {data.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
