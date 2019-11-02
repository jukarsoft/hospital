<?php 
	require 'conexion_hospital.php';
	$respuesta=null;
	try {
		//carga atributos recibidos
		$idpaciente=$_POST['idpaciente'];
		if ($idpaciente=='') {
			throw new Exception("no tenemos la clave del paciente", 10);
			
		}
		//la sentencia es preparada con los parametros
		$stmt=$dbh->PREPARE("SELECT * FROM paciente WHERE idpaciente = :idpaciente ORDER BY :idpaciente");
		//bind de los parametros // asigna los valores a la sentencia preparada
		$stmt->bindParam(':idpaciente', $idpaciente);
		// Especificar como se quieren devolver los datos
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
						//$stmt->setFetchMode(PDO::FETCH_NUM);
						//$stmt->setFetchMode(PDO::FETCH_BOTH);
		
		
		//Ejecutar la sentencia
		$stmt->execute();
		
		//numero de filas modificadas
		//echo $stmt->rowCount();

		//bucle para obtener cada una de las filas obtenidas
		$pacientes = array();		
		while ($fila = $stmt->fetch()) {
			array_push($pacientes, $fila);
			//echo "<br>";
			//print_r($pacientes);
		}
		echo json_encode($pacientes);

	}catch (PDOException $e) {
		//echo $e->getCode().' '.$e->getMessage();
		if ($stmt->errorInfo()[1] == 1146) {
			$codigo=$stmt->errorInfo()[1];
			$mensaje='tabla no existe'.$e->getMessage();
		} else {
			$codigo=$e->getCode();
			$mensaje=$e->getMessage();

		}
		$respuesta=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		echo json_encode($respuesta);

	}catch (Exception $e) {
		$codigo=$e->getCode();
		$mensaje=$e->getMessage();
		$respuesta=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		echo json_encode($respuesta);
	}

?>