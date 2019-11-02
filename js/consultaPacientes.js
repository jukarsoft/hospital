//consulta de la relación de pacientes // pagina =indica la paginación
function consultaPacientes(pagina) {
	//alert ('consultaPacientes');
	
	//borrado de la relación 
	document.getElementById('pacientes').innerHTML='';
	var datos = new FormData();
	datos.append('pagina',pagina);
	//ajax - obtener relación de pacientes
	fetch ('consultaPacientes.php', {
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
		console.log(datos);
		codigo=datos[0].codigo;
		mensaje=datos[0].mensaje;
		if (codigo!='00') {
			throw mensaje, codigo;
		}
		//paciente=datos[1];
		//paginas=datos[2];
		//funcion para mostrar la relación de pacientes en  el formulario
		mostrarListaPacientes(datos[1]);
		//montar los enlaces de paginación
		mostrarPaginas(datos[2]);

		console.log(datos);
	})
	.catch(function (error) {
		alert (error);
		if (error!='00') {
			alert (`error: ${error} - ${mensaje}`);
		}
	})
}

//Muestra la relación de pacientes que contiene la bbdd hospital tabla paciente
function mostrarListaPacientes(paciente) {
	//datos es un array js
	//alert (datos);
	//los datos obtenidos en el servidor son cargados en la tabla
	var tabla="<tr><th>idPaciente</th><th>nif</th><th>nombre</th><th>apellidos</th><th>fechaIngreso</th><th>fechaAlta</th></tr>";
	for (i in paciente) {
		tabla+="<tr class='tr'>";
			tabla+=`<td class='id'>${paciente[i]['idpaciente']}</td>`;
			tabla+=`<td>${paciente[i]['nif']}</td>`;
			//tabla+=`<td>${paciente[i].nif}</td>`; //otra manera de recoger el objeto
			tabla+=`<td>${paciente[i]['nombre']}</td>`;
			tabla+=`<td>${paciente[i]['apellidos']}</td>`;
			tabla+=`<td>${paciente[i]['fechaingreso']}</td>`;
			tabla+=`<td>${paciente[i]['fechaalta']}</td>`;
		tabla+="</tr>";
		
	}
	document.getElementById('pacientes').innerHTML=tabla;
	//se activa listener por cada linea de registro ('tr') class='tr'
	var fila=document.querySelectorAll('.tr');
	for (i=0;i<fila.length;i++) {
		fila[i].addEventListener('click', consultaPaciente);
		fila[i].style.cursor="pointer";
	}
}

//montar los listener 
function mostrarPaginas(paginas) {
	var enlaces = '';
	for (i=1; i <= paginas; i++) {
		if (i==pagina) {
			enlaces+= "<span style='font-weight:bold; font-size:large;'>" + i + "</span>&nbsp&nbsp&nbsp ";
		} else {
			enlaces+= "<span> " + i + "</span>&nbsp&nbsp&nbsp ";
		}
		
	}
	document.getElementById('paginas').innerHTML = enlaces;
	//activar los listener para la paginación (id + span)
	var span=document.querySelectorAll('#paginas span');

	for (i=0; i<span.length; i++) {
		span[i].addEventListener('click', function() {
				//recuperar el número de página 
				pagina=this.innerText;
				//llamar a la función consultarPacientes
				consultaPacientes(pagina);
		})
	}
}	
