const unidad = {
    tipo: "Curso",
    descripcion: "Curso de JavaScript",
    direccion: "Calle Falsa 123",
    fechaInicio: "2025-06-01",
    fechaAlta: "2025-05-20",
    duracion: "3 meses"
  };


Swal.fire({
    title: 'Információn Del Evento',
    html: `
      <div style="text-align: justify; font-size: 16px; line-height: 1.5;">
        <b>Tipo:</b> ${unidad.tipo} <br>
        <b>Descripción:</b> ${unidad.descripcion} <br>
        <b>Dirección:</b> ${unidad.direccion} <br>
        <b>Fecha de inicio:</b> ${unidad.fechaInicio} <br>
        <b>Fecha de alta:</b> ${unidad.fechaAlta} <br>
        <b>Duración:</b> ${unidad.duracion}
      </div>
    `,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#8B0000',
    customClass: {
      confirmButton: 'boton-grande'
    }
  });