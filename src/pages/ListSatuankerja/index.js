import React, { useMemo, useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import TablePagination from "@/components/TablePagination";
import TableHeader from "@/components/TableHeader";
import TableCell from "@/components/TableCell";
import { TableBody } from "@/components/TableBody";
import Title from "@/components/Title";
import Paper from "@/components/Paper";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Input from "@/components/Input";
import Textarea from "@/components/TextArea";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Plus, Settings } from "lucide-react";
import FileInput from "@/components/FileInput";
import { validationSchema } from "@/services/GeneralHelper";
import { toast } from "react-toastify";
import DatePickerInput from "@/components/DatePickerInput";
import CustomPDFViewer from "@/components/PDFViewer";
import themeColors from "@/constants/color";
import TableSortLabel from "@/components/TableSortLabel";

const columns = [
  { key: "no", label: "No" },
  { key: "no-spp", label: "No. SPP" },
  { key: "tanggal-pengiriman", label: "Tanggal Pengiriman", sortable: true },
  { key: "jenisSpp", label: "Jenis SPP", sortable: true },
  { key: "tahun", label: "Tahun", sortable: true },
  { key: "dokumen", label: "Dokumen" },
  { key: "keterangan", label: "Keterangan" },
  { key: "action", label: "Action" },
];

const allData = Array.from({ length: 20 }, (_, i) => ({
  no: i + 1,
  "no-spp": `SPP-${1000 + i}`,
  tahun: `2025`,
  "tanggal-pengiriman": `2025-05-${((i % 30) + 1).toString().padStart(2, "0")}`,
  jenisSpp: ["GUP", "TUP"][Math.floor(Math.random() * 2)],
  dokumen: `Dokumen-${i + 1}.pdf`,
  keterangan: `Keterangan untuk item ${i + 1}`,
}));

function ListSatuanKerjaPage() {
  const [filter, setFilter] = useState({
    tahun: "",
    searchKey: "",
    startDate: "",
    endDate: "",
  });
  const [isOpenPDF, setIsOpenPDF] = useState(false);
  const [variantModal, setVariantModal] = useState("");
  const [sortBy, setSortBy] = useState(null); // e.g., "name"
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    "no-spp": "",
    tahun: "",
    jenisSpp: "",
    dokumen: null,
    keterangan: "",
  });

  const sortedRows = [...allData].sort((a, b) => {
    if (!sortBy) return 0;
    if (a[sortBy] < b[sortBy]) return sortDir === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const handleSortChange = (key) => {
    if (sortBy === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    }
  };

  const handleDateChange = (key, value) => {
    setFilter((prev) => {
      const newFilter = { ...prev, [key]: value };

      // Optional auto-correction: clear endDate if it's before startDate
      if (
        key === "startDate" &&
        newFilter.endDate &&
        value > newFilter.endDate
      ) {
        newFilter.endDate = null;
      }

      return newFilter;
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(name, value, files);
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitted:", formData);

      if (
        !formData?.["no-spp"] ||
        !formData.tahun ||
        !formData.jenisSpp ||
        !formData.dokumen ||
        !formData.keterangan
      ) {
        toast.error("Mohon lengkapi semua field yang diperlukan.");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Data berhasil disimpan!");
      setIsOpenModal(false);
      setFormData({
        "no-spp": "",
        tahun: "",
        jenisSpp: "",
        dokumen: null,
        keterangan: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan data. Silakan coba lagi.");
    }
  };
  const paginatedData = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(allData.length / rowsPerPage);

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Satuan Kerja", path: "/satuan-kerja" },
          { name: "Biro Hukum", path: "/satuan-kerja/biro-hukum" },
        ]}
      />
      <Title>Biro Hukum</Title>
      <Paper
        elevation={3}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => {
              setIsOpenModal(true);
              setVariantModal("Add");
            }}
            style={{ width: "fit-content" }}
            variant="danger"
            icon={<Plus size={20} />}
          >
            Tambah Arsip
          </Button>
          <div
            style={{
              width: "calc(100vw/2.5)",
              display: "flex",
              gap: 10,
            }}
          >
            <Input
              label="Search"
              style={{ width: "200px" }}
              name="Search"
              value={filter.searchKey}
              onChange={(e) => handleDateChange("searchKey", e.target.value)}
            />
            <Select
              label="Tahun"
              name="Tahun"
              noPlaceholder
              style={{ width: "200px" }}
              value={filter.tahun}
              onChange={(e) => handleDateChange("tahun", e.target.value)}
              options={[
                { label: "2020", value: "2020" },
                { label: "2021", value: "2021" },
                { label: "2022", value: "2022" },
                { label: "2024", value: "2024" },
                { label: "2025", value: "2025" },
              ]}
            />
            <DatePickerInput
              label="Start Date"
              selected={filter.startDate}
              onChange={(date) => handleDateChange("startDate", date)}
              selectsStart
              startDate={filter.startDate}
              endDate={filter.endDate}
            />
            <DatePickerInput
              label="End Date"
              selected={filter.endDate}
              onChange={(date) => handleDateChange("endDate", date)}
              selectsEnd
              startDate={filter.startDate}
              endDate={filter.endDate}
              minDate={filter.startDate}
            />
          </div>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  component="th"
                  scope="col"
                  align="center"
                  onClick={() => col.sortable && handleSortChange(col.key)}
                  style={{ cursor: col.sortable ? "pointer" : "default" }}
                >
                  {col.sortable ? (
                    <TableSortLabel
                      active={sortBy === col.key}
                      direction={sortDir}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.no}
                sx={{
                  "&:last-child td, &:last-child th": { borderBottom: "none" },
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.no}
                </TableCell>
                <TableCell align="center">{row?.["no-spp"]}</TableCell>
                <TableCell align="center">
                  {row?.["tanggal-pengiriman"]}
                </TableCell>
                <TableCell align="center">{row.jenisSpp}</TableCell>
                <TableCell align="center">{row.tahun}</TableCell>
                <TableCell
                  align="center"
                  onClick={() => setIsOpenPDF(true)}
                  style={{
                    color: themeColors.primary.light,
                    cursor: "pointer",
                  }}
                >
                  {row.dokumen}
                </TableCell>
                <TableCell align="center">{row.keterangan}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      setVariantModal("Edit");
                      setFormData(row);
                      setIsOpenModal(true);
                    }}
                    style={{ width: "fit-content" }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setPage(0); // reset to first page when rows per page changes
          }}
        />
      </Paper>
      <Modal
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setVariantModal("");
          setFormData({
            "no-spp": "",
            tahun: "",
            jenisSpp: "",
            dokumen: null,
            keterangan: "",
          });
        }}
        title="Form Pengarsipan"
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Input
            label="No. SPP"
            name="no-spp"
            value={formData?.["no-spp"]}
            onChange={handleChange}
            validate={validationSchema.onlyNumber}
            required
            placeholder="Masukkan nomor SPP"
          />
          <Input
            label="Tahun"
            name="tahun"
            value={formData.tahun}
            onChange={handleChange}
            validate={validationSchema.year}
            required
            placeholder="Masukkan tahun"
          />
          <Select
            label="Jenis SPP"
            name="jenisSpp"
            value={formData.jenisSpp}
            onChange={handleChange}
            required
            options={[
              { label: "GUP", value: "GUP" },
              { label: "TUP", value: "TUP" },
            ]}
          />
          <FileInput
            accept=".pdf"
            label="Dokumen"
            name="dokumen"
            onChange={handleChange}
            required
          />
          <Textarea
            label="Keterangan"
            name="keterangan"
            value={formData.keterangan}
            required
            onChange={handleChange}
            placeholder="Masukkan keterangan tambahan"
            rows={5}
          />
          <Button type="submit" style={{ float: "right" }}>
            Submit
          </Button>
        </form>
      </Modal>
      <Modal open={isOpenPDF} onClose={() => setIsOpenPDF(false)} title="">
        {/* <CustomPDFViewer pdfSource="/pdf-tester.pdf" /> */}
        <CustomPDFViewer pdfSource="http://localhost:3000/pdf-tester.pdf" />
        {/* <CustomPDFViewer pdfSource="https://drive.google.com/uc?export=download&id=1a3XHkey6ROiKEBxXV1sjnPeiTbRPZfyP" /> */}
      </Modal>
    </div>
  );
}

export default ListSatuanKerjaPage;
