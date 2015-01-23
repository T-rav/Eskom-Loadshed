<?php

	ini_set('display_errors', true);
	error_reporting(E_ALL);

	$req_dump = print_r($_REQUEST, TRUE);
	$fp = fopen('/tmp/request.log', 'a');
	fwrite($fp, $req_dump);
	fclose($fp);

?>