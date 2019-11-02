<?php 

	require 'conexion_hospital.php';
	$respuesta=null;
	
	try {
		//recuperar los datos del formulario
		$idpaciente=$_POST['idpaciente'];
		$nif=$_POST['nif'];
		$nombre=$_POST['nombre'];
		$apellidos=$_POST['apellidos'];
		$fechaIngreso=$_POST['fechaingreso'];
		$fechaAlta=$_POST['fechaalta'];
		
		//stmt = sentencia es una variable // dbh es la conexion
		$stmt=$dbh->PREPARE("UPDATE paciente SET nif=:nif, nombre=:nombre, apellidos=:apellidos , fechaingreso=:fechaingreso, fechaalta=:fechaalta WHERE idpaciente=:idpaciente");
		//bind de los parametros // asigna los valores a la sentencia preparada
		$stmt->bindParam(':idpaciente', $idpaciente);
		$stmt->bindParam(':nif', $nif);
		$stmt->bindParam(':nombre', $nombre);
		$stmt->bindParam(':apellidos', $apellidos);
		$stmt->bindParam(':fechaingreso', $fechaIngreso);
		$stmt->bindParam(':fechaalta', $fechaAlta);

		//Ejecutar la sentencia
		$stmt->execute();
		
		$mensaje="Modificación datos del paciente $idpaciente realizada"." <<".$stmt->rowCount().">>";
		$respuesta=array('codigo'=>'00', 'mensaje'=> $mensaje);
		echo json_encode($respuesta);

				
	}catch (PDOException $e) {
		//excepciones que se produzcan en el acceso a la bd
						//ojo errorInfo es un array
		if ($stmt->errorInfo()[1] == 1146) {
			$mensaje='tabla no existe';
			$respuesta=array('codigo'=>$stmt->errorInfo()[1], 'mensaje'=> $mensaje);
		} else {
			$respuesta=array('codigo'=>$e->getCode(), 'mensaje'=> $e->getMessage());
			
		}
		echo json_encode($respuesta);

	}catch (Exception $e) {
		$respuesta=array('codigo'=>$e->getCode(), 'mensaje'=> $e->getMessage());
		echo json_encode($respuesta);
	}

?>