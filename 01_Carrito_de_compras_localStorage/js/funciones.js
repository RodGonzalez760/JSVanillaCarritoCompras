import { 
    carrito, 
    contenedorCarrito, 
    btnVaciarCarrito, 
    listaCursos 
} from './selectores.js';

let articulosCarrito = [];

registrarEventListener();
function registrarEventListener(){

    listaCursos.addEventListener('click', agregarCurso);

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];

        carritoHTML();
    })
    carrito.addEventListener('click', eliminarCurso);

    btnVaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHtml();
    });

}


function agregarCurso(e) {

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

function eliminarCurso(e) {

    console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML();
    }

}

function leerDatosCurso(curso){

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) {

        const cursos = articulosCarrito.map( curso => {
            if ( curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });

        articulosCarrito = [...cursos];
        
    } else {

        articulosCarrito = [...articulosCarrito, infoCurso];

    }


    console.log(articulosCarrito);

    carritoHTML();
}

function carritoHTML(){

    limpiarHtml();

    articulosCarrito.forEach( curso => {

        const { imagen, titulo, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
             <img src="${imagen}" width="100"> 
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>    
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        contenedorCarrito.appendChild(row);
    });

    sincronizarStorage();

}

function sincronizarStorage () {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHtml(){

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}