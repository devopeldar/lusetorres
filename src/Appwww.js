import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React components
import MDBox from "../src/components/controls/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "../src/components/Sidenav"; //"../src/components/menu/SideNav";
import Configurator from "../src/components/layauots/Configurator";

// Material Dashboard 2 React themes
import theme from "../src/assets/theme/theme-rtl";
//import themeRTL from "../src/assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "../src/assets/theme-dark";
//import themeDarkRTL from "../src/assets/theme-dark/theme-rtl";

// RTL plugins
//import rtlPlugin from "stylis-plugin-rtl";
//import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "../src/routes";

// Material Dashboard 2 React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "../src/context";

// Images
import brandWhite from "../src/assets/images/logo-ct-dark.png";
import brandDark from "../src/assets/images/logo-ct-dark.png";
import Login from "./components/authentication/Login";
import Registrarme from "./components/authentication/Registrarme";
import Confirmacion from "./components/authentication/Confirmacion";
import ConfirmacionIngreso from "./components/authentication/ConfirmacionIngreso";
import RecuperarPass from "./components/authentication/RecuperarPass";
import ConfirmacionRecuperoPass from "./components/authentication/ConfirmacionRecuperoPass";
import PerfilAdd from "./components/authentication/Perfil/PerfilAdd";
import PerfilEdit from "./components/authentication/Perfil/PerfilEdit";
import Perfiles from "./components/authentication/Perfil/Perfiles";
import TareaTipoList from "./components/Pages/Tareas/TareaTipo/TareaTipoList";
import TareaEstadoList from "./components/Pages/Tareas/TareasEstado/TareaEstadoList";
import { Settings } from "@mui/icons-material";
import TareaTipoAdd from "./components/Pages/Tareas/TareaTipo/TareaTipoAdd";
import TareaTipoEdit from "./components/Pages/Tareas/TareaTipo/TareaTipoEdit";
import TareaEstadoAdd from "./components/Pages/Tareas/TareasEstado/TareaEstadoAdd";
import TareaEstadoEdit from "./components/Pages/Tareas/TareasEstado/TareaEstadoEdit";
import DepartamentoList from "./components/Pages/Departamentos/DepartamentoList";
import DepartamentoAdd from "./components/Pages/Departamentos/DepartamentoAdd";
import DepartamentoEdit from "./components/Pages/Departamentos/DepartamentoEdit";
import TipoEventoList from "./components/Pages/TipoEvento/TipoEventoListar";
import TipoEventoAdd from "./components/Pages/TipoEvento/TipoEventoAdd";
import TipoEventoEdit from "./components/Pages/TipoEvento/TipoEventoEdit";
import ClienteList from "./components/Pages/Clientes/ClienteList";
import ClienteAdd from "./components/Pages/Clientes/ClienteAdd";
import ClienteEdit from "./components/Pages/Clientes/ClienteEdit";
import TareaList from "./components/Pages/Tareas/TareaList";
import SessionChecker from "./SessionChecker";
import RolList from "./components/authentication/Rol/RolList";
import ConfirmarCuentaxToken from "./components/authentication/ConfirmarCuentaxToken";
import ConfirmacionActivacionCuenta from "./components/authentication/ConfirmacionActivacionCuenta";
import RolAdd from "./components/authentication/Rol/RolAdd";
import RolEdit from "./components/authentication/Rol/RolEdit";
import Permisos from "./components/authentication/Permisos";
import CloseSession from "./components/authentication/CloseSession";
import EventoTareaAdd from "./components/Pages/Tareas/EventoTareaAdd";
import TareaTrakingList from "./components/Pages/Tareas/TareaTrakingList";
import TareaAdd from "./components/Pages/Tareas/TareaAdd";
import UsuarioEdit from "./components/authentication/Usuario/UsuarioEdit";
import UsuarioList from "./components/authentication/Usuario/UsuarioList";
import EventoTareaEdit from "./components/Pages/Tareas/EventoTareaEdit";
import PresupuestoList from "./components/Pages/Presupuestos/PresupuestoList";
import PresupuestoCopy from "./components/Pages/Presupuestos/PresupuestoCopy";
import PresupuestoAdd from "./components/Pages/Presupuestos/PresupuestoAdd";
import PresupuestoEdit from "./components/Pages/Presupuestos/PresupuestoEdit";
import PresupuestoAccept from "./components/Pages/Presupuestos/PresupuestoAccept";
import VencimientosEdit from "./components/Pages/Vencimientos/VencimientosEdit";
import VencimientosList from "./components/Pages/Vencimientos/VencimientosList";
import VencimientosAdd from "./components/Pages/Vencimientos/VencimientosAdd";
import TareaDocumentacionList from "./components/Pages/Tareas/TareasDocumentacion/TareaDocumentacionList";
import TareaDocumentacionDelete from "./components/Pages/Tareas/TareasDocumentacion/TareaDocumentacionDelete";
import CambiarContrasenia from "./components/authentication/CambiarContrasenia";
import EventoTareaDelete from "./components/Pages/Tareas/EventoTareaDelete";
import routesPermisos from "./routesPermisos";
import VencimientosAddMasivo from "./components/Pages/Vencimientos/VencimientosAddMasivo";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  // const [IsRegister, setIsRegister] = useState(false);

  const initialAuthState = localStorage.getItem("isLoggedIn") === "true";

  const isRegistrar = localStorage.getItem("isRegister") === "true";

  const isActivarCuenta = localStorage.getItem("isActivarCuenta") === "true";

  const isForgotPassword = localStorage.getItem("isForgotPassword") === "true";

  const [isLoggedIn, setIsLoggedIn] = useState(initialAuthState);
  const [shouldReload, setShouldReload] = useState(false);
  const [routesVisible, setRoutesVisible] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //setRoutesVisible(routes.filter(route => route.visible === true));
  //console.log("routesVisible ", routesVisible);
  //let routesVisible =[]; routesVisible =  await routes.filter(route => route.visible === true);
  const navigate = useNavigate();
  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
    });
    //stylisPlugins: [rtlPlugin],
    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem('isRegister', 'false');
    localStorage.setItem('isActivarCuenta', 'false');
    localStorage.setItem('isForgotPassword', 'false');
    setShouldReload(true);
    navigate("/");
  };
 useEffect(() => {
 
  }, []); // Se ejecuta solo una vez al montar el componente


  // useEffect(() => {
  //   localStorage.setItem("isLoggedIn", isLoggedIn);

  //   const fetchRoutes = async () => {
  //     const loadedRoutes =  await routes.filter((route) => route.visible === true);
  //     console.log("loadedRoutes ", loadedRoutes);
  //     setRoutesVisible(loadedRoutes);
  //     //setRoutesVisible((prevDatos) => [...prevDatos, loadedRoutes]);
  //     console.log("routesVisible ", routesVisible);
  //   };

  //   fetchRoutes();
  // }, [routes]); // Se ejecuta solo una vez al montar el componente

  // Almacena el estado de autenticación en localStorage cuando cambie
  useEffect( () => {
    localStorage.setItem("isLoggedIn", isLoggedIn);

    // Lógica para reconstruir las rutas basadas en el estado de autenticación (isLoggedIn)
    const updatedRoutes = routes.filter((route) => route.visible === true);
    setRoutesVisible(updatedRoutes);
      // Indica que la carga ha terminado
      setIsLoading(false);
   
    if (shouldReload) {
      
      window.location.reload();
      setShouldReload(false); // Restablece shouldReload a false después de la recarga
    }
  }, [routes, shouldReload]);

  // const fetchRoutes = async () => {
  //       const loadedRoutes =  await routes.filter((route) => route.visible === true);
  //       console.log("loadedRoutes ", loadedRoutes);
  //       setRoutesVisible(loadedRoutes);
  //       //setRoutesVisible((prevDatos) => [...prevDatos, loadedRoutes]);
  //       console.log("routesVisible ", routesVisible);

  //       return loadedRoutes;
  //     };


  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
    console.log("22222 ", "2222");
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    console.log("sssss ", "sssssss");
  }, [pathname]);

  const getRoutes = (allRoutes) =>
 
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
            visible={route.visible}
          />
        );
      }
      console.log("Segundo");
      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      {/* <Icon fontSize="small" color="inherit">
        settings
      </Icon> */}
      <Settings />
    </MDBox>
  );

  if (isLoading) {
    // Muestra un indicador de carga mientras se cargan las rutas
    console.log("tercero");
    setTimeout(() => {
      setIsLoading(false); // Finaliza la simulación de carga después de 2 segundos
    }, 5000);
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoggedIn ? (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />

          <SessionChecker />

          <Routes>
            {getRoutes(routesVisible)}
            <Route
              path="/"
              element={<ConfirmacionIngreso />}
            />
            <Route
              path="/ConfirmacionActivacionCuenta"
              element={<ConfirmacionActivacionCuenta />}
            />
            <Route
              path="/ConfirmarCuentaXToken"
              element={<ConfirmarCuentaxToken />}
            />
            <Route
              path="/ConfirmacionIngreso"
              element={<ConfirmacionIngreso />}
            />
            <Route path="/Confirmacion" element={<Confirmacion />} />
            <Route
              path="/Login"
              element={<Login handleLogin={handleLogin} />}
            />
            {/* <Route path="*" element={<Login handleLogin={handleLogin} />} /> */}
            <Route path="/Registrarme" element={<Registrarme />} />
            <Route path="/RecuperarPass" element={<RecuperarPass />} />
            <Route
              path="/ConfirmacionRecuperoPass"
              element={<ConfirmacionRecuperoPass />}
            />
            <Route path="/Perfil/PerfilAdd" element={<PerfilAdd />} />
            <Route path="/Perfil/PerfilEdit/:id" element={<PerfilEdit />} />
            <Route path="/Perfil/Perfiles" element={<Perfiles />} />
            <Route path="/PerfilesVolver" element={<Perfiles />} />
            <Route path="/Perfiles" element={<Perfiles />} />
            <Route path="/DepartamentoAdd" element={<DepartamentoAdd />} />
            <Route
              path="/Departamento/DepartamentoEdit/:id"
              element={<DepartamentoEdit />}
            />
            <Route path="/Departamentos" element={<DepartamentoList />} />
            <Route path="/DepartamentoVolver" element={<DepartamentoList />} />

            <Route
              path="/TareaEstado/TareaEstadoEdit/:id"
              element={<TareaEstadoEdit />}
            />
            <Route path="/TareaEstadoAdd" element={<TareaEstadoAdd />} />
            <Route path="/TareaEstado" element={<TareaEstadoList />} />
            <Route path="/TareaEstadoVolver" element={<TareaEstadoList />} />

            <Route path="/TareasTipo" element={<TareaTipoList />} />
            <Route path="/TareaTipoVolver" element={<TareaTipoList />} />
            <Route path="/TareaTipoAdd" element={<TareaTipoAdd />} />
            <Route
              path="/TareaTipo/TareaTipoEdit/:id"
              element={<TareaTipoEdit />}
            />

            <Route path="/TipoEventoEdit/:id" element={<TipoEventoEdit />} />
            <Route path="/TipoEventoAdd" element={<TipoEventoAdd />} />
            <Route path="/TipoEvento" element={<TipoEventoList />} />
            <Route path="/TipoEventoVolver" element={<TipoEventoList />} />

            <Route path="/ClienteEdit/:id" element={<ClienteEdit />} />
            <Route path="/ClienteAdd" element={<ClienteAdd />} />
            <Route path="/Clientes" element={<ClienteList />} />
            <Route path="/ClienteVolver" element={<ClienteList />} />

            <Route path="/TareaEdit/:id" element={<TareaList />} />
            <Route path="/EventoTareaDelete/:id/:habilitado" element={<EventoTareaDelete />} />
            <Route path="/TareaAdd" element={<TareaAdd />} />
            <Route path="/Tarea" element={<TareaList />} />
            <Route path="/TareaVolver" element={<TareaList />} />

            <Route path="/RolEdit/:id" element={<RolEdit />} />
            <Route path="/RolAdd" element={<RolAdd />} />
            <Route path="/Rol" element={<RolList />} />
            <Route path="/RolVolver" element={<RolList />} />
            <Route path="/Permisos/:id" element={<Permisos />} />
            <Route path="/CloseSession" element={<CloseSession />} />

            <Route path="/EventoTareaEdit/:id/:habilitado" element={<EventoTareaEdit />} />
            <Route path="/EventoTareaAdd/:id" element={<EventoTareaAdd />} />
            <Route path="/TareaTraking/:id" element={<TareaTrakingList />} />
            <Route path="/TareaListVolver" element={<TareaList />} />

            <Route path="/UsuarioEdit/:id" element={<UsuarioEdit />} />
            <Route path="/UsuarioVolver" element={<UsuarioList />} />
            <Route path="/Usuarios" element={<UsuarioList />} />

            <Route path="/PresupuestoAceptar/:id/:habilitado" element={<PresupuestoAccept />} /> 
            <Route path="/PresupuestoCopy/:id" element={<PresupuestoCopy />} /> 
            <Route path="/PresupuestoVolver" element={<PresupuestoList />} />
            <Route path="/PresupuestoAdd" element={<PresupuestoAdd />} />
            <Route path="/PresupuestoEdit/:id" element={<PresupuestoEdit />} />
            <Route path="/Presupuestos" element={<PresupuestoList />} />
            <Route path="/VencimientosEdit/:id" element={<VencimientosEdit />} /> 
            <Route path="/VencimientosVolver" element={<VencimientosList />} />
            <Route path="/VencimientosAdd" element={<VencimientosAdd />} />
            <Route path="/VencimientosAddMasivo" element={<VencimientosAddMasivo />} />
            <Route path="/Vencimientos" element={<VencimientosList />} />
            
            <Route path="/TareaDocumentacionList/:id" element={<TareaDocumentacionList />} />
            <Route path="/TareaDocumentacionDelete/:id" element={<TareaDocumentacionDelete />} /> 
            <Route path="/TareaDocumentacionVolver" element={<TareaDocumentacionList />} />
            
            <Route path="/CambiarContrasenia" element={<CambiarContrasenia />} />
        
            {/* 


        <Route path="/TipoTareas" element={<TareaTipoList />} />
        <Route path="/EstadoTareas" element={<TareaEstadoList />} /> */}
          </Routes>

          <>

            <Sidenav
              color={sidenavColor}
              brand={
                (transparentSidenav && !darkMode) || whiteSidenav
                  ? brandDark
                  : brandWhite
              }
              brandName="Task Manager"
              routes={routesVisible}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
              visible={false}
              
            />
            {/* <Configurator />
            {configsButton}
            {layout === "vr" && <Configurator />} */}
          </>
        </ThemeProvider>
      ) : (
        <>
          {!isLoggedIn &&
          !isRegistrar &&
          !isActivarCuenta &&
          !isForgotPassword ? (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
              <CssBaseline />
              <Login handleLogin={handleLogin} />
            </ThemeProvider>
          ) : isRegistrar ? (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
              <CssBaseline />
              <Registrarme />
            </ThemeProvider>
          ) : isActivarCuenta ? (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
              <CssBaseline />
              <ConfirmarCuentaxToken />
            </ThemeProvider>
          ) : (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
              <CssBaseline />
              <RecuperarPass />
            </ThemeProvider>
          )}
        </>
      )}
    </>
  );
}
