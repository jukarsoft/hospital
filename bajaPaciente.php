<?php 

	require 'conexion_hospital.php';

	$respuesta=null;
	try {
		//carga atributos recibidos
		$idpaciente=$_POST['idpaciente'];
		//stmt = sentencia es una variable // dbh es la conexion
		//la sentencia es preparada con los parametros
		$stmt=$dbh->PREPARE("DELETE FROM paciente WHERE idpaciente=:idpaciente");
		//bind de los parametros // asigna los valores a la sentencia preparada
		$stmt->bindParam(':idpaciente', $idpaciente);
		//Ejecutar la sentencia
		$stmt->execute();
		//maquetación de la respuesta 
		$mensaje="Baja paciente $idpaciente realizada"." <<".$stmt->rowCount().">>";
		$respuesta=array('codigo'=>'00', 'mensaje'=> $mensaje);
		echo json_encode($respuesta);

	}catch (PDOException $e) {
		//excepciones que se produzcan en el acceso a la bd
						//ojo errorInfo es un array
		if ($stmt->errorInfo()[1] == 1451) {
			$mensaje='paciente con datos foraneos, no se puede borrar';
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