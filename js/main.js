//javascript // principal

//variables globales
var pagina='1';
window.onload=function(){
	//detectar la pulsación del boton enviar
	//activar listener	
	document.getElementById('alta').addEventListener('click', altaPaciente);
	document.getElementById('baja').addEventListener('click', bajaPaciente);
	document.getElementById('modificacion').addEventListener('click', modifPaciente);

	//recarga de la relación de pacientes de la tabla paciente	// carga la pagina inicial a 1
	consultaPacientes(1);
	
	//activación/desactivación de los botones 
	document.getElementById('modificacion').style.display='none'; 
	document.getElementById('baja').style.display='none'; 

}	

//valida el NIF
function validarNIF(nif) {
var lockup = 'TRWAGMYFPDXBNJZSQVHLCKE';
	var valueNif=nif.substr(0,nif.length-1);
	var letra=nif.substr(nif.length-1,1).toUpperCase();
 
	if(lockup.charAt(valueNif % 23)==letra)
		return true;
	return false;
}



	