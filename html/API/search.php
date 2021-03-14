<?php

    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $Email = $inputFromJson['Email'];
    $Password = $inputFromJson['Password'];

    //query to DB
    $sql = "SELECT * FROM Events WHERE (Name LIKE '%" . $inputFromJson['search']. "%' AND Private ='" .$inputFromJson['security']. "')"; 
    $result = mysqli_query($conn, $sql);
    $numRows = mysqli_num_rows($result);
    $resultCount = 0;
    $searchResult = '';

    //Review SQL Result
    if($numRows > 0)
    {
        //Event found
        while($eventData = $result->fetch_assoc()){
                if($resultCount > 0){
                    $searchResult .= ",";
                    //seperate search results
                }
                $resultCount++;
                $searchResult .= '{"Name": "' .$eventData["Name"]. '", "Description": "' .$eventData["Description"]. '", "Time": "' .$eventData["Time"]. '", "Date": "' .$eventData["Date"]. '". "eventId": "' .$eventData["ID"]. '"}';
                //gets data from the searched event
        }
        
        /*if (isset($Users["RSOID"]))
            $RSO = $Users["RSOID"];
        */
        //echo ($id);
        returnWithInfo($eventData);
    }
    //Event not found
    else
    {
        error("No events found");
    }

    $conn->close();

    //FUNCTIONS
    function error($err)
    {
        $result = '{"user_id":0, "error":"' . $err . '"}';
        toJSON($result);
    }


    //This return JSON files to JS
    function toJSON($json)
    {
        // "Look JSON"
        header('Content-type: application/json');

        // "Prints text to the page" 
        echo $json;
    }
    function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":"None"}';
		toJSON( $retValue );
	}
        
?>
