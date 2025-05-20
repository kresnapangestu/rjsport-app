/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function data() {
  return {
    columns: [
      { Header: "no", accessor: "no", width: "5%", align: "center" },
      { Header: "satker / unit", accessor: "unit", width: "15%", align: "center" },
      { Header: "no spp", accessor: "spp", align: "left" },
      { Header: "tanggal pengiriman", accessor: "date", width: "15%", align: "left" },
      { Header: "uraian spp", accessor: "detspp", align: "center" },
      { Header: "dokumen", accessor: "document", align: "center" },
      { Header: "keterangan", accessor: "detail", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        no: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            1
          </MDTypography>
        ),
        unit: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Biro Hukum
          </MDTypography>
        ),
        spp: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            123xxx-7yy
          </MDTypography>
        ),
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        detspp: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            123xxx-7yy
          </MDTypography>
        ),
        document: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Dokumen SP2D 1
          </MDTypography>
        ),
        detail: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            isi keterangan
          </MDTypography>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        // action: (
        //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //     Edit
        //   </MDTypography>
        // ),
      },
      {
        no: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2
          </MDTypography>
        ),
        unit: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Biro Umum
          </MDTypography>
        ),
        spp: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            123xxx-8yy
          </MDTypography>
        ),
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        detspp: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            123xxx-7yy
          </MDTypography>
        ),
        document: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Dokumen SP2D 1
          </MDTypography>
        ),
        detail: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            isi keterangan
          </MDTypography>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        // action: (
        //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //     Edit
        //   </MDTypography>
        // ),
      },
    ],
  };
}
