import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.getElementById('eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click', e =>{
        const urlProyecto = e.target.dataset.proyectoUrl;
        // console.log(urlProyecto);
        Swal.fire({
            title: 'Deseas eliminar este proyecto?',
            text: "Un proyecto eliminar no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //Enviar petición a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, { params: urlProyecto })
                 .then(respuesta =>{
                    console.log(respuesta)

                    Swal.fire(
                      'Proyecto  Eliminado',
                       respuesta.data,
                      'success'
                    );
                      return;
                    setTimeout(()=>{
                      window.location.href = '/'
                    }, 3000)
                 })
                 .catch(()=>{
                   Swal.fire(
                     'Hubo un error',
                     'No se pudo eliminar el Proyecto',
                     'error'
                   )
                 })
             
            }
          })
    })
}

export default btnEliminar