<?php

	$letters = range('a','z');
	// now insert data ;
    $con = mysqli_connect("localhost", "loadshed", "FU#kESK0m\$zx!", "eskom");

	foreach($letters as $letter){
		echo "Processing [ $letter ] ";
		$string = file_get_contents("data/news24/$letter.fetch");
		$json=json_decode($string,true);
		foreach($json as $item){ 
		    $placeName = strtoupper(trim($item['SubPlaceName'])); 
		    $zoneId = $item['ZoneId'];
		    $zoneName = strtoupper(trim($item['ZoneName']));
		    $supplierName = strtoupper(trim($item['SupplierName']));
		    $mainPlaceName = strtoupper(trim($item['MainPlaceName']));
		    $province = strtoupper(trim($item['ProvinceName']));
		    $lastUpdateTs = $item['ScheduleLastUpdated'];
	  	    $sql = "insert into loadshed(subPlaceName, zoneId, zoneName,supplierName,  placeName, province, srcLastUpdateTs, srcName) values('$placeName',$zoneId, '$zoneName','$supplierName','$mainPlaceName','$province','$lastUpdateTs','NEWS24')";
		    mysqli_query($con, $sql);	
		}
	}

	mysqli_close($con);
?>
