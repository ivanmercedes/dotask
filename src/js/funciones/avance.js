 export const actualizarAvance = ()=>{
     // Seleccionar las tareas existentes
     const tareas = document.querySelectorAll('li.tarea');

     if(tareas.length){
     // Seleccionar las tareas completadas
     const tareasCompletas = document.querySelectorAll('i.completo');

     // Calcular el avance
     const avance = Math.round((tareasCompletas.length / tareas.length) * 100);

     // mostrar el avance
     const porcentaje = document.getElementById('porcentaje');
     porcentaje.style.width = avance+'%';
     }
  
 }