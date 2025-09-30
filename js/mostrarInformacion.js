function llenarTabla() {
    var tbody = document.querySelector('#tablaInformacion tbody');
    tbody.innerHTML = '';

  
    var aNombre = JSON.parse(localStorage.getItem('nombre_personas')) || [];
    var aApellido = JSON.parse(localStorage.getItem('apellido_personas')) || [];
    var aEdad = JSON.parse(localStorage.getItem('contraseña_personas')) || [];
    var aCorreoElectronico = JSON.parse(localStorage.getItem('correo_personas')) || [];
    var aNumeroTelefono = JSON.parse(localStorage.getItem('numero_personas')) || [];

    var nCantidadPersonas = Math.min(
        aNombre.length,
        aApellido.length,
        aContraseña.length,
        aCorreoElectronico.length,
        aNumeroTelefono.length,
        10
    );
    
  
    for (var i = 0; i < nCantidadPersonas; i++) {
        var fila = document.createElement('tr');

        var celdaNombre = document.createElement('td');
        var celdaApellido = document.createElement('td');
        var celdaContraseña = document.createElement('td');
        var celdaCorreo = document.createElement('td');
        var celdaNumero = document.createElement('td');

        celdaNombre.textContent = aNombre[i];
        celdaApellido.textContent = aApellido[i];
        celdaContraseña.textContent = aContraseña[i];
        celdaCorreo.textContent = aCorreoElectronico[i];
        celdaNumero.textContent = aNumeroTelefono[i];

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellido);
        fila.appendChild(celdaContraseña);
        fila.appendChild(celdaCorreo);
        fila.appendChild(celdaNumero);

        tbody.appendChild(fila);
    }

  
    document.querySelector('#btnDescargar').addEventListener('click', function () {
        var data = {
            nombre: aNombre,
            apellido: aApellido,
            aContraseña: aContraseña,
            correo: aCorreoElectronico,
            telefono: aNumeroTelefono
        };
        var jsonData = JSON.stringify(data, null, 2);
        var blob = new Blob([jsonData], { type: 'application/json' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'datos_registros.json';
        link.click();
    });
}

document.addEventListener('DOMContentLoaded', llenarTabla);
