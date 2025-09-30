
//carrusel

let indiceActual = 0;
const imagenes = document.querySelectorAll(".carrusel-img");

function mostrarImagen(index) {
  imagenes.forEach((img, i) => {
    img.classList.remove("activa");
    if (i === index) img.classList.add("activa");
  });
}

function moverCarrusel(direccion) {
  indiceActual += direccion;
  if (indiceActual < 0) indiceActual = imagenes.length - 1;
  if (indiceActual >= imagenes.length) indiceActual = 0;
  mostrarImagen(indiceActual);
}

mostrarImagen(indiceActual);

