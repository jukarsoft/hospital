function consultaPaciente() {
	//alert ('consultaPaciente');
	//borrado de la clase .error (clase .error marca los datos obligatorios)
	document.getElementById('nif').classList.remove('error');
	document.getElementById('nombre').classList.remove('error');
	document.getElementById('apellidos').classList.remove('error');
	document.getElementById('fechaingreso').classList.remove('error');
	//obtención de la clave del paciente seleccionado // primer elemento hijo de la linea (tr) seleccionada
	var id=this.firstChild;
	//alert (id.innerText);

	//PDO - formateo datos o encapsulado de datos al servidor 
	//para enviar al servidor clave:pareja:valor
	//creamos un objeto
	var datos = new FormData();
	datos.append('idpaciente',id.innerText);
	//ajax - obtener relación de pacientes
	fetch ('consultaPaciente.php', {
		method: 'POST',
		body: datos
	})
	.then(function(respuesta) {
		if (respuesta.ok) {
			//cambiar el json a text, si queremos ver el error
			return respuesta.json();
		} else {
			throw "error en la petición AJAX",88;
		}
	})
	.then(function(datos) {
		//datos es un array js
		//alert (datos);
		//los datos obtenidos en el servidor son cargados en el formulario
		for (i in datos) {
				document.getElementById('idpaciente').value=datos[i]['idpaciente'];
				document.getElementById('nif').value=datos[i]['nif'];
				document.getElementById('nombre').value=datos[i]['nombre'];
				document.getElementById('apellidos').value=datos[i]['apellidos'];
				document.getElementById('fechaingreso').value=datos[i]['fechaingreso'];
				document.getElementById('fechaalta').value=datos[i]['fechaalta'];
		}
		console.log(datos);
		//activación/desactivación de los botones
		document.getElementById('modificacion').style.display='initial'; 
		document.getElementById('baja').style.display='initial'; 
	})
	.catch(function (error) {
		if (error.codigo!='00') {
			alert ('error:' + error.codigo + ' ' + error.mensaje);
		} else {alert (error);}

	})

}