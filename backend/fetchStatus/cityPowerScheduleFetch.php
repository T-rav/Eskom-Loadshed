<?php
	
    $con = mysqli_connect("localhost", "loadshed", "FU#kESK0m\$zx!", "eskom");
	
	$query = "select * from city_power;";
	$result = $con->query($query);
	$rowCnt = $result->num_rows;
	
	for($i = 0; $i < $rowCnt; $i++){
		$result->data_seek($i);
		$data = $result->fetch_assoc();
		$id = $data["id"];
		$value = $data["name"];
	
	/*
	rID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	subPlaceName varchar(80) DEFAULT NULL,
	zoneId int,
	zoneName varchar(50),
	supplierName varchar(40) DEFAULT NULL,
	placeName varchar(80),
	province varchar(50),
	srcLastUpdateTs datetime,
	srcName varchar(10) DEFAULT NULL,
	UNIQUE(zoneId)
	*/
		
		
		$stage = "Stage1";
		$json = fetchData($id, $stage);
		foreach($json as $item){ 
			
			$placeName = strtoupper(trim($item['text'])); 
			$id = $item['id'];
			$sql = "insert into city(province, municipality, name, id) values('$prov','$munic','$placeName',$id)";
			
			mysqli_query($con, $sql);	
		}
	}

	mysqli_close($con);
	
	
	// TODO : fetch from city table and get stage 1,2 and 3 schedules
	
	function fetchData($value,$stage){

		$urlBase = "https://www.citypower.co.za/LoadSheddingSchedule.axd?Suburb=$value&Stage=$stage&_=1423600954623";

		$contents = file_get_contents($urlBase);

		$result = json_decode($contents, true);

		return $result["Results"];
	}
?>
