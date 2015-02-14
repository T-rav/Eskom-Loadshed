<?php

	$data = fetchData();
	$xml = simplexml_load_string($data);
   
	$value = $xml->xpath("/rss/channel/item[1]/description");
	$title = $xml->xpath("/rss/channel/item[1]/title");

	$status = fetchStatus($value[0]);

	logCurrentStatus($status);
	writeCurrentStatus($status);

	// declining, stable, increasing
	function fetchStatus($value){

		if(strpos($value, "BLACK") === false){
			if(strpos($value, "RED") === false){
				if(strpos($value, "ORANGE") === false){
					// it can only be green :)
					return "GREEN";
				}else{
					return "ORANGE";
				}
			}else{
				return "RED";
			}
		}else{
			return "BLACK";
		}
	}

	function fetchData(){

		$urlBase = "http://poweralert.co.za/poweralert5/rss.xml";
        $contents = file_get_contents($urlBase);

		return $contents;
    }
	
	function logCurrentStatus($status){
		// get a timestamp for later :)
		date_default_timezone_set('Africa/Johannesburg');
		$date = date('Y-m-d_H:i:s');
		$value = $status."::".$date."\n";
		
		echo $value;
		
		// we want to save these ;)
		$file = fopen("/tmp/eskomloadshed_grid_log.txt","a");
		fwrite($file,$value);
		fclose($file);
	}
	
	function writeCurrentStatus($status){
		
		$file = fopen("/tmp/eskomloadshed_grid_status.txt","w");
		fwrite($file,$status);
		fclose($file);
	}

?>
