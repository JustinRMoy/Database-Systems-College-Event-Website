<?php
	require 'db_conn.config';
	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";

	$sql = "SELECT Username FROM Users where Login='" . $inData["Username"] . "' and Password='" . $inData["password"] . "'";
	$result = query($sql);
	if ($result->num_rows > 0)
	{
		$row = $result->fetch_assoc();
		$Username = $row["Username"];
		$Password = $row["Password"];
			
		returnWithInfo($Username, $Password);
	}
	else
	{
		returnWithError( "No Records Found" );
	}

	$conn->close();

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError($err)
	{
		$retValue = '{"Username":"","Password":"","error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
	
	function returnWithInfo($Username, $Password)
	{

		$retValue = '{"Username":"' . $Username . '","Password":"' . $Password . '","error":""}';
		sendResultInfoAsJson($retValue);
	}
	
?>
