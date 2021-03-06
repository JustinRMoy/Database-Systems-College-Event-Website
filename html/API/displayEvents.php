<?php
    
    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $userID = $inputFromJson['UserID'];
    $userLevel = $inputFromJson['UserLevel'];
    $uniID = $inputFromJson['UniversityID'];

    $rsoID = 



    // Different events will be selected based on UserLevel
    if ($userLevel == "Admin" || $userLevel == "Student")
    {
        $sql = "SELECT * FROM Events WHERE (Category = 'RSO' AND RSO = $rsoID) OR Category = 'Public' OR (Category = 'University' AND UniversityID = $uniID)";
    }
    elseif ($userLevel == "SuperAdmin")
    {
        $sql = "SELECT * FROM Events WHERE UniversityID = $uniID OR Category = 'Public'";
    }
    else
    {
        $sql = "SELECT * FROM Events WHERE Category = 'Public'"; 
    }

    if($result = mysqli_query($conn, $sql))
    {
        $theWholePackage = array();
        while ($rows = mysqli_fetch_array($result))
        {
            array_push($theWholePackage, $rows);
        }
    
        toJSON($theWholePackage);
    }
    else
    {
        print_r("IN ELSE STATEMENT");
        print_r($conn->error);
    }

    $conn->close();

    function toJSON($json)
    {
        header("Content-type:application/json");
        echo json_encode($json);
    }