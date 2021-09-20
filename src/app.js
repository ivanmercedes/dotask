import proyectos from "./js/modulos/proyectos";
import tareas from "./js/modulos/tareas";
import { actualizarAvance } from "./js/funciones/avance";
import "bootstrap";
import "./style.scss";

// React
import "./components/App";

document.addEventListener("DOMContentLoaded", () => {
  actualizarAvance();
});

if (document.querySelector(".alerta")) {
  console.log("go");
  setTimeout(() => {
    document.querySelector(".alerta").remove();
  }, 3000);
}
