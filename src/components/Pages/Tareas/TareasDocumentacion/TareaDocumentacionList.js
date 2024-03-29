import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el archivo CSS de Bootstrap

import MDBox from "../../../controls/MDBox";
import MDTypography from "../../../controls/MDTypography";
import { Grid, Icon } from "@mui/material";
import { Card } from "react-bootstrap";
import DashboardLayout from "../../../controls/DashboardLayout";
import DashboardNavbar from "../../../controls/DashboardNavbar";
import DataTable from "../../../controls/Tables/DataTable";
import { Link, useNavigate, useParams } from 'react-router-dom';
//import TareaDocumentacionGet from "./TareaDocumentacionGet";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MDButton from "../../../controls/MDButton";
import axios from "axios";
import API_URL from "../../../../config";
import MDInput from "../../../controls/MDInput";
import { styled } from '@mui/material/styles';
import { CloudDownload, DeleteForever, ExitToApp, Save } from "@mui/icons-material";
import MDSnackbar from "../../../controls/MDSnackbar";


function TareaDocumentacionList() {
  //const { columns, rows } = TareaDocumentacionGet();
  const { id } = useParams();
  const history = useNavigate();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(''); // Estado para almacenar el nombre del archivo seleccionado
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [dateTime, setDateTime] = useState("");
  
  const [successSB, setSuccessSB] = useState(false);
  const closeSuccessSB = () => setSuccessSB(false);
  const [errorSB, setErrorSB] = useState(false);
  const closeErrorSB = () => setErrorSB(false);
  const closeSuccessSBPrev = () => setSuccessSBPrev(false);
  const [successSBPrev, setSuccessSBPrev] = useState(false);
  useEffect(() => {
    const obtenerFechaHoraActual = () => {
      const fechaHoraActual = new Date();
      const fechaFormateada = obtenerFechaFormateada(fechaHoraActual);
      setDateTime(fechaFormateada);
    };

    obtenerFechaHoraActual();
  }, []);

  const obtenerFechaFormateada = (fecha) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    return fecha.toLocaleString("es-ES", options);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleVolver = () => {
    history("/TareaVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
};

  const handleFileChange = (event) => {
  
      const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name); // Actualiza el nombre del archivo seleccionado en el estado
    }
      
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    onChange:{handleFileChange}
  });

  const handleDelete = (id) => {
    axios.post(`/api/Upload/${id}/delete`)
      .then(response => {
        console.log('Documento eliminado:', response.data);
        fetchData();
      })
      .catch(error => {
        console.error('Error al eliminar el documento:', error);
      });
  };

  const fetchData = async () => {
    try {
      const reqTrk = {
        idTarea: id,
      };
      const response = await axios.post(API_URL + "/DocumentoListar", reqTrk, {
        headers: {
          accept: "application/json",
        },
      });

      //setTareasEstados(await response.data);
      const data = response.data.map((doc) => {
        
        const fecha = (
          <Fechas
            fecha={doc.fecha}
           
          />
        );

        const action = (
          <MDBox ml={2}>
            

                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  <Link to={`../TareaDocumentacionDelete/${doc.idDocumento}`}>
                    <DeleteForever
                      fontSize="large"
                      color="error"
                      titleAccess="Eliminar Documento"
                    />
                  </Link>
                </MDTypography>

                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  <Link to={API_URL + `/api/upload/${doc.idDocumento}/download`} download>
                    <CloudDownload
                      fontSize="large"
                      color="info"
                      titleAccess="Descargar Documento"
                    />
                  </Link>
                </MDTypography>

          </MDBox>
        );
        return {
          idDocumento: doc.idDocumento,
          nombreArchivo: doc.nombreArchivo,
          fecha: fecha,
          descripcion:doc.descripcion,
          tamano: doc.tamano,
          action: action,
          path: doc.path,
          nombreUsuario: doc.nombreUsuario
        };
      });
      setRows(data);

  
      setColumns([
        // { Header: "ID Tarea", accessor: "idTarea", align: "left" },
        { Header: "Archivo", width: "10%", accessor: "nombreArchivo", align: "left" },
        {
          Header: "Descripcion",
          accessor: "descripcion",
          width: "10%",
          align: "left",
        },
        { Header: "Fecha", width: "15%", accessor: "fecha", align: "left" },
        { Header: "Tamaño (KB)", accessor: "tamano", align: "left" },
        {
          Header: "Path",
          accessor: "path",
          align: "left",
        },
        {
          Header: "Usuario",
          accessor: "nombreUsuario",
          align: "left",
        },
        { Header: "Acciones", accessor: "action", align: "center" },
      ]);


      // if (espdf === true) {
      //   //  exportToExcel(); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
      // } else {
       // generateAndDownloadPDF();
      //}
    } catch (ex) {
      console.log(ex);
    }
  };

  const Fechas = ({
    fecha
  }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="dark"
        fontWeight="bold"
      >
        Fecha : {formatDate(fecha)}
      </MDTypography>
      
    </MDBox>
  );

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // El mes es devuelto de 0 a 11, por eso se le suma 1
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  function FileInput({ handleFileChange }) {
    return (
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileChange} // Pasa la función como prop
      />
    );
  }

  function getIcon(activo) {
    return activo ? 'SI' : 'NO';//<Icon icon={Check} color="success"></Icon>  : <Icon icon={Bandaid} color="warning"></Icon>
  }



  const handleUpload = async () => {
    try {
      setSuccessSBPrev(true);
      const formData = new FormData();
      console.log("idTarea", id)
      formData.append('file', selectedFile);
      formData.append('idtarea', id);
      formData.append('usuario', localStorage.getItem('userlogueado'));
      formData.append('descripcion', descripcion);
      
      // Enviar el archivo al servidor
      const response = await axios.post(API_URL + '/api/Upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Obtener la ruta del archivo devuelta por el servidor
      const filePath = response.data.filePath;
      fetchData();
      // Aquí puedes guardar la ruta del archivo en tu base de datos
      setSuccessSB(true);
      setErrorSB(false);
      setSuccessSBPrev(false);
      console.log('Ruta del archivo guardada:', filePath);
    } catch (error) {
      setSuccessSB(false);
      setErrorSB(true);
      setSuccessSBPrev(false);
      console.error('Error al subir el archivo:', error);
    }
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
                  Documentacion anexada de Tarea
                 
                </MDTypography>
              </MDBox>

              <MDBox pt={3}  py={3}
                px={2}>
            <MDButton
                    onClick={() => {
                      handleVolver();
                    }}
                    variant="gradient"
                    color="info"
                    endIcon={<ExitToApp />}
                    text="contained"
                  >
                    Volver
                  </MDButton>
                  </MDBox>
         
              <MDBox component="form" role="form">
              <MDBox pt={3}  py={3}
                px={2}>
                <MDButton
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  color="info"
                  // onClick={handleUpload} 
                  styled={{ width:'60px' }}
                >
                  Seleccionar Archivo
                  <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </MDButton>
            </MDBox>

            <MDBox pt={3}  py={3}
                px={2}>
                <MDInput
                    type="text"
                    name="descripcion"
                    required
                    label="Descripcion"
                    variant="standard"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    
                />
            </MDBox>


            <MDBox pt={3}  py={3}
                px={2}>
                <MDInput
                    type="text"
                    name="uploadfile"
                    required
                    label="Archivo"
                    variant="standard"
                    multiline={true}
                    value={selectedFileName}

                />
            </MDBox>
            <MDBox pt={3}  py={3}
                px={2}>
            <MDButton
                    onClick={() => {
                      handleUpload();
                    }}
                    variant="gradient"
                    color="success"
                    endIcon={<Save />}
                    text="contained"
                  >
                    Subir Archivo
                  </MDButton>
                  </MDBox>
            </MDBox>
           
              <MDBox pt={3}  py={3}
                px={2}>
                
            
                 <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  canSearch={false}
                  noEndBorder
                  pagination={{color:"info", variant:"gradient"}}
                /> 
                 <MDSnackbar
                    notify={false}
                    error={false}
                    color="success"
                    icon="notifications"
                    title="Task Manager"
                    content="Archivo subido exitosamente"
                    dateTime={dateTime}
                    open={successSB}
                    onClose={closeSuccessSB}
                    close={closeSuccessSB}
                  />
                  <MDSnackbar
                      color="error"
                      icon="warning"
                      title="Task Manager"
                      notify={false}
                      error={true}
                      content="Error al subir archivo"
                      dateTime={dateTime}
                      open={errorSB}
                      onClose={closeErrorSB}
                      close={closeErrorSB}

                  />
                   <MDSnackbar
                    color="info"
                    icon="notifications"
                    title="Task Manager"
                    notify={true}
                    error={false}
                    content="Subiendo Archivo ....."
                    dateTime={dateTime}
                    open={successSBPrev}
                    onClose={closeSuccessSBPrev}
                    close={closeSuccessSBPrev}
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

export default TareaDocumentacionList;
