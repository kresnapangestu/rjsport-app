import React, { useContext, useEffect, useMemo, useState } from "react";
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
import {
  buildQueryString,
  formatUrlPathToTitle,
  validationSchema,
} from "@/services/GeneralHelper";
import { toast } from "react-toastify";
import DatePickerInput from "@/components/DatePickerInput";
import CustomPDFViewer from "@/components/PDFViewer";
import themeColors from "@/constants/color";
import TableSortLabel from "@/components/TableSortLabel";
import { AppContext } from "@/contexts/AppContext";
import { apiRequest } from "@/services/APIHelper";
import { useLocation } from "react-router-dom";
import moment from "moment";
import {
  allData,
  columns,
  fetchPDFAsBlob,
  fileToBase64,
} from "@/pages/ListSatuankerja/satkerHooks";

function ListSatuanKerjaPage() {
  const { menuName, userData } = useContext(AppContext);
  const location = useLocation();
  const menuTitle = formatUrlPathToTitle(location.pathname);
  const [filter, setFilter] = useState({
    tahun: "",
    searchKey: "",
    startDate: null,
    endDate: null,
  });
  const [isOpenPDF, setIsOpenPDF] = useState(false);
  const [variantModal, setVariantModal] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    no_spp: "",
    tahun: "",
    type: "",
    dokumen: null,
    keterangan: "",
  });
  const [dataTable, setDataTable] = useState([]);
  const [pdfToOpen, setPDFtoOpen] = useState("");

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
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const fetchTable = async () => {
    try {
      const query = buildQueryString({
        biro_code: userData.code,
        tahun: filter.tahun,
        search_key: filter.searchKey,
        page: page + 1,
        per_page: rowsPerPage,
        sort_by: sortBy,
        sort_dir: sortDir,
        start_date: filter.startDate
          ? moment(filter.startDate).format("YYYY-MM-DD").toString()
          : "",
        end_date: filter.endDate
          ? moment(filter.endDate).format("YYYY-MM-DD").toString()
          : "",
      });
      const data = await apiRequest(`/api/archive/list?${query}`);
      let result = data.data;
      if (data.success) {
        setTotalPages(result?.last_page);
        setDataTable(result?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitData = async (formData) => {
    try {
      const base64Dokumen = await fileToBase64(formData.dokumen);
      const payload = {
        no_spp: formData?.no_spp,
        jenis_spp: formData?.type,
        tahun: formData?.tahun,
        keterangan: formData?.keterangan,
        kode_biro: userData?.biro_code,
        dokumen: base64Dokumen,
      };
      const result = await apiRequest("/api/archive/create", "POST", {
        body: payload,
      });
      console.log("formDatass", result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTable();
  }, [
    filter.tahun,
    filter.searchKey,
    page + 1,
    rowsPerPage,
    sortBy,
    sortDir,
    filter.startDate,
    filter.endDate,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !formData?.["no_spp"] ||
        !formData.tahun ||
        !formData.type ||
        !formData.dokumen ||
        !formData.keterangan
      ) {
        toast.error("Mohon lengkapi semua field yang diperlukan.");
        return;
      }

      submitData(formData);
      console.log("Submitted:", formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Data berhasil disimpan!");
      setIsOpenModal(false);
      setFormData({
        no_spp: "",
        tahun: "",
        type: "",
        dokumen: null,
        keterangan: "",
      });
      fetchTable();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Satuan Kerja", path: "/satuan-kerja" },
          { name: menuName.name },
        ]}
      />
      <Title>{menuName.name || menuTitle}</Title>
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
              width: "calc(100vw/2.2)",
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
            {dataTable.map((row, index) => (
              <TableRow
                key={index + 1}
                sx={{
                  "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                }}
              >
                <TableCell align="center">{row?.["no_spp"]}</TableCell>
                <TableCell align="center">
                  {moment(row?.["created_at"]).format("YYYY/MM/DD")}
                </TableCell>
                <TableCell align="center">{row.jenis_spp}</TableCell>
                <TableCell align="center">{row.tahun}</TableCell>
                <TableCell
                  align="center"
                  onClick={() => {
                    setIsOpenPDF(true);
                    setPDFtoOpen(row.document?.url);
                  }}
                  style={{
                    color: themeColors.primary.light,
                    cursor: "pointer",
                  }}
                >
                  {row.document?.filename}
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
            no_spp: "",
            tahun: "",
            type: "",
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
            name="no_spp"
            value={formData?.["no_spp"]}
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
            validate={validationSchema.tahun}
            required
            placeholder="Masukkan tahun"
          />
          <Select
            label="Jenis SPP"
            name="type"
            value={formData.type}
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
        {/* <CustomPDFViewer pdfSource={pdfToOpen} /> */}
        {/* <CustomPDFViewer pdfSource="https://api.rokeubmn-pa.id/storage/documents/BrQcOw5eryN4Y8q2CRHWtBZ1gDreuhdAXXoBenI8.pdf" /> */}
        {/* <iframe
          src={`https://api.rokeubmn-pa.id/storage/documents/BrQcOw5eryN4Y8q2CRHWtBZ1gDreuhdAXXoBenI8.pdf`}
          style={{ width: "100%", height: "500px" }}
          title="PDF Viewer"
        /> */}
        <iframe
          src={pdfToOpen}
          style={{ width: "100%", height: "500px" }}
          title="PDF Viewer"
        />
      </Modal>
    </div>
  );
}

export default ListSatuanKerjaPage;
