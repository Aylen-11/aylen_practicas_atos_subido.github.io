//nombre cliente
window.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("nombreCliente");
    
    if (nombre) {
        document.getElementById("nombreCliente").textContent = nombre;
        
    } else {
        document.getElementById("nombreCliente").textContent = "cliente";
    }
});

const idCliente = localStorage.getItem("idUsuario");
console.log("ID de cliente/usuario: " + idCliente);

const form1 = document.getElementById('formulario');
const tablaCuerpo = document.getElementById('tabla_cuerpo');

async function getEventos() {
    console.log("lista eventos")
    const tablaCuerpo = document.getElementById('tabla_cuerpo'); //llamamos a la tabla

    try {
        const res = await fetch(`http://localhost:9003/reservas/usuario/${idCliente}`); //conecta con la base de datos
        const data = await res.json(); //convierte los datos a json
        console.log("reservas/usuario/idCliente: " + JSON.stringify(data)); //muestra el array en la consola

        tablaCuerpo.innerHTML = ''; //limpiar lista
        //if (data )
        data.forEach(e => { //para cada uno
            const tr = document.createElement('tr'); //crea la row

            //creacion de bloques

            const tdNombreEvento = document.createElement('td');
            tdNombreEvento.textContent = e.evento.nombre;
            tr.appendChild(tdNombreEvento);

            const tdTipoEvento = document.createElement('td');
            tdTipoEvento.textContent = e.evento.tipo.nombre;
            tr.appendChild(tdTipoEvento);

            const tdEstado = document.createElement('td');
            tdEstado.textContent = e.evento.estado;
            tr.appendChild(tdEstado);

            const tdPrecio= document.createElement('td');
            tdPrecio.textContent = e.evento.precio;
            tr.appendChild(tdPrecio);

            const tdCantidad = document.createElement('td');
            tdCantidad.textContent = e.cantidad;
            tr.appendChild(tdCantidad);

            //botones

            //boton ver
            const tdVer = document.createElement('td');
            const btnVer = document.createElement('button');
            btnVer.textContent = 'Ver detalles';
            btnVer.classList.add('btn-ver');
            tdVer.appendChild(btnVer);
            tr.appendChild(tdVer); 

            btnVer.addEventListener('click', async () => {

                try {
                    const listaVer = document.getElementById('listaVer');
                    listaVer.innerHTML = '';

                    const contenedorVer = document.getElementById('contenedorVer');
                    // Mostrar el contenedor
                    contenedorVer.style.display = 'flex';

                    console.log("id de evento: " + e.evento.idEvento);
                    console.log("descripcion : " + e.evento.descripcion);

                    const ulDescripcion = document.createElement('ul');
                    ulDescripcion.textContent = `Descripcion: ${e.evento.descripcion}`;

                    const ulObservaciones = document.createElement('ul');
                    ulObservaciones.textContent = `Observaciones: ${e.observaciones}`;

                    const ulAforoMaximo = document.createElement('ul');
                    ulAforoMaximo.textContent = `Aforo máximo: ${e.evento.aforoMaximo}`;

                    const ulFechaInicio = document.createElement('ul');
                    ulFechaInicio.textContent = `Fecha inicio: ${e.evento.fechaInicio}`;

                    const ulFechaAlta = document.createElement('ul');
                    ulFechaAlta.textContent = `Fecha alta: ${e.evento.fechaAlta}`;

                    const ulDireccion = document.createElement('ul');
                    ulDireccion.textContent = `Direccion: ${e.evento.direccion}`;

                    const ulDuracion = document.createElement('ul');
                    ulDuracion.textContent = `Duracion: ${e.evento.duracion}`;

                    const ulUnidadDuracion = document.createElement('ul');
                    ulUnidadDuracion.textContent = `Unidad duracion: ${e.evento.unidadDuracion}`;

                    const botonCerrar = document.createElement('button');
                    botonCerrar.type = 'button';
                    botonCerrar.textContent = 'Cerrar';
                    botonCerrar.addEventListener('click', () => {
                        contenedorVer.style.display = 'none';
                    });

                    listaVer.appendChild(ulDescripcion);
                    listaVer.appendChild(ulObservaciones);
                    listaVer.appendChild(ulAforoMaximo);
                    listaVer.appendChild(ulFechaInicio);
                    listaVer.appendChild(ulFechaAlta);
                    listaVer.appendChild(ulDireccion);
                    listaVer.appendChild(ulDuracion);
                    listaVer.appendChild(ulUnidadDuracion);
                    listaVer.appendChild(botonCerrar);



                } catch (error) {
                    console.log("Error boton ver")
                }
            });


            //boton modificar 

            const tdModificar = document.createElement('td');
            const btnModificar = document.createElement('button');
            btnModificar.textContent = 'Modificar';
            btnModificar.classList.add('btn-modificar');
            tdModificar.appendChild(btnModificar);
            tr.appendChild(tdModificar);

            btnModificar.addEventListener('click', async () => {
                try {
                    const idReserva = e.idReserva; // guardamos el id correcto aquí


                    const formu = document.getElementById('formularioModificar');
                    formu.innerHTML = ''; // Limpiar por si acaso

                    const inputCantidad = document.createElement('input');
                    inputCantidad.value = e.cantidad;

                    const botonGuardar = document.createElement('button');
                    botonGuardar.type = 'submit';
                    botonGuardar.textContent = 'Guardar';
                    botonGuardar.classList.add('btn-guardar');

                    const botonCerrar = document.createElement('button');
                    botonCerrar.type = 'button';
                    botonCerrar.textContent = 'Cerrar';
                    botonCerrar.classList.add('btn-cerrar');

                    botonCerrar.addEventListener('click', () => {
                        document.getElementById('formularioModificar').innerHTML = '';
                    });

                    formu.appendChild(inputCantidad)
                    formu.appendChild(botonGuardar);
                    formu.appendChild(botonCerrar);

                    formu.addEventListener('submit', async (event) => {
                        event.preventDefault();

                        const nuevaCantidad = parseInt(inputCantidad.value);
                        console.log("CANTIDAD NUEVAAAA " +nuevaCantidad);

                        await fetch(`http://localhost:9003/reservas/modificar/${idReserva}/${nuevaCantidad}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ cantidad: nuevaCantidad })

                        });

                        document.getElementById('formularioModificar').innerHTML = '';
                        await getEventos();
                    });

                } catch (error) {
                    console.log("error en modificar")
                }

            });


            //boton eliminar

            const tdEliminar = document.createElement('td');
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Cancelar';
            btnEliminar.classList.add('btn-eliminar');
            tdEliminar.appendChild(btnEliminar);
            tr.appendChild(tdEliminar);
            

            async function eliminarEventos() {
                const elmi = await fetch(`http://localhost:9003/reservas/eliminar/${e.idReserva}`, {
                    method: 'DELETE',
                });

            }

            btnEliminar.addEventListener('click', async () => {
                const confirmacion = confirm(`¿Estás seguro que quieres eliminar el evento ${e.evento.nombre}?`);
                console.log("id de la reserva:" + e.idReserva);
                if (!confirmacion) return;

                await eliminarEventos();
                await getEventos();
            })


            // Finalmente, se añade y renderiza la tabla
            tablaCuerpo.appendChild(tr);

        });


    }
    catch (error) {
        console.log("error get evento: " , error);
    }
}


getEventos(); //se renderiza los datos pero en la consola