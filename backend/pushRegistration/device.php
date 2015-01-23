<?php

	$url = "https://ws.pushapps.mobi/RemoteAPI/GetDevices";
                $data = array(
                      'SecretToken'      => '6ffbd706-5b73-4874-9b61-40f7f16cb8c9', ## Your app secret token
                      'Amount'    => 100, ## amount of devices to retrieve
                      'Index'       => 1, ## index to start from, 1 based, so you can use this request with paging
                      'Platforms' => array(1, 2), ## Optional, if left empty then there is no filtering by platforms
                );
   
        $content = json_encode($data);
   
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER,
                array("Content-type: application/json"));
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
   
        $json_response = curl_exec($curl);
   
        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
   
        if ( $status != 200 ) {
            die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
        }
   
        curl_close($curl);
   
        echo "Response: " . $json_response . "\n";

?>