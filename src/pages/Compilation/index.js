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

const columns = [
  { key: "no", label: "No" },
  { key: "satker", label: "Satker/Unit" },
  { key: "no-spp", label: "No. SPP" },
  { key: "tanggal-pengiriman", label: "Tanggal Pengiriman" },
  { key: "uraian-spp", label: "Uraian SPP" },
  { key: "dokumen", label: "Dokumen" },
  { key: "keterangan", label: "Keterangan" },
];

const allData = Array.from({ length: 20 }, (_, i) => ({
  no: i + 1,
  satker: `Biro Hukum`,
  "no-spp": `SPP-${1000 + i}`,
  "tanggal-pengiriman": `2025-05-${((i % 30) + 1).toString().padStart(2, "0")}`,
  "uraian-spp": `SPP-${1000 + i}`,
  dokumen: `Dokumen-${i + 1}.pdf`,
  keterangan: `Keterangan untuk item ${i + 1}`,
}));

function CompilationPage() {
  const [pdfFile, setPDFfile] = useState("/pdf-tester.pdf");
  const [page, setPage] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const rowsPerPage = 10;

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
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
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
