import React, { useState } from "react";
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
import { Plus } from "lucide-react";
import FileInput from "@/components/FileInput";
import { validationSchema } from "@/services/GeneralHelper";
import { toast } from "react-toastify";

const columns = [
  { key: "no", label: "No" },
  { key: "no-spp", label: "No. SPP" },
  { key: "tanggal-pengiriman", label: "Tanggal Pengiriman" },
  { key: "dokumen", label: "Dokumen" },
  { key: "keterangan", label: "Keterangan" },
  { key: "action", label: "Action" },
];

const allData = Array.from({ length: 20 }, (_, i) => ({
  no: i + 1,
  "no-spp": `SPP-${1000 + i}`,
  "tanggal-pengiriman": `2025-05-${((i % 30) + 1).toString().padStart(2, "0")}`,
  dokumen: `Dokumen-${i + 1}.pdf`,
  keterangan: `Keterangan untuk item ${i + 1}`,
}));

function BiroHukumPage() {
  const [page, setPage] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const rowsPerPage = 10;
  const [formData, setFormData] = useState({
    noSpp: "",
    tahun: "",
    jenisSpp: "",
    dokumen: null,
    keterangan: "",
  });

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
        !formData.noSpp ||
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
        noSpp: "",
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
  const paginatedData = allData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(allData.length / rowsPerPage);

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Satuan Kerja", path: "/satuan-kerja" },
          { name: "Biro Hukum", path: "/biro-hukum" },
        ]}
      />
      <Title>Biro Hukum</Title>
      <Paper
        elevation={3}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Button
          onClick={() => setIsOpenModal(true)}
          style={{ width: "fit-content" }}
          variant="danger"
          icon={<Plus size={20} />}
        >
          Tambah Arsip
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader>
            <TableRow>
              {columns.map((data) => (
                <TableCell
                  component="th"
                  scope="col"
                  align="center"
                  key={data.key}
                >
                  {data.label}
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
                <TableCell align="center">{row.dokumen}</TableCell>
                <TableCell align="center">{row.keterangan}</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Paper>
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="Form Pengarsipan"
      >
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Input
            label="No. SPP"
            name="noSpp"
            value={formData.noSpp}
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
              { label: "UP", value: "UP" },
              { label: "GU", value: "GU" },
              { label: "TU", value: "TU" },
            ]}
          />
          <FileInput
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
    </div>
  );
}

export default BiroHukumPage;
