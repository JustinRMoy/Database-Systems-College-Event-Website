<?php

    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents('php://input'), true);

    //$Email = $inputFromJson['Email'];
    //$Password = $inputFromJson['Password'];
    $searchResults = "";
    $userID = $inputFromJson['UserID'];
    $userLevel = $inputFromJson['UserLevel'];
    $uniID = $inputFromJson['UniversityID'];
    $flag = 0;
    //query to DB

    if ($userLevel == "Admin" || $userLevel == "Student")
    {
        $sql = "SELECT * FROM Events WHERE Category = 'Public' OR (Category = 'Private' AND UniversityID = $uniID)";
    }
    elseif ($userLevel == "SuperAdmin")
    {
        $sql = "SELECT * FROM Events WHERE UniversityID = $uniID OR Category = 'RSO' OR Category = 'Public'";
    }
    else
    {
        $sql = "SELECT * FROM Events WHERE Category = 'Public'"; 
    }

    
    $result = mysqli_query($conn, $sql);
    $numRows = mysqli_num_rows($result);
    $resultCount = 0;


    //Review SQL Result
    if($numRows > 0)
    {
        //Event found
        while($eventData = $result->fetch_assoc()){
                if($resultCount > 0){
                    $searchResults .= ", ";
                    //seperate search results
                }
                $resultCount++;
                $searchResults .= '{"Name": "' . $eventData["Name"] . '", "long": "' . $eventData["Longitude"] . '", "lat": "' . $eventData["Latitude"] . '", "Description": "' . $eventData["Description"] . '", "Time": "' . $eventData["startTime"] . '", "Date": "' . $eventData["startDate"] . '", "eventId": "' . $eventData["ID"] . '", "Phone": "' . $eventData["contact_num"] . '", "Category": "' . $eventData["Category"] . '", "Email": "' . $eventData["Contact_Email"] . '", "Avg_Rating": "' . $eventData["Avg_Rating"] . '"}';
                //gets data from the searched event
        }
        
        /*if (isset($Users["RSOID"]))
            $RSO = $Users["RSOID"];
        */
        //echo ($id);
    }
    //Event not found
    else
    {
        $flag = 1;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $sql = "SELECT RSOID FROM Members WHERE (StudentID = " .$inputFromJson['UserID']. ")"; 
    $rsoIDs = mysqli_query($conn, $sql);
    $numRowsRSO = mysqli_num_rows($rsoIDs);
    $count = 0;

    if($numRowsRSO > 0){
        foreach($rsoIDs as $rsoID){
            if ($userLevel == "Admin" || $userLevel == "Student")
            {
                $sql = "SELECT * FROM Events WHERE (Category = 'RSO' AND RSO = $rsoID)";
            }
            else
            {
                if($flag == 1)
                {
                    error("No events found");
                    break;
                }
                else
                {
                    break;
                }
            }
            /*if($inputFromJson['security'] != 0){
                $sql = "SELECT * FROM Events WHERE (Name LIKE '%" .$inputFromJson['search']. "%' AND UniversityID='" .$inputFromJson['UniversityID']. "')"; 
            }else $sql = "SELECT * FROM Events WHERE (Name LIKE '%" .$inputFromJson['search']. "%')"; */
            $result = mysqli_query($conn, $sql);
            $numRows = mysqli_num_rows($result);
        

            //Review SQL Result
            if($numRows > 0)
            {
                $count++;
                //Event found
                while($eventData = $result->fetch_assoc()){
                        if($resultCount > 0){
                            $searchResults .= ", ";
                            //seperate search results
                        }
                        $resultCount++;
                        $searchResults .= '{"Name": "' . $eventData["Name"] . '", "long": "' . $eventData["Longitude"] . '", "lat": "' . $eventData["Latitude"] . '", "Description": "' . $eventData["Description"] . '", "Time": "' . $eventData["startTime"] . '", "Date": "' . $eventData["startDate"] . '", "eventId": "' . $eventData["ID"] . '", "Phone": "' . $eventData["contact_num"] . '", "Category": "' . $eventData["Category"] . '", "Email": "' . $eventData["Contact_Email"] . '", "Avg_Rating": "' . $eventData["Avg_Rating"] . '"}';
                        //gets data from the searched event
                }
                
                /*if (isset($Users["RSOID"]))
                    $RSO = $Users["RSOID"];
                */
                //echo ($id);
            }
            //Event not found
        }

        if($flag == 1 && $count == 0){
            error("No events found");
        }
        else{
            returnWithInfo($searchResults);
        }
    }
    else
    {
        if($flag == 1){
            error("No events found");
        }
        else{
            returnWithInfo($searchResults);
        }
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
