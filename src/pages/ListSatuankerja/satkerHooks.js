export const columns = [
  { key: "spp_number", label: "No. SPP" },
  { key: "created_at", label: "Tanggal Pengiriman", sortable: true },
  { key: "jenis_spp", label: "Jenis SPP", sortable: true },
  { key: "tahun", label: "Tahun", sortable: true },
  { key: "document", label: "Dokumen" },
  { key: "keteran", label: "Keterangan" },
  { key: "action", label: "Action" },
];

export function getCurrentSatuanKerja(menuList, pathname) {
  return menuList.find((item) => item.path === pathname) || null;
}
