<?php
	
    $con = mysqli_connect("localhost", "loadshed", "FU#kESK0m\$zx!", "eskom");
	
	$query = "select * from municipality;";
	$result = $con->query($query);
	$rowCnt = $result->num_rows;
	
	for($i = 0; $i < $rowCnt; $i++){
		$result->data_seek($i);
		$data = $result->fetch_assoc();

		$id = $data["id"];
		$prov = $data["province"];
		$munic = $data["value"];
		$json = fetchData($id);
		foreach($json as $item){ 
			
			$placeName = strtoupper(trim($item['text'])); 
			$id = $item['id'];
			$sql = "insert into city(province, municipality, name, id) values('$prov','$munic','$placeName',$id)";
			
			mysqli_query($con, $sql);	
		}
	}

	mysqli_close($con);
	
	
	function fetchData($value){

		$urlBase = "http://loadshedding.eskom.co.za/LoadShedding/GetSurburbData/?pageSize=90000&pageNum=1&searchTerm=&id=$value&_=1423590714343";

		$contents = file_get_contents($urlBase);

		$result = json_decode($contents, true);

		return $result["Results"];
	}
?>
