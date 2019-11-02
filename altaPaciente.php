<?php 
	require 'conexion_hospital.php';

	try {
		//carga atributos recibidos
		$nif=$_POST['nif'];
		$nombre=$_POST['nombre'];
		$apellidos=$_POST['apellidos'];
		$fechaIngreso=$_POST['fechaingreso'];
		$fechaAlta=$_POST['fechaalta'];
		//validación de atributos obligatorios
		if (trim($nif)=="") {
				throw new Exception("nif obligatorio", 10);			
		}
		if (trim($nombre)=="") {
				throw new Exception("nombre obligatorio", 10);			
		}
		if (trim($apellidos)=="") {
				throw new Exception("apellidos obligatorio", 10);			
		}
		if (trim($fechaIngreso)=="" || $fechaIngreso==null) {
				throw new Exception("fecha de ingreso obligatoria", 10);			
		}

		//la sentencia es preparada con los parametros
		$stmt=$dbh->PREPARE("INSERT INTO paciente VALUES(NULL, :nif, :nombre, :apellidos, :fechaingreso, :fechaalta)");

		//bind de los parametros // asigna los valores a la sentencia preparada
		$stmt->bindParam(':nif', $nif);
		$stmt->bindParam(':nombre', $nombre);
		$stmt->bindParam(':apellidos', $apellidos);
		$stmt->bindParam(':fechaingreso', $fechaIngreso);
		$stmt->bindParam(':fechaalta', $fechaAlta);

		//Ejecutar la sentencia
		$stmt->execute();

		//maquetación de la respuesta 
		$codigo='00';
		$mensaje='Alta del paciente realizada';
		$respuesta=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		echo json_encode($respuesta);
	} catch (PDOException $e) {
		//excepciones que se produzcan en el acceso a la bd
						//ojo errorInfo es un array
		if ($stmt->errorInfo()[1] == 1062) {
			$mensaje='paciente con mismo dni en la base de datos';
			$respuesta=array('codigo'=>$stmt->errorInfo()[1], 'mensaje'=> $mensaje);
			
		} else {
			$respuesta=array('codigo'=>$e->getCode(), 'mensaje'=> $e->getMessage());
			
		}
		echo json_encode($respuesta);
	} catch (Exception $e){
		$codigo=$e->getCode();
		$mensaje=$e->getMessage();
		$respuesta=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		echo json_encode($respuesta);

	}

 ?>