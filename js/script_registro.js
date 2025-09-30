const form = document.getElementById('formulario');
const tablaCuerpo = document.getElementById('tabla_cuerpo');
const botonDescarga = document.getElementById('descargarJson');
const subirInput = document.getElementById('subirJson');
const mensaje = document.getElementById('mensaje');

const getData = () => JSON.parse(localStorage.getItem('eventos') || '[]');

const renderLista = () => {
    const data = getData();
    tablaCuerpo.innerHTML = ''; //limpia la lista
    data.forEach(p => {
        const tr = document.createElement('tr');
        
        const tdId = document.createElement('td');
        tdId.textContent = p.id; 
        tr.appendChild(tdId); 

        const tdTipoDeEvento = document.createElement('td');
        tdTipoDeEvento.textContent = p.tipo_de_evento; 
        tr.appendChild(tdTipoDeEvento); 
        
        const tdEstado = document.createElement('td');
        tdEstado.textContent = p.estado; 
        tr.appendChild(tdEstado); 
        
        const tdPrecio = document.createElement('td');
        tdPrecio.textContent =p.precio;
        tr.appendChild(tdPrecio);

        const tdVer = document.createElement('td');
        const btnVer = document.createElement('button');
        btnVer.textContent = 'Ver';
        tdVer.appendChild(btnVer);
        tr.appendChild(tdVer);
        
        const tdModificar = document.createElement('td');
        const btnModificar = document.createElement('button');
        btnModificar.textContent = 'Modificar';
        tdModificar.appendChild(btnModificar);
        tr.appendChild(tdModificar);

        const tdEliminar = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        tdEliminar.appendChild(btnEliminar);
        tr.appendChild(tdEliminar);
        

        // Finalmente, añade la fila <tr> al cuerpo de la tabla
        tablaCuerpo.appendChild(tr);
    })

}

form.addEventListener('submit' , (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());

    const data = getData();
    data.push(obj);
    localStorage.setItem('eventos', JSON.stringify(data));

    form.reset();
    renderLista();
});

document.addEventListener("keydown", function(event){
    console.log("Tecla pulsada", event.key);
   if (event.key === "Enter"){
    renderLista();
   }
});

botonDescarga.addEventListener('click', () => {
    const data = getData();
    const blob = new Blob([JSON.stringify(data, null, 2 )], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "eventos.json";
    a.click();
    URL.revokeObjectURL(url);
});

subirInput.addEventListener('change', (e) => {
    const file = e.target.files [0];
    if (!file) return;

    const reader = new FileReader();
      reader.onload = function(event) {
        try {
          const json = JSON.parse(event.target.result);

          if (Array.isArray(json)) {
            localStorage.setItem('eventos', JSON.stringify(json));
            mensaje.textContent = "Archivo JSON cargado correctamente.";
            renderLista();
          } else {
            mensaje.textContent = "El archivo no contiene un array válido.";
          }
        } catch (err) {
          mensaje.textContent = "Error al leer el archivo JSON.";
        }
      };
    
    reader.readAsText(file);
});

renderLista();