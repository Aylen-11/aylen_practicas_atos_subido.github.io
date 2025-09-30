const RegistrarseBoton = document.getElementById('signUp');
const EntrarBoton = document.getElementById('signIn');
const contenedor = document.getElementById('contenedor');

RegistrarseBoton.addEventListener('click', () => {
	contenedor.classList.add("right-panel-active");
});

EntrarBoton.addEventListener('click', () => {
	contenedor.classList.remove("right-panel-active");
});
 

const formRegistro = document.getElementById('formRegistrarse');
const formEntrar = document.getElementById('formEntrar');

formRegistro.addEventListener('submit', async function(e){
	e.preventDefault();

	const nuevoUsuario = {
		nombre: document.getElementById("nombreR").value,
		apellidos: document.getElementById("apellidosR").value,
		email: document.getElementById('emailR').value,
		password: document.getElementById('passwordR').value,
		fechaRegistro: new Date().toISOString().split('T')[0],
	}

	try {
		console.log(nuevoUsuario);
		const res = await fetch('http://localhost:9003/usuarios/alta', {
			method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
		});

		console.log("cliente añadido");

		console.log("añadiendo nombre cliente a la pagina principal...")

		const buscarCliente = await fetch(`http://localhost:9003/usuarios/emailpornombre/${nuevoUsuario.email}`);
		const dataCliente = await buscarCliente.json();

		const nombreCliente = dataCliente[0].nombre;
        console.log("Nombre:", nombreCliente);

		

		localStorage.setItem("nombreCliente", nombreCliente);
				
		
		//formRegistro.reset();
		window.location.href = 'principalClientes.html';
	} catch (error) {
		console.log("Error en formulario")
	}
});

//iniciar sesión
formEntrar.addEventListener('submit', async function (e){
	e.preventDefault();

	const correoUsuario = document.getElementById('emailE').value;
	const passUsuario = document.getElementById('passwordE').value;
	console.log(correoUsuario);
	console.log(passUsuario);
	try {
		const res = await fetch(`http://localhost:9003/usuarios/emailypass/${correoUsuario}/${passUsuario}`);
		const data = await res.json();
		console.log(data);
		console.log(data.length);
		if(data.length == 1){
			console.log("Email y contraseña correcta");
			
			const buscarCliente = await fetch(`http://localhost:9003/usuarios/emailpornombre/${correoUsuario}`);
			const dataCliente = await buscarCliente.json();

			const nombreCliente = dataCliente[0].nombre;
            console.log("Nombre:", nombreCliente);

			const idUsuario =dataCliente[0].idUsuario;
			console.log("ID usuario: " + idUsuario);

			localStorage.setItem("nombreCliente", nombreCliente);
			localStorage.setItem("idUsuario", idUsuario);
				
			window.location.href = 'principalClientes.html';

		}else{
			console.log("Email o contraseña incorrecta");

			const ulError = document.createElement('ul');
			ulError.textContent = "Error, email o contraseña incorrecta";

			formEntrar.appendChild(ulError);

            formEntrar.reset();
		}
		
	} catch (Error) {
		console.log ('error en formulario entrar');
		
	}

});