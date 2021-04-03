<?php

    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $Email = $inputFromJson['Email'];
    $Password = $inputFromJson['Password'];

    //query to DB
    $sql = "SELECT * FROM Users WHERE (Email='$Email' AND Password='$Password')"; 
    $result = mysqli_query($conn, $sql);
    $numRows = mysqli_num_rows($result);

    //Review SQL Result
    if($numRows > 0)
    {
        //User found
        $Users = $result->fetch_assoc();
        $Id = $Users["ID"];
        $User_level = $Users["User_level"];
        $Uni = $Users["UniversityID"];
        $Name = $Users["Name"];
        if (isset($Users["RSOID"]))
            $RSO = $Users["RSOID"];
        
        //echo ($id);
        returnUser($Id, $User_level, $Uni, $RSO, $Name);
    }
    //User not found
    else
    {
        error("Email or password is incorrect");
    }

    $conn->close();

    //FUNCTIONS
    function error($err)
    {
        $result = '{"Users":0, "error":"' . $err . '"}';
        toJSON($result);
    }

    //This takes the user to the landing page 
    //It will also send the user info to the landing page
    function returnUser($Id, $User_level, $Uni, $RSO, $Name)
    {
        $ret = '{"Users": "'. $Id .'", "Name": "'. $Name .'", "User_level": "'. $User_level .'", "Uni": "'. $Uni .'", "RSO": "'. $RSO .'"}';
        toJSON($ret);
    }

    //This return JSON files to JS
    function toJSON($json)
    {
        // "Look JSON"
        header('Content-type: application/json');

        // "Prints text to the page" 
        echo $json;
    }
        
?>
