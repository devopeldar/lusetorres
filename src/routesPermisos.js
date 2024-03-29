import { KeyFill, People, Person } from "react-bootstrap-icons";
import CambiarContrasenia from "./components/authentication/CambiarContrasenia";
import Perfiles from "./components/authentication/Perfil/Perfiles";
import {
  Close,
  DateRange,
  Event,
  EventAvailable,
  ManageAccounts,
  PersonSearch,
  Task,
  TaskAlt,
} from "@mui/icons-material";
import TareaTipoList from "./components/Pages/Tareas/TareaTipo/TareaTipoList";
import TareaEstadoList from "./components/Pages/Tareas/TareasEstado/TareaEstadoList";
import DepartamentoList from "./components/Pages/Departamentos/DepartamentoList";
import TipoEventoList from "./components/Pages/TipoEvento/TipoEventoListar";
import ClienteList from "./components/Pages/Clientes/ClienteList";
import TareaList from "./components/Pages/Tareas/TareaList";
import RolList from "./components/authentication/Rol/RolList";
import UsuarioList from "./components/authentication/Usuario/UsuarioList";
import axios from "axios";
import API_URL from "./config";
import CloseSession from "./components/authentication/CloseSession";
import PresupuestoList from "./components/Pages/Presupuestos/PresupuestoList";
import VencimientosList from "./components/Pages/Vencimientos/VencimientosList";



const routesPermisos = () => {
  
const handleCloseSession = () => {
 
  localStorage.setItem("isRegister", "false");
  localStorage.setItem("isLoggedIn", "false");
  localStorage.setItem("idPerfil", "0");


  // rutasVisibles = routes.filter(route => route.visible === true);
  // console.log("rutasVisibles ", rutasVisibles);
  // getRoutes(rutasVisibles)
};

let routesnew = [];

let routes = [];

routesnew = [
  {
    type: "title",
    name: "Tareas",
    title: "Tareas",
    key: "tareas",
    icon: <People />,
    visible: false,
    codigoPermiso: 100,
  },
  {
    type: "collapse",
    name: "Tareas",
    key: "mantenimientotareas",
    icon: <Task />,
    route: "/Tarea",
    component: <TareaList />,
    visible: false,
    codigoPermiso: 101,
    //visible: retrievedPermissions.USUARIOS?.valor || false
  },
  {
    type: "collapse",
    name: "Tipo de Tareas",
    key: "tipotareas",
    icon: <TaskAlt />,
    route: "/TareasTipo",
    component: <TareaTipoList />,
    visible: false,
    codigoPermiso: 102,
  },
  {
    type: "collapse",
    name: "Departamentos",
    key: "departamentostareas",
    icon: <Event />,
    route: "/Departamentos",
    component: <DepartamentoList />,
    visible: false,
    codigoPermiso: 103,
  },
  {
    type: "collapse",
    name: "Estados de Tareas",
    key: "estadotareas",
    icon: <Event />,
    route: "/TareaEstado",
    component: <TareaEstadoList />,
    visible: false,
    codigoPermiso: 104,
  },
  {
    type: "collapse",
    name: "Presupuestos",
    key: "presupuestos",
    icon: <Event />,
    route: "/Presupuestos",
    component: <PresupuestoList />,
    visible: false,
    codigoPermiso: 105,
  },
  {
    type: "collapse",
    name: "Vencimientos",
    key: "vencimientos",
    icon: <DateRange />,
    route: "/Vencimientos",
    component: <VencimientosList />,
    visible: false,
    codigoPermiso: 106,
  },
  {
    type: "title",
    name: "Eventos",
    key: "eventos",
    title: "Eventos",
    visible: false,
    codigoPermiso: 200,
  },
  {
    type: "collapse",
    name: "Tipos de Evento",
    key: "tiposdeeventos",
    icon: <EventAvailable />,
    route: "/TipoEvento",
    component: <TipoEventoList />,
    visible: false,
    codigoPermiso: 201,
  },
  {
    type: "title",
    name: "Clientes",
    key: "clientes",
    title: "Clientes",
    visible: false,
    codigoPermiso: 300,
  },
  {
    type: "collapse",
    name: "Mantenimiento Clientes",
    key: "mantenimientoclientes",
    icon: <People />,
    route: "/Clientes",
    component: <ClienteList />,
    visible: false,
    codigoPermiso: 301,
  },
  {
    type: "title",
    name: "Seguridad",
    key: "seguridad",
    title: "Seguridad",
    icon: <KeyFill />,
    visible: true,
    codigoPermiso: 400,
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    title: "Usuarios",
    icon: <ManageAccounts />,
    route: "/Usuarios",
    component: <UsuarioList />,
    visible: false,
    codigoPermiso: 401,
  },
  {
    type: "collapse",
    name: "Perfiles",
    key: "perfiles",
    title: "Perfiles",
    icon: <Person />,
    route: "/Perfiles",
    component: <Perfiles />,
    visible: false,
    codigoPermiso: 402,
  },
  {
    type: "collapse",
    name: "Roles",
    key: "roles",
    icon: <PersonSearch />,
    route: "/Rol",
    component: <RolList />,
    visible: false,
    codigoPermiso: 403,
  },
  {
    type: "collapse",
    name: "ChangePassword",
    key: "changepassword",
    icon: <KeyFill />,
    route: "/CambiarContrasenia",
    component: <CambiarContrasenia />,
    visible: true,
    codigoPermiso: 404,
  },
  {
    type: "collapse",
    name: "Cerrar Sesion",
    key: "closesession",
    icon: <Close />,
    route: "/Closesession",
    component: <CloseSession handleCloseSession={handleCloseSession} />,
    visible: true,
    codigoPermiso: 999,
  },
];

const GetPermisos = async () => {
  try {
    const reqPermisosxPerfil = {
      idperfil: localStorage.getItem("idPerfil"),
    };
console.log("idperfil" , reqPermisosxPerfil);
    const response = await axios.post(
      API_URL + `/PerfilxPermisoListar`,
      reqPermisosxPerfil,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const permisosBaseDatos = response.data;
    console.log("permisosBaseDatos" , permisosBaseDatos);
    if(permisosBaseDatos != null){
      // Aquí se realiza cualquier operación o lógica que dependa de los permisos recuperados
      routes = routesnew.map((route) => {
        const permisoEncontrado = permisosBaseDatos.find(
          (permiso) => permiso.codigoPermiso === route.codigoPermiso
        );
        if (permisoEncontrado) {
          route.visible = true;
        } else {
          if (route.codigoPermiso === 999 || route.codigoPermiso === 404) {
            route.visible = true;
          } else {
            route.visible = false;
          }
        }
        return route;
      });
    }
    console.log("routes" , routes);
    return routes;
    // Llamar a cualquier otra función o realizar operaciones adicionales aquí después de actualizar 'routes'
  } catch (error) {
    console.error("Error:", error);
  }
};

(async () => {
  routes = await GetPermisos(); // Espera la resolución de GetPermisos()
 
  routesnew = routes.filter(route => route.visible === true);
  
})();
};
export default routesPermisos;
