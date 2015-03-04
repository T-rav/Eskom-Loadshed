<?php

	ini_set('display_errors', true);
	error_reporting(E_ALL);

	// compute status :)
	$currentStatus = getCurrentStatus();
	$prevStatus = getPrevStatus();
	
	$oldKey = 'd13bcaf0-d7dc-483e-8b17-8dc3a22e5e85';
	$newKey = '2f96b0ad-db36-453b-ab98-196a90e59400';
	
	if($currentStatus != $prevStatus){
		// send msg
		$msg = 'No load shedding';
		if($currentStatus == 1){
			$msg = 'Stage 1 load shedding';
		}else if($currentStatus == 2){
			$msg = 'Stage 2 load shedding';
		}else if($currentStatus == 3){
			$msg = 'Stage 3 load shedding';
		}
		
		echo "Sending $msg";
		sendGCM($msg, $oldKey);
		sendGCM($msg, $newKey);
	}
	
	// write current status to log
	writeCurrentStatus($currentStatus);
	
	function writeCurrentStatus($status){
		$file = fopen("/tmp/eskomloadshed_status.txt","w");
		fwrite($file,$status);
		fclose($file);
	}
	
	function getPrevStatus(){
		$handle = fopen("/tmp/eskomloadshed_status.txt", "r");
		if ($handle) {
			if(($buffer = fgets($handle, 1024)) !== false) {
				 return $buffer;
			}
			if (!feof($handle)) {
				echo "Error: unexpected fgets() fail\n";
			}
			fclose($handle);
		}
		
		return 0;
	}
	
	function getCurrentStatus(){
		$url = "http://loadshedding.eskom.co.za/LoadShedding/GetStatus";
		$data = fetchData($url);
		$data = $data - 1;
		
		return $data;
	}
	

	function fetchData($url){
		$data = file_get_contents($url);
	
		return $data;
	}
	
	function sendGCM($msg, $key){
		$url = "https://ws.pushapps.mobi/RemoteAPI/CreateNotification";
		$data = array(
					  'SecretToken'      => $key, ## Your app secret token
					  'Message' => $msg
					  );
		  
		$content = json_encode($data);
		  
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_HEADER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
		  
		$json_response = curl_exec($curl);
		  
		$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		  
		if ( $status != 200 ) {
			die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
		}
		  
		curl_close($curl);
		  
		echo "Response: " . $json_response . "\n";
	}
?>