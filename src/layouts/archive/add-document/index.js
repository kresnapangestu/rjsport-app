/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { Snackbar, Alert } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import MDButton from "components/MDButton";

function Tables() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      navigate("/archive");
    }, 3000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value.toUpperCase());
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Form pengarsipan
                </MDTypography>
              </MDBox>
              <MDBox mx={2} pt={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="No Spp"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={value}
                      onChange={handleChange}
                    />
                  </MDBox>
                  {/* <MDBox mb={2}>
                    <MDInput
                      type="date  "
                      label="Tanggal Pengiriman"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </MDBox> */}
                  <MDBox mb={2}>
                    <MDInput
                      type="file"
                      label="Dokumen"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      label="Keterangan"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      multiline
                      rows={3}
                    />
                  </MDBox>
                  <MDBox mt={1} mb={1} py={1} px={1} display="flex" justifyContent="flex-end">
                    <MDButton
                      variant="gradient"
                      color="primary"
                      style={{ width: "150px" }}
                      onClick={handleClick}
                    >
                      <Icon>save</Icon>&nbsp;&nbsp;Arsip
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                  Data berhasil disimpan!
                </Alert>
              </Snackbar>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer
        company={{
          name: "Biro Keuangan - Pelaksaan Anggaran",
          href: "https://kemnaker.go.id",
        }}
        links={[
          { name: "Tentang Kami", href: "/about" },
          { name: "Kontak", href: "/contact" },
        ]}
      />
    </DashboardLayout>
  );
}

export default Tables;
