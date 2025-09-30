document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const tabla = document.querySelector("#tablaEventos tbody");
  const modal = document.getElementById("modal");
  const cerrarModal = document.getElementById("cerrarModal");
  const detalleEvento = document.getElementById("detalleEvento");

  // Cargar eventos al inicio
  fetch("http://localhost:9003/eventos/todos")
    .then(res => res.json())
    .then(data => {
      data.forEach(agregarFila);
    });

  // Evento submit
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formulario);
    const datos = {};

    formData.forEach((valor, clave) => {
      datos[clave] = valor;
    });

    fetch("http://localhost:9003/eventos/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(nuevoEvento => {
      agregarFila(nuevoEvento);
      formulario.reset();
    });
  });

  function agregarFila(evento) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${evento.nombre}</td>
      <td>${evento.apellido}</td>
      <td>${evento.correo}</td>
      <td>${evento.telefono}</td>
      <td><button class="ver-btn" data-evento='${JSON.stringify(evento)}'>Ver</button></td>
    `;

    tabla.appendChild(fila);
  }

  tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("ver-btn")) {
      const evento = JSON.parse(e.target.dataset.evento);
      mostrarDetalle(evento);
    }
  });

  cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  function mostrarDetalle(evento) {
    detalleEvento.innerHTML = `
      <p><strong>Nombre:</strong> ${evento.nombre}</p>
      <p><strong>Apellido:</strong> ${evento.apellido}</p>
      <p><strong>Correo:</strong> ${evento.correo}</p>
      <p><strong>Teléfono:</strong> ${evento.telefono}</p>
      <p><strong>Tipo de Evento:</strong> ${evento.tipoEvento}</p>
      <p><strong>Cantidad de Personas:</strong> ${evento.cantidadPersonas}</p>
      <p><strong>Fecha:</strong> ${evento.fecha}</p>
      <p><strong>Hora:</strong> ${evento.hora}</p>
      <p><strong>Dirección:</strong> ${evento.direccion}</p>
      <p><strong>Duración:</strong> ${evento.duracion}</p>
      <p><strong>Descripción:</strong> ${evento.descripcion}</p>
    `;
    modal.style.display = "block";
  }

  // Cierra el modal si se hace clic fuera del contenido
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
