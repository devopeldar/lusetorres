import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el archivo CSS de Bootstrap

import MDBox from "../../controls/MDBox";
import MDTypography from "../../controls/MDTypography";
import { Grid } from "@mui/material";
import { Card } from "react-bootstrap";
import PerfilesGet from "./PerfilesGet";
import DashboardLayout from "../../controls/DashboardLayout";
import DashboardNavbar from "../../controls/DashboardNavbar";
import DataTable from "../../controls/Tables/DataTable";

import MDButton from "../../controls/MDButton";
import { useNavigate } from 'react-router-dom';
import { PersonFillAdd } from "react-bootstrap-icons";



function Perfiles() {
  const { columns, rows } = PerfilesGet();
  const history = useNavigate();
  const handleAdd = () => {
    history('/Perfil/PerfilAdd'); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
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
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="warning"
              >
                <MDTypography variant="h6" color="white">
                  Perfiles
                 
                </MDTypography>
              </MDBox>
              <MDBox pt={3}  py={3}
                px={2}>
              <MDButton
                    onClick={() => {
                      handleAdd();
                    }}
                    variant="gradient"
                    color="success"
                    endIcon={<PersonFillAdd />}
                    text="contained"
                  >
                    Agregar
                  </MDButton>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder
                  pagination={{color:"warning", variant:"gradient"}}
                  
                />
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Perfiles;
