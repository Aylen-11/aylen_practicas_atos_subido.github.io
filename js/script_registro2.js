const form1 = document.getElementById('formulario');
const tablaCuerpo = document.getElementById('tabla_cuerpo');

async function getEventos() {
    console.log("lista eventos")
    const tablaCuerpo = document.getElementById('tabla_cuerpo'); //llamamos a la tabla

    try {
        const res = await fetch('http://localhost:9003/eventos/todos'); //conecta con la base de datos
        const data = await res.json(); //convierte los datos a json
        console.log(data); //muestra el array en la consola

        tablaCuerpo.innerHTML = ''; //limpiar lista
        //if (data )
        data.forEach(e => { //para cada uno
            const tr = document.createElement('tr'); //crea la row

            //creacion de bloques
            const tdId = document.createElement('td');
            tdId.textContent = e.idEvento;
            tr.appendChild(tdId);

            const tdNombre = document.createElement('td');
            tdNombre.textContent = e.nombre;
            tr.appendChild(tdNombre);

            const tdEstado = document.createElement('td');
            tdEstado.textContent = e.estado;
            tr.appendChild(tdEstado);

            const tdPrecio = document.createElement('td');
            tdPrecio.textContent = e.precio;
            tr.appendChild(tdPrecio);

            const tdAforo = document.createElement('td');
            tdAforo.textContent = e.aforoMaximo;
            tr.appendChild(tdAforo);

            //botones

            //boton ver
           // Botón ver
           const tdVer = document.createElement('td');
           const btnVer = document.createElement('button');
           btnVer.textContent = 'Ver';
           btnVer.classList.add('btn-ver');
           tdVer.appendChild(btnVer);
           tr.appendChild(tdVer);

           btnVer.addEventListener('click', async () => {
               try {
                   const res = await fetch(`http://localhost:9003/eventos/uno/${e.idEvento}`);
                   const ver = await res.json();
                   console.log(ver);

                   const listaVer = document.getElementById('listaVer');
                   listaVer.innerHTML = '';

                   const ulDescripcion = document.createElement('ul');
                   ulDescripcion.textContent = `Descripcion: ${ver.descripcion}`;

                   const ulFechaInicio = document.createElement('ul');
                   ulFechaInicio.textContent = `Fecha inicio: ${ver.fechaInicio}`;

                   const ulFechaAlta = document.createElement('ul');
                   ulFechaAlta.textContent = `Fecha alta: ${ver.fechaAlta}`;

                   const ulDireccion = document.createElement('ul');
                   ulDireccion.textContent = `Direccion: ${ver.direccion}`;

                   const ulDuracion = document.createElement('ul');
                   ulDuracion.textContent = `Duracion: ${ver.duracion}`;

                   const ulUnidadDuracion = document.createElement('ul');
                   ulUnidadDuracion.textContent = `Unidad duracion: ${ver.unidadDuracion}`;

                   const botonCerrar = document.createElement('button');
                   botonCerrar.type = 'button';
                   botonCerrar.textContent = 'Cerrar';
                   botonCerrar.classList.add('boton-cerrar');
                   botonCerrar.addEventListener('click', () => {
                       listaVer.innerHTML = '';
                       document.getElementById('contenedorVer').style.display = 'none'; 
                   });

                   listaVer.appendChild(ulDescripcion);
                   listaVer.appendChild(ulFechaInicio);
                   listaVer.appendChild(ulFechaAlta);
                   listaVer.appendChild(ulDireccion);
                   listaVer.appendChild(ulDuracion);
                   listaVer.appendChild(ulUnidadDuracion);
                   listaVer.appendChild(botonCerrar);

                   // Mostrar el modal
                   document.getElementById('contenedorVer').style.display = 'flex';

               } catch (error) {
                   console.log("Error boton ver", error);
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
                    const res = await fetch(`http://localhost:9003/eventos/uno/${e.idEvento}`)
                    const data = await res.json();
                    console.log(data);

                    const formu = document.getElementById('formularioModificar');
                    formu.innerHTML = '';

                    const inputNombre = document.createElement('input');
                    inputNombre.value = data.nombre;

                    const inputDescripcion = document.createElement('input');
                    inputDescripcion.value = data.descripcion;

                    const inputFechaInicio = document.createElement('input');
                    inputFechaInicio.value = data.fechaInicio;

                    const inputDuracion = document.createElement('input');
                    inputDuracion.value = data.duracion;

                    const inputUnidadDuracion = document.createElement('input');
                    inputUnidadDuracion.value = data.unidadDuracion;

                    const inputDireccion = document.createElement('input');
                    inputDireccion.value = data.direccion;

                    const inputAforo = document.createElement('input');
                    inputAforo.value = data.aforoMaximo;

                    const inputEstado = document.createElement('input');
                    inputEstado.value = data.estado;

                    const inputDestacado = document.createElement('input');
                    inputDestacado.value = data.destacado;

                    const inputPrecio = document.createElement('input');
                    inputPrecio.value = data.precio;

                    const inputTipo = document.createElement('input');
                    inputTipo.value = data.tipo.idTipo;

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


                    formu.appendChild(inputNombre);
                    formu.appendChild(inputDescripcion);
                    formu.appendChild(inputFechaInicio);
                    formu.appendChild(inputDuracion);
                    formu.appendChild(inputUnidadDuracion);
                    formu.appendChild(inputDireccion);
                    formu.appendChild(inputAforo);
                    formu.appendChild(inputEstado);
                    formu.appendChild(inputDestacado);
                    formu.appendChild(inputPrecio);
                    formu.appendChild(inputTipo);
                    formu.appendChild(botonGuardar);
                    formu.appendChild(botonCerrar);

                    formu.addEventListener('submit', async (e) => {
                        e.preventDefault();

                        const nuevoEvento2 = {
                            nombre: inputNombre.value,
                            descripcion: inputDescripcion.value,
                            fechaInicio: inputFechaInicio.value,
                            duracion: parseInt(inputDuracion.value),
                            unidadDuracion: inputUnidadDuracion.value,
                            direccion: inputDireccion.value,
                            aforoMaximo: parseInt(inputAforo.value),
                            estado: inputEstado.value,
                            destacado: inputDestacado.value,
                            precio: parseInt(inputPrecio.value),
                            tipo: { idTipo: parseInt(inputTipo.value) },
                        };
                        console.log(data.idEvento);

                        await fetch(`http://localhost:9003/eventos/modificar/${data.idEvento}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(nuevoEvento2)

                        });

                        document.getElementById('formularioModificar').innerHTML = '';
                        await getEventos();
                    });

                } catch (error) {
                    console.log("error formu2")
                }

            });

            //boton ver reserva 

            const tdVerReserva = document.createElement('td');
            const botonVerReserva = document.createElement('button');
            botonVerReserva.textContent = 'Ver reserva';
            botonVerReserva.classList.add('btn-verreserva');
            
            tdVerReserva.appendChild(botonVerReserva);
            tr.appendChild(tdVerReserva);

            botonVerReserva.addEventListener('click', async () => {
                try {
                    const resReservas = await fetch(`http://localhost:9003/reservas/evento/${e.idEvento}`);
                    const reservas = await resReservas.json();

                    if (reservas && reservas.length > 0) {
                       const listaReserva = document.getElementById('listaReserva');
                        listaReserva.innerHTML = '';

                        reservas.forEach(reserva => {
                            const ulIdReserva = document.createElement('ul');
                            ulIdReserva.textContent = `ID Reserva: ${reserva.idReserva}`;

                            const ulEmail = document.createElement('ul'); 
                            ulEmail.textContent = `Email: ${reserva.email}`;
 
                            const ulNombreCliente = document.createElement('ul');
                            ulNombreCliente.textContent = `Cliente: ${reserva.nombre} ${reserva.apellidos}`;

                            const ulAforoMaximo = document.createElement('ul');
                            ulAforoMaximo.textContent = `Aforo: ${reserva.aforoMaximo}`;

                            const ulPrecioEvento = document.createElement('ul');
                            ulPrecioEvento.textContent = `Precio Evento: ${reserva.precioEvento}`;

                            const ulCantidad = document.createElement('ul');
                            ulCantidad.textContent = `Cantidad: ${reserva.cantidad}`;

                            const ulPrecioVenta = document.createElement('ul');
                            ulPrecioVenta.textContent = `Precio Venta: ${reserva.precioVenta}`;

                            const botonCerrar = document.createElement('button');
                            botonCerrar.type = 'button';
                            botonCerrar.textContent = 'Cerrar';
                            botonCerrar.classList.add('btn-cerrar');
                            botonCerrar.addEventListener('click', () => {
                                listaReserva.innerHTML = '';
                                document.getElementById("contenedorReserva").innerHTML = '';
                                document.getElementById("contenedorReserva").style.display = 'none'; 
                            });

                            listaReserva.appendChild(ulIdReserva);
                            listaReserva.appendChild(ulEmail);
                            listaReserva.appendChild(ulNombreCliente);
                            listaReserva.appendChild(ulAforoMaximo);
                            listaReserva.appendChild(ulPrecioEvento);
                            listaReserva.appendChild(ulCantidad);
                            listaReserva.appendChild(ulPrecioVenta);
                            listaReserva.appendChild(botonCerrar);

                        });
                    } else {
                        // Si no hay reservas
                        const listaReserva = document.getElementById('listaReserva');
                        listaReserva.innerHTML = '<li>No hay reservas para este evento.</li>';
                    }
                    document.getElementById('contenedorReserva').style.display = 'flex';


                } catch (error) {
                    console.log("Error boton ver reserva")
                }
            })

            //boton eliminar

            const tdEliminar = document.createElement('td');
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.classList.add('btn-eliminar');
            tdEliminar.appendChild(btnEliminar);
            tr.appendChild(tdEliminar);

            async function eliminarEventos() {
                const elmi = await fetch(`http://localhost:9003/eventos/eliminar/${e.idEvento}`, {
                    method: 'DELETE',
                });

            }

            btnEliminar.addEventListener('click', async () => {
                const confirmacion = confirm(`¿Estás seguro que quieres eliminar el evento ${e.nombre}?`);
                if (!confirmacion) return;

                await eliminarEventos();
                await getEventos();
            })


            // Finalmente, se añade y renderiza la tabla
            tablaCuerpo.appendChild(tr);

        });


    }
    catch (error) {
        console.log("error get eventos");
    }
}
//formulario para añadir cosas
form1.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nuevoEvento = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("desc").value,
        fechaInicio: document.getElementById("feIn").value,
        duracion: parseInt(document.getElementById("dura").value),
        unidadDuracion: document.getElementById("uniDura").value,
        direccion: document.getElementById("direc").value,
        aforoMaximo: parseInt(document.getElementById("afMax").value),
        estado: 'ACTIVO',
        destacado: 'N',
        precio: parseInt(document.getElementById("prec").value),
        tipo: { idTipo: parseInt(document.getElementById("tip").value) },
        fechaAlta: new Date().toISOString().split('T')[0],

    }

    try {
        console.log(nuevoEvento);
        const res = await fetch('http://localhost:9003/eventos/alta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoEvento)
        });
        console.log("Respuesta:", res.status, res.statusText);

        if (!res.ok) {
            const errorData = await res.text(); // Intenta ver el cuerpo del error
            console.error("Error en respuesta:", errorData);
            return;
        }
        await getEventos();
        form1.reset();

    } catch (error) {
        console.log("error al añadir evento")
    }


});


getEventos(); //se renderiza los datos pero en la consola