<?php
	
    $con = mysqli_connect("localhost", "loadshed", "FU#kESK0m\$zx!", "eskom");
	
	// /select/option[2]/@value
	// /select/option[2]
	
	$xml = simplexml_load_file("data/city_power_data.txt");
	$rowCnt = 729;
	
	for($i = 2; $i <= $rowCnt; $i++){
		
		$id = $xml->xpath("/select/option[$i]/@value");
		$value = $xml->xpath("/select/option[$i]");	
		
		$valueParts = explode('-', $value[0]);
		$insertValue = strtoupper(trim($valueParts[0]));
		
		$sql = "insert into city_power(id, name) values('$id[0]','$insertValue')";
		
		mysqli_query($con, $sql);	
	}

	mysqli_close($con);
	
?>
