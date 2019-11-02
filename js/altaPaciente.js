//Alta nuevo paciente
function altaPaciente() {
	//alert ('altaPaciente');
	//Obtener datos del contenido del formulario
	var nif = document.getElementById('nif').value.trim();
	var nombre = document.getElementById('nombre').value.trim();
	var apellidos = document.getElementById('apellidos').value.trim();
	var fechaIngreso = document.getElementById('fechaingreso').value.trim();
	var fechaAlta = document.getElementById('fechaalta').value.trim();
	try {
		//validar formulario
		if (nif.trim()=='' || nif.length<9) {
			document.getElementById('nif').classList.add('error');
		}
		if (nombre.trim()=='') {
			document.getElementById('nombre').classList.add('error');
		}
		if (apellidos.trim()=='') {
			document.getElementById('apellidos').classList.add('error');
		}
		if (fechaIngreso.trim()=='' || fechaIngreso==null) {
			document.getElementById('fechaingreso').classList.add('error');
		}
		if (nombre.trim()=='' || apellidos.trim()=='' || nif.trim()=='' || fechaIngreso.trim()=='' || fechaIngreso==null){
			//alert ('nif, nombre, apellidos, fecha ingreso,  son datos obligatorios');
			throw	"10 << todos los datos son obligatorios, excepto la fecha de alta >>";
			return;
		}
		if (nif.length<9) {
			throw	"11 << formato del nif no correcto >>";
			return;
		}
		valor=validarNIF(nif);
		if (!valor) {
			throw	"12 << NIF no válido >>";	
			return;
		}

	}catch (e) {
		error=e.substr(0,2);
		mensaje=e.substr(3);
		alert (`error: ${error}  ${mensaje}`);
		return
	}
	
	//PDO - formateo datos o encapsulado de datos al servidor 
	//para enviar al servidor clave:pareja:valor
	//opcion 1 - creamos un objeto atributo a atributo
	var datos = new FormData();
	datos.append('nif',nif);
	datos.append('nombre',nombre);
	datos.append('apellidos',apellidos);
	datos.append('fechaingreso',fechaIngreso);
	datos.append('fechaalta',fechaAlta);
	//opcion 2 - recoge todo el formulario por 'name'
	//var datos = new FormData(formulario);
	

	
	//llamada AJAX al servidor  // fetch
	fetch('altaPaciente.php',{
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
		if (datos.codigo=='00') {
			document.getElementById('formulario').reset();
			//document.getElementById('nif').value="";
			//document.getElementById('nombre').value="";
			//document.getElementById('apellidos').value="";
			//document.getElementById('fechaingreso').value="";
			//document.getElementById('fechaalta').value="";
			document.getElementById('alta').style.display='initial'; 
			document.getElementById('modificacion').style.display='none'; 
			document.getElementById('baja').style.display='none'; 

			alert (datos.mensaje);
			//alert ('complete');
		} else {
			alert (`error en el alta: ${datos.codigo}, ${datos.mensaje}`);
		}
		//recarga de la relación de pacientes de la tabla paciente
		consultaPacientes(pagina);
		
	})
	.catch(function(error) {
		//captura de los errores
		alert (error);
		if (error.codigo!='00') {
			alert ('error:' + error.codigo + ' ' + error.mensaje);
		} 
	})

}
