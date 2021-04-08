<?php
    
    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $rsoID = $inputFromJson['rsoID'];
    $userLevel = $inputFromJson['userLevel'];
    $uniID = $inputFromJson['UniversityID'];

    // Different events will be selected based on UserLevel
    if ($userLevel == "Admin" || $userLevel == "Student")
    {
        $sql = "SELECT * FROM Events WHERE (Category = 'Private RSO' AND RSO = $rsoID) OR Category = 'Public' OR (Category = 'Private University' AND UniversityID = $uniID)";
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
    
        echo json_encode($theWholePackage);
    }
    else
    {
        print_r("IN ELSE STATEMENT");
        print_r($conn->error);
    }

    $conn->close();