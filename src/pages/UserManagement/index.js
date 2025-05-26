/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
import Breadcrumbs from "@/components/Breadcrumbs";
import { Plus, Settings, Trash2, UserRoundSearch } from "lucide-react";
import { validationSchema } from "@/services/GeneralHelper";
import { toast } from "react-toastify";
import Chip from "@/components/Chip";
import Dialog from "@/components/Dialog";
import { fetchHelperGET } from "@/services/FetchHelper";

const columns = [
  { key: "biro-code", label: "Kode Biro" },
  { key: "biro-name", label: "Nama Biro" },
  { key: "privilege", label: "Tipe Akses" },
  { key: "action", label: "Action" },
];

const mapTableData = (data) => {
  let arr = [];
  data.forEach((item, i) => {
    arr.push({
      "biro-code": item.biro_code,
      "biro-name": item.name,
      // password: ["Admin1", "Pengguna2"][Math.floor(Math.random() * 2)],
      privilege: item.role,
    });
  });

  return arr;
};

function UserManagementPage() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [variantModal, setVariantModal] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [searchKey, setSearchKey] = useState("");
  const [tableData, setTableData] = useState();
  const [focusedData, setFocusedData] = useState(null);

  const [formData, setFormData] = useState({
    kodeBiro: "",
    name: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !formData.kodeBiro ||
        !formData.name ||
        !formData.role ||
        !formData.password
      ) {
        toast.error("Mohon lengkapi semua field yang diperlukan.");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Pengguna berhasil ditambahkan!");
      setIsOpenModal(false);
      setFormData({
        kodeBiro: "",
        name: "",
        role: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan pengguna. Silakan coba lagi.");
    }
  };

  const getListUser = async () => {
    let urlPath = `https://api.rokeubmn-pa.id/api/user/list?page=${
      page + 1
    }&per_page=${rowsPerPage}`;
    if (searchKey) {
      urlPath += `&search=${searchKey}`;
    }
    try {
      const response = await fetchHelperGET(
        urlPath,
        "GET",
        localStorage.getItem("token")
      );

      if (response?.success) {
        setTableData(mapTableData(response?.data?.data));
        setTotalPage(response?.data?.last_page);
      }
    } catch (err) {
      console.error("Fetch error:", err); // Add this
      toast.error(err);
    } finally {
    }
  };

  useEffect(() => {
    getListUser();
  }, [page, rowsPerPage, searchKey]);

  return (
    <div>
      <Breadcrumbs
        items={[{ name: "Manajemen Akun", path: "/user-management" }]}
      />
      <Title>Manajemen Akun</Title>
      <Paper
        elevation={3}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              setIsOpenModal(true);
              setVariantModal("Add");
            }}
            style={{ width: "fit-content" }}
            variant="danger"
            icon={<Plus size={20} />}
          >
            Tambah Akun
          </Button>
          <div
            style={{
              display: "flex",
              float: "right",
            }}
          >
            <Input
              label="Search"
              style={{ width: "200px" }}
              name="Search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
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
            {tableData?.map((row) => (
              <TableRow
                key={row.no}
                sx={{
                  "&:lastChild td, &:lastChild th": { borderBottom: "none" },
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row?.["biro-code"]}
                </TableCell>
                <TableCell align="center">{row?.["biro-name"]}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={row?.["privilege"]?.toUpperCase()}
                    style={{
                      backgroundColor:
                        row?.["privilege"] === "admin" ? "#FEDCE1" : "#E7FEE7",
                      color:
                        row?.["privilege"] === "admin" ? "#F9203E" : "#06BC09",
                    }}
                  />{" "}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      setVariantModal("Detail");
                      setFocusedData(row);
                      setIsOpenModal(true);
                    }}
                    style={{ width: "fit-content" }}
                    variant="primary"
                    icon={<UserRoundSearch size={18} />}
                  ></Button>
                  <Button
                    onClick={() => {
                      setVariantModal("Edit");
                      setFocusedData(row);
                      setIsOpenModal(true);
                    }}
                    style={{ width: "fit-content" }}
                    variant="secondary"
                    icon={<Settings size={18} />}
                  ></Button>
                  <Button
                    onClick={() => setOpenDialog(true)}
                    style={{ width: "fit-content" }}
                    variant="danger"
                    icon={<Trash2 size={18} />}
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          totalPages={totalPage}
          onPageChange={setPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => setRowsPerPage(e)}
        />
      </Paper>
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title={`Form ${variantModal} Akun`}
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
            label="Kode Biro"
            name="kodeBiro"
            value={
              variantModal === "Add"
                ? formData["biro-code"]
                : focusedData?.["biro-code"]
            }
            onChange={handleChange}
            validate={validationSchema.onlyNumber}
            required
            disabled={variantModal === "Detail"}
            placeholder="Masukkan Kode Biro"
          />
          <Input
            label="Name"
            name="name"
            disabled={variantModal === "Detail"}
            value={
              variantModal === "Add"
                ? formData["biro-name"]
                : focusedData?.["biro-name"]
            }
            onChange={handleChange}
            required
            placeholder="Masukkan Nama Biro"
          />
          {variantModal !== "Detail" && (
            <Input
              label="Password"
              name="password"
              type="password"
              value={
                variantModal === "Add"
                  ? formData["password"]
                  : focusedData?.["password"]
              }
              onChange={handleChange}
              validate={validationSchema.password}
              required
              placeholder="Masukkan password"
            />
          )}
          <Select
            label="Role"
            name="role"
            disabled={variantModal === "Detail"}
            value={
              variantModal === "Add"
                ? formData["privilege"]
                : focusedData?.["privilege"]
            }
            onChange={handleChange}
            required
            options={[
              { label: "admin", value: "admin" },
              { label: "supervisor", value: "supervisor" },
              { label: "pengguna", value: "pengguna" },
            ]}
          />
          {variantModal === "Add" && (
            <Button type="submit" style={{ float: "right" }}>
              Tambahkan
            </Button>
          )}
        </form>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Warning!"
        actions={
          <>
            <Button
              onClick={() => setOpenDialog(false)}
              size="medium"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              size="medium"
              onClick={() => {
                toast.success("Akun berhasil Dihapus!", {
                  position: "top-right",
                });
                setOpenDialog(false);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        Apakah anda yakin akan menghapus akun ini ?
      </Dialog>
    </div>
  );
}

export default UserManagementPage;
