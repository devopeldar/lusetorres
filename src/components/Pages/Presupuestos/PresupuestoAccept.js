// EditarPresupuesto.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BasicLayout from "../../layauots/BasicLayout";
import { Card } from "react-bootstrap";

import { PersonFillAdd, Save } from "react-bootstrap-icons";
import { Delete, ExitToApp, Task } from "@mui/icons-material";

import {
  Alert,
  AlertTitle,
  Autocomplete,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Table,
  TableHead,
} from "@mui/material";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import MDBox from "../../controls/MDBox";
import MDInput from "../../controls/MDInput";
import MDTypography from "../../controls/MDTypography";
import MDButton from "../../controls/MDButton";
import obtenerFechaFormateada from "../../Utils/fechas";
import MDSnackbar from "../../controls/MDSnackbar";

const PresupuestoAccept = () => {
  const { id, habilitado } = useParams(); // Obtener el parámetro de la URL (el ID del Presupuesto a editar)
  const [Presupuesto, setPresupuesto] = useState(null);
  const [idPresupuesto, setidPresupuesto] = useState("");

  const [idCliente, setIdCliente] = useState(0);

  const [observaciones, setObservaciones] = useState("");
  const [presupuestoxtareastipos, setPresupuestoxTareasTipos] = useState([]);
  const [presupuestoxtareastiposUpdate, setPresupuestoxtareastiposUpdate] =
    useState([]);

  const [nombreboton, setnombreboton] = useState("Cancelar");
  const [mensaje, setMensaje] = useState("");
  const history = useNavigate();
  const [grabando, setGrabando] = useState(false);
  const [controlHabilitado, setControlHabilitado] = useState(false);
  const [exito, setExito] = useState(false);

  const [elementsclientes, setElementsCliente] = useState([]);

  const [selectedValueCliente, setSelectedValueCliente] = useState([]);

  const [elementsDepto, setElementsDepto] = useState([]);
  const [selectedValueDepartamentos, setSelectedValueDepartamentos] = useState(
    []
  );

  const [elementsUsuario, setElementsUsuario] = useState([]);
  const [elementsRol, setElementsRol] = useState([]);
  const [selectedValueUsuario, setSelectedValueUsuario] = useState(
    elementsUsuario[0]
  );
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [rolesxTareaUpdate, setRolesxTareaUpdate] = useState([]);
  const [selectedValueRol, setSelectedValueRol] = useState(elementsRol[0]);
  const closeSuccessSB = () => setSuccessSB(false);
  const [successSB, setSuccessSB] = useState(false);
  const closeSuccessSBPrev = () => setSuccessSBPrev(false);
  const [successSBPrev, setSuccessSBPrev] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

 const [dateTime, setDateTime] = useState("");
  const closeErrorSB = () => setErrorSB(false);
  const handleVolver = () => {
    history("/PresupuestoVolver"); // Cambia '/ruta-de-listado' por la ruta real de tu listado de datos
  };

  useEffect(() => {
    setidPresupuesto(id);
    // Aquí realizas la llamada a tu API para obtener el Presupuesto específico por su ID
    const GetPresupuesto = async () => {
      try {
        const reqPresupuesto = {
          idPresupuesto: id,
        };

        const response = await axios.post(
          API_URL + `/PresupuestoGetByID`,
          reqPresupuesto,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        console.log(data);
        setObservaciones(data.observaciones);
        setPresupuestoxTareasTipos(data.presupuestoxTareasTipos);

        setIdCliente(data.idCliente);
        //setIdDepartamento(data.idDepartamento);
        let newRows = [];
        let i = 0;

        data.presupuestoxTareasTipos.forEach((item, index) => {
          i = i + 1;
          newRows.push(CargarDatos(item, i));
        });

        setPresupuestoxtareastiposUpdate(newRows);

        if (habilitado === "1") {
          setControlHabilitado(true);
        } else {
          setControlHabilitado(false);
        }

        setPresupuesto(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetPresupuesto();
  }, [id]);

  useEffect(() => {
    const GetRol = async () => {
      const response = await axios.post(API_URL + "/RolListar", {
        headers: {
          accept: "application/json",
        },
      });

      setElementsRol(response.data);
    };
    GetRol();
  }, []);

  useEffect(() => {
    const obtenerFechaHoraActual = () => {
      const fechaHoraActual = new Date();
      const fechaFormateada = obtenerFechaFormateada(fechaHoraActual);
      setDateTime(fechaFormateada);
    };

    obtenerFechaHoraActual();
  }, []);

  useEffect(() => {
    const GetUsuario = async () => {
      const response = await axios.post(API_URL + "/UsuarioListar", {
        headers: {
          accept: "application/json",
        },
      });

      setElementsUsuario(response.data);
    };
    GetUsuario();
  }, []);

  useEffect(() => {
    const GetDepartamento = async () => {
      const response = await axios.post(API_URL + "/DepartamentoListar", {
        headers: {
          accept: "application/json",
        },
      });
      setElementsDepto(response.data);

      const defaultValueId = idDepartamento; // ID del elemento que deseas seleccionar por defectoa asd asd asd asd a sdasd asd asd
      const defaultValue = response.data.find(
        (item) => item.idDepartamento === defaultValueId
      );
      setSelectedValueDepartamentos(defaultValue);
    };
    GetDepartamento();
  }, [Presupuesto]);

  useEffect(() => {
    const GetClientes = async () => {
      const response = await axios.post(API_URL + "/CLienteListar", {
        headers: {
          accept: "application/json",
        },
      });

      setElementsCliente(response.data);

      const defaultValueId = idCliente; // ID del elemento que deseas seleccionar por defecto
      const defaultValue = response.data.find(
        (item) => item.idCliente === defaultValueId
      );

      setSelectedValueCliente(defaultValue);
    };
    GetClientes();
  }, [Presupuesto]);

  const handleSubmit = async (event) => {
    try {
      if (observaciones === "") {
        setMensaje("El campo observaciones es obligatorio");
        setExito(false);
        return;
      }
      const request = {
        idPresupuesto: id,
        observaciones:observaciones,
        idUsuario: localStorage.getItem("iduserlogueado"),
        usuario: localStorage.getItem("userlogueado"),
        origenAcceso: "web",
        tareaxRoles: rolesxTareaUpdate.map((item) => ({
          idUsuario: item.idUsuario,
          idRol: item.idRol,
        })),
      };

      setGrabando(true); // Inicia la grabación
      setnombreboton("Volver");
      setExito(true);
      setMensaje("");
      setSuccessSBPrev(true);
      // Aquí realizas la llamada a tu API para actualizar el Presupuesto con los nuevos datos
      const response = await fetch(API_URL + `/PresupuestoAceptar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const res = await response.json();

      if (res.rdoAccion) {
        // Manejar respuesta exitosa
        setSuccessSB(true);
        setSuccessSBPrev(false);
        setErrorSB(false);
        setMensaje("¡Datos actualizados exitosamente!");
      } else {
        setSuccessSB(false);
        setErrorSB(true);
        setSuccessSBPrev(false);
        // Manejar errores si la respuesta no es exitosa
        setMensaje(res.rdoAccionDesc);
        setGrabando(false); // Inicia la grabación
        setnombreboton("Cancelar");
        setExito(false);
      }
    } catch (error) {
      setMensaje("Error en la solicitud:", error);
      setGrabando(false); // Inicia la grabación
      setExito(false);
      setnombreboton("Cancelar");
      setSuccessSB(false);
      setErrorSB(true);
      setSuccessSBPrev(false);
      console.log("Error en la solicitud:" + error);
    }
  };
  const CargarDatos = (item, index) => {
    const newRow = {
      id: index,
      idPresupuesto: id,
      idTareaTipo: item.idTareaTipo,
      nombreTareaTipo: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          width="10"
        >
         Tipo Tarea: {item.nombre}
        </MDTypography>
      ),
      vencimientoDias: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          Venc. Dias {item.vencimientoDias}
        </MDTypography>
      ),
      fechavencimientoLegalFormateada: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          Venc. Legal {item.fechavencimientoLegalFormateada}
        </MDTypography>
      ),
      nombreDepartamento: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          Depto: {item.nombreDepartamento}
        </MDTypography>
      ),
    };

    return newRow;
  };

  const handleAutocompleteIDClienteChange = (event, value) => {
    setSelectedValueCliente(value);
  };

  const handleAutocompleteDeptoChange = (event, value) => {
    setSelectedValueDepartamentos(value);
  };
  const eliminarItem = (id) => {
    const newData = presupuestoxtareastiposUpdate.filter(
      (item) => item.id !== id
    );
    setPresupuestoxtareastiposUpdate(newData);
  };
  //   useEffect(() => {
  //     console.log(
  //       "presupuestoxtareastiposUpdate después de la actualizacióneeeeeeeeeee:",
  //       presupuestoxtareastiposUpdate
  //     );
  //   }, [presupuestoxtareastiposUpdate]);
  if (!Presupuesto) {
    return (
      <BasicLayout image={bgImage}>
        <Card style={{ width: "157%" }}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="primary"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Cargando Datos Presupeusto...
            </MDTypography>
          </MDBox>
        </Card>
      </BasicLayout>
    );
  }

  const eliminarItemRol = (id) => {
    const newData = rolesxTareaUpdate.filter((item) => item.id !== id);
    setRolesxTareaUpdate(newData);
  };

  const handleAddRol = () => {
    const newRow = {
      id: rolesxTareaUpdate.length + 1,
      idUsuario: selectedValueUsuario.idUsuario,
      nombreUsuario: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {selectedValueUsuario.nombre}
        </MDTypography>
      ),
      idRol: selectedValueRol.idRol,
      nombreRol: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {selectedValueRol.descripcion}
        </MDTypography>
      ),
    };
    const usuarioExistente = rolesxTareaUpdate.find(
      (item) =>
        item.idUsuario === selectedValueUsuario.idUsuario &&
        item.idRol === selectedValueRol.idRol
    );

    if (!usuarioExistente) {
      setRolesxTareaUpdate((prevDatos) => [...prevDatos, newRow]);
    }
  };

  const handleAutocompleteUserChange = (event, value) => {
    setSelectedValueUsuario(value);
  };

  const handleAutocompleteRolChange = (event, value) => {
    setSelectedValueRol(value);
  };

  return (
    <BasicLayout image={bgImage}>
      <Card style={{ width: "190%", marginT: "-35px" }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="warning"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {/*  {!controlHabilitado ? "Cambio de Roles" : "Editar Presupuesto"} */}
            Aceptar Presupuesto
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Puede Aceptar el Presupuesto o bien modificar el mismo ante un
            cambio que haya surgido. Esta accion generara las tareas correspondientes
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" tarea="form">
            <MDBox
              mb={2}
              style={{
                width: "75%",
                gap: "16px",
                height: "100%", // Asegura que el contenedor principal ocupe el alto completo
              }}
            >
             
                <MDBox mb={2}>
                  <Autocomplete
                    onChange={handleAutocompleteIDClienteChange}
                    options={elementsclientes}
                    value={selectedValueCliente || null}
                    getOptionLabel={(option) =>
                      option.nombre || "Seleccione Cliente"
                    }
                    disabled={!controlHabilitado}
                    getOptionDisabled={(option) => option.activo === false}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Seleccione Cliente"
                        variant="outlined"
                      />
                    )}
                  />
                </MDBox>
                
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    name="observaciones"
                    required
                    label="Observaciones"
                    variant="standard"
                    value={observaciones}
                    // disabled={!controlHabilitado}
                    onChange={(e) => setObservaciones(e.target.value)}
                    fullWidth
                  />
                </MDBox>
             
                <MDBox mb={2}>
                  <Card style={{ width: "120%" }}>
                    <MDBox
                      variant="gradient"
                      bgColor="info"
                      borderRadius="lg"
                      coloredShadow="warning"
                      mx={2}
                      mt={0}
                      p={1}
                      mb={1}
                      textAlign="center"
                    >
                      <MDTypography
                        variant="h8"
                        fontWeight="light"
                        color="white"
                        mt={1}
                        endIcon={<Task />}
                      >
                        Tipos de Tarea del Presupuesto
                       
                      </MDTypography>
                    </MDBox>
                    <MDBox mb={2}>
                    <TableContainer component={Paper}>
                        <Table>
                        
                          <TableBody>
                            {presupuestoxtareastiposUpdate.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell >{item.nombreTareaTipo}</TableCell>
                                <TableCell>{item.vencimientoDias}</TableCell>
                                <TableCell>{item.fechavencimientoLegalFormateada}</TableCell>
                                <TableCell>{item.nombreDepartamento}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </MDBox>
                  </Card>
                  <MDBox mb={2}>
                    <Card>
                      <MDBox
                        variant="gradient"
                        bgColor="info"
                        borderRadius="lg"
                        coloredShadow="warning"
                        mx={2}
                        mt={2}
                        p={1}
                        mb={1}
                        textAlign="center"
                      >
                        <MDTypography
                          variant="h8"
                          fontWeight="light"
                          color="white"
                          mt={1}
                          endIcon={<Task />}
                        >
                          Administrar Roles
                        </MDTypography>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDBox mb={2} mr={4} ml={4}>
                          <Autocomplete
                            onChange={handleAutocompleteUserChange}
                            options={elementsUsuario}
                            getOptionLabel={(option) => option.nombre}
                            getOptionDisabled={(option) =>
                              option.activo === false
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Seleccione Usuario"
                                variant="outlined"
                              />
                            )}
                          />
                        </MDBox>
                        <MDBox mb={2} mr={4} ml={4}>
                          <Autocomplete
                            onChange={handleAutocompleteRolChange}
                            options={elementsRol}
                            getOptionLabel={(option) => option.descripcion}
                            getOptionDisabled={(option) =>
                              option.activo === false
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Seleccione Rol"
                                variant="outlined"
                              />
                            )}
                          />
                        </MDBox>
                        <MDBox mb={2} mr={6} ml={6}>
                          <MDButton
                            onClick={() => {
                              handleAddRol();
                            }}
                            variant="gradient"
                            color="info"
                            endIcon={<PersonFillAdd />}
                            fullWidth
                          >
                            Agregar Rol
                          </MDButton>
                        </MDBox>

                        <TableContainer component={Paper}>
                          <Table>
                            <TableBody>
                              {rolesxTareaUpdate.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell style={{ display: "none" }}>
                                    {item.id}
                                  </TableCell>
                                  <TableCell style={{ display: "none" }}>
                                    {item.idUsuario}
                                  </TableCell>
                                  <TableCell>{item.nombreUsuario}</TableCell>
                                  <TableCell style={{ display: "none" }}>
                                    {item.idRol}
                                  </TableCell>
                                  <TableCell>{item.nombreRol}</TableCell>
                                  <TableCell>
                                    <IconButton
                                      aria-label="Eliminar"
                                      onClick={() => eliminarItemRol(item.id)}
                                    >
                                      <Delete color="error" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </MDBox>
                    </Card>
                  </MDBox>
                </MDBox>
             
            </MDBox>
            <MDBox mt={1} mb={1}>
              <MDButton
                onClick={() => {
                  handleSubmit();
                }}
                variant="gradient"
                color="info"
                endIcon={<Save />}
                disabled={grabando}
                fullWidth
              >
                Aceptar Presupuesto
              </MDButton>
            </MDBox>
            <MDBox mt={2} mb={1}>
              <MDButton
                onClick={() => {
                  handleVolver();
                }}
                variant="gradient"
                color="info"
                endIcon={<ExitToApp />}
                fullWidth
              >
                {nombreboton}
              </MDButton>
            </MDBox>
            <MDSnackbar
                    color="info"
                    icon="notifications"
                    notify={true}
                    error={false}
                    title="Task Manager"
                    content="Aceptando Presupuesto y generando tareas....."
                    dateTime={dateTime}
                    seconds={15000}
                    open={successSBPrev}
                    onClose={closeSuccessSBPrev}
                    close={closeSuccessSBPrev}
                  />
                  {/* </MDButton> */}
                  <MDSnackbar
                    color="success"
                    icon="check"
                    title="Task Manager"
                    notify={false}
                    error={false}
                    seconds={5000}
                    content="Presupuesto Aceptado exitosamente"
                    dateTime={dateTime}
                    open={successSB}
                    onClose={closeSuccessSB}
                    close={closeSuccessSB}
                  />
                  <MDSnackbar
                      color="error"
                      icon="warning"
                      title="Task Manager"
                      seconds={5000}
                      notify={false}
                      error={true}
                      content="Error al Aceptar Presupuesto "
                      dateTime={dateTime}
                      open={errorSB}
                      onClose={closeErrorSB}
                      close={closeErrorSB}

                  />
          </MDBox>
          {mensaje !== "" && (
            <Alert severity={exito ? "success" : "error"}>
              <AlertTitle>{exito ? "Felicitaciones" : "Error"}</AlertTitle>
              {mensaje}
            </Alert>
          )}
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default PresupuestoAccept;
