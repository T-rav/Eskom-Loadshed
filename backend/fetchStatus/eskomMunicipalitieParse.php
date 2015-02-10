<?php

    $con = mysqli_connect("localhost", "loadshed", "FU#kESK0m\$zx!", "eskom");

	//$fileName = "data/regionalData/eastern_cape_1_manip";
	//$prov = 'EASTERN CAPE';
	
	//$fileName = "data/regionalData/freestate_2_manip";
	//$prov = 'FREE STATE';
	
	//$fileName = "data/regionalData/gautang_3_manip";
	//$prov = 'GAUTENG';
	
	//$fileName = "data/regionalData/natal_4_manip";
	//$prov = 'KWAZULU-NATAL';
	
	//$fileName = "data/regionalData/limpopo_5_manip";
	//$prov = 'LIMPOPO';
	
	//$fileName = "data/regionalData/mpumalanga_6_manip";
	//$prov = 'MPUMALANGA';
	
	//$fileName = "data/regionalData/north_west_7_manip";
	//$prov = 'NORTH WEST';
	
	//$fileName = "data/regionalData/northen_cape_8_manip";
	//$prov = 'NORTHERN CAPE';
	
	$fileName = "data/regionalData/western_cape_9_manip";
	$prov = 'WESTERN CAPE';
	
	$string = file_get_contents($fileName);
	$json=json_decode($string,true);
	
	foreach($json as $item){ 
		$placeName = strtoupper(trim($item['Text'])); 
		$id = $item['Value'];
		$sql = "insert into municipality(province, value, id) values('$prov','$placeName',$id)";
		
		echo $sql;
		
		mysqli_query($con, $sql);	
	}
	
	mysqli_close($con);
?>
