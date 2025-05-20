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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import SimpleButtonCard from "examples/Cards/ButtonCards/SimpleButtonCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/arsip" style={{ textDecoration: "none" }}>
                <SimpleButtonCard color="dark" icon="gavel" title="Biro Hukum" />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/arsip" style={{ textDecoration: "none" }}>
                <SimpleButtonCard color="dark" icon="money" title="Biro Keuangan" />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/arsip" style={{ textDecoration: "none" }}>
                <SimpleButtonCard color="dark" icon="computer" title="Biro OSDMA" />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/arsip" style={{ textDecoration: "none" }}>
                <SimpleButtonCard color="dark" icon="receipt" title="Biro Perencanaan" />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/arsip" style={{ textDecoration: "none" }}>
                <SimpleButtonCard color="dark" icon="house" title="Biro Umum" />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/arsip" style={{ textDecoration: "none" }}>
                <SimpleButtonCard color="dark" icon="person" title="Biro Humas" />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/arsip" style={{ textDecoration: "none" }}>
                <SimpleButtonCard color="dark" icon="upload" title="PPSDM" />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/arsip" style={{ textDecoration: "none" }}>
                <SimpleButtonCard color="dark" icon="school" title="Politeknik" />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/arsip" style={{ textDecoration: "none" }}>
                <SimpleButtonCard color="dark" icon="book" title="Rekapitulasi Dok SPP" />
              </Link>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
