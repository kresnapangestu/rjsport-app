export const columns = [
  { key: "spp_number", label: "No. SPP" },
  { key: "created_at", label: "Tanggal Pengiriman", sortable: true },
  { key: "jenis_spp", label: "Jenis SPP", sortable: true },
  { key: "tahun", label: "Tahun", sortable: true },
  { key: "document", label: "Dokumen" },
  { key: "keteran", label: "Keterangan" },
  { key: "action", label: "Action" },
];

export const allData = Array.from({ length: 20 }, (_, i) => ({
  no: i + 1,
  "no-spp": `SPP-${1000 + i}`,
  year: `2025`,
  "tanggal-pengiriman": `2025-05-${((i % 30) + 1).toString().padStart(2, "0")}`,
  jenisSpp: ["GUP", "TUP"][Math.floor(Math.random() * 2)],
  dokumen: `Dokumen-${i + 1}.pdf`,
  keterangan: `Keterangan untuk item ${i + 1}`,
}));

export const fetchPDFAsBlob = async (url) => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch PDF");

  const blob = await response.blob();
  return blob;
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // hasilnya data:[type];base64,[data]
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
