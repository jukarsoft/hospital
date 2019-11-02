//Modificacion datos del paciente
function modifPaciente() {
	//alert ('modifPaciente');
	//recuperar los datos del formulario

	try {
		var idpaciente = document.getElementById('idpaciente').value;
		var nif = document.getElementById('nif').value;
		var nombre = document.getElementById('nombre').value;
		var apellidos = document.getElementById('apellidos').value;
		var fechaIngreso = document.getElementById('fechaingreso').value;
		var fechaAlta = document.getElementById('fechaalta').value;
		//verificar que haya un paciente seleccionado
		if (idpaciente=='') {
			return
		}
		valor=validarNIF(nif);
		if (!valor) {
			throw	"12 << NIF no válido >>";
			return;
		}


		} catch (e) {
			error=e.substr(0,2);
			mensaje=e.substr(3);
			alert (`error: ${error}  ${mensaje}`);
			return
		}
	
	//petición al servidor
	//para enviar al servidor clave:pareja:valor
	//creamos un objeto
	var datos = new FormData();
	datos.append('idpaciente',idpaciente);
	datos.append('nif',nif);
	datos.append('nombre',nombre);
	datos.append('apellidos',apellidos);
	datos.append('fechaingreso',fechaIngreso);
	datos.append('fechaalta',fechaAlta);

	fetch('modifPaciente.php',{
		method: 'POST',
		body: datos
	})
	.then(function(respuesta) {
		//primera respuesta del servidor como que ha recibido la petición
		if (respuesta.ok) {
			return respuesta.json();
		} else {
			throw "error en la llamada AJAX",88;
		}
	})
	. then (function(datos) {
		//servidor a procesado los datos y nos lo devuelve
		//alert (datos);
		if (datos.codigo!='00') {
			alert (`${datos.mensaje}`);
			return
		}
		document.getElementById('formulario').reset();
		//cargar relacion de pacientes
		consultaPacientes(pagina);
		//tratamiento botones 
		document.getElementById('modificacion').style.display='none'; 
		document.getElementById('baja').style.display='none'; 
		document.getElementById('alta').style.display='initial'; 
		
		//document.getElementById('modificar').disabled=true;
		//document.getElementById('borrar').disabled=true;
		//document.getElementById('enviar').disabled=false;
		alert (`${datos.mensaje}`);
	}) 
	.catch(function(error) {
		//captura de los errores
		//alert (error);
		if (error.codigo!='00') {
			alert ('error:' + error.codigo + ' ' + error.mensaje);
			window.location.href = 'pantallanterior.html'

		} 
	})
}