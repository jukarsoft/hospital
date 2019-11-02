<?php 
	require 'conexion_hospital.php';
	$respuesta=null;
	//variables de paginación // inicialización variables de paginación
	$filaInicial=0;
	$numFilasMostrar=5;
	//recuperar el número de página a consultar
	$pagina=$_POST['pagina'];
	//recalcular la fila inicial que corresponde a la página a mostrar
	$filaInicial=($pagina-1)*$numFilasMostrar;

	try {
		//la sentencia es preparada con los parametros //parametro LIMIT filainicial y filas a mostrar
		$stmt=$dbh->PREPARE("SELECT * FROM paciente ORDER BY apellidos, nombre LIMIT $filaInicial,$numFilasMostrar");
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
		

		//calcular el número de páginas
		$stmt=$dbh->PREPARE("SELECT COUNT(*) AS numeroFilas FROM paciente");
		// Especificar como se quieren devolver los datos
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
						//$stmt->setFetchMode(PDO::FETCH_NUM);
						//$stmt->setFetchMode(PDO::FETCH_BOTH);
		//Ejecutar la sentencia
		$stmt->execute();
		$filas=$stmt->fetch();
		//recuperar filas totales
		$numFilas=$filas['numeroFilas'];
		//calcular el número de páginas 
		$paginas=ceil($numFilas/$numFilasMostrar);
		//retorna codigo error + la lista de pacientes obtenida y el número de paginas a montar
		$codigo='00';
		$mensaje="OK";
		$control=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
		$respuesta=array($control, $pacientes, $paginas);
				
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
	}catch (Exception $e) {
		$codigo=$e->getCode();
		$mensaje=$e->getMessage();
		$respuesta=array('codigo'=>$codigo, 'mensaje'=> $mensaje);
	}
	echo json_encode($respuesta);
?>