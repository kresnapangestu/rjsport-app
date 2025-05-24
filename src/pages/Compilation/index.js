import React, { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import TablePagination from "@/components/TablePagination";
import TableHeader from "@/components/TableHeader";
import TableCell from "@/components/TableCell";
import { TableBody } from "@/components/TableBody";
import Title from "@/components/Title";
import Paper from "@/components/Paper";
import Breadcrumbs from "@/components/Breadcrumbs";
import Modal from "@/components/Modal";
import CustomPDFViewer from "@/components/PDFViewer";
import Button from "@/components/Button";
import themeColors from "@/constants/color";
import Input from "@/components/Input";
import Select from "@/components/Select";
import DatePickerInput from "@/components/DatePickerInput";

const columns = [
  { key: "no", label: "No" },
  { key: "satker", label: "Satker/Unit" },
  { key: "no-spp", label: "No. SPP" },
  { key: "jenisSpp", label: "Jenis SPP" },
  { key: "tahun", label: "Tahun" },
  { key: "tanggal-pengiriman", label: "Tanggal Pengiriman" },
  { key: "uraian-spp", label: "Uraian SPP" },
  { key: "dokumen", label: "Dokumen" },
  { key: "keterangan", label: "Keterangan" },
];

const allData = Array.from({ length: 20 }, (_, i) => ({
  no: i + 1,
  satker: `Biro Hukum`,
  "no-spp": `SPP-${1000 + i}`,
  jenisSpp: `SPP-${1000 + i}`,
  tahun: `SPP-${202 + i}`,
  "tanggal-pengiriman": `2025-05-${((i % 30) + 1).toString().padStart(2, "0")}`,
  "uraian-spp": `SPP-${1000 + i}`,
  dokumen: `Dokumen-${i + 1}.pdf`,
  keterangan: `Keterangan untuk item ${i + 1}`,
}));

function CompilationPage() {
  const [page, setPage] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const rowsPerPage = 10;
  const [filter, setFilter] = useState({
    tahun: "",
    searchKey: "",
    startDate: "",
    endDate: "",
  });

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

  const paginatedData = allData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(allData.length / rowsPerPage);

  return (
    <div>
      <Breadcrumbs items={[{ name: "Kompilasi", path: "/compilation" }]} />
      <Title>Kompilasi</Title>
      <Paper
        elevation={3}
        // style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div
          style={{
            float: "left",
            display: "flex",
            gap: 10,
            marginBottom: "1rem",
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
                <TableCell align="center">{row?.["satker"]}</TableCell>
                <TableCell align="center">{row?.["tahun"]}</TableCell>
                <TableCell align="center">{row?.["jenisSpp"]}</TableCell>
                <TableCell align="center">{row?.["no-spp"]}</TableCell>
                <TableCell align="center">
                  {row?.["tanggal-pengiriman"]}
                </TableCell>
                <TableCell align="center">{row?.["uraian-spp"]}</TableCell>
                <TableCell
                  align="center"
                  onClick={() => setIsOpenModal(!isOpenModal)}
                  style={{
                    color: themeColors.primary.light,
                  }}
                >
                  <span style={{ cursor: "pointer" }}>{row.dokumen}</span>
                </TableCell>
                <TableCell align="center">{row.keterangan}</TableCell>
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
      <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)} title="">
        {/* <CustomPDFViewer pdfSource="/pdf-tester.pdf" /> */}
        <CustomPDFViewer pdfSource="http://localhost:3000/pdf-tester.pdf" />
        {/* <CustomPDFViewer pdfSource="https://drive.google.com/uc?export=download&id=1a3XHkey6ROiKEBxXV1sjnPeiTbRPZfyP" /> */}
      </Modal>
    </div>
  );
}

export default CompilationPage;
