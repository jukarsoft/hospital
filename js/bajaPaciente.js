//Alta nuevo paciente
function bajaPaciente() {
	//alert ('bajaPaciente');
	//obtener el id del paciente seleccionado
	var idpaciente=document.getElementById('idpaciente').value;
	if (idpaciente=='') {
		return
	}
	if (!confirm('estas seguro?')) {
		return
	}
	//PDO - formateo datos o encapsulado de datos al servidor 
	//para enviar al servidor clave:pareja:valor
	//creamos un objeto
	var datos = new FormData();
	datos.append('idpaciente', idpaciente);

	fetch('bajaPaciente.php',{
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
		if (datos.codigo == '1451') {
			alert (`error en la baja: ${datos.codigo} - ${datos.mensaje}`)
			return
		}
		else if (datos.codigo!='00'){
			alert (`error en la baja: ${datos.codigo} - ${datos.mensaje}`)
			return
		}
		document.getElementById('formulario').reset();
		
		//recarga de la relación de pacientes de la tabla paciente	
		consultaPacientes(pagina);

		//activación/desactivación de los botones
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
		} 
	})


}