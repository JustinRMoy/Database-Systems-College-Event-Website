<?php
    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents("php://input"), true);

    $rsoID = $inputFromJson['rsoID'];
    $userID = $inputFromJson['userID'];

    $check = "SELECT * FROM Members WHERE StudentID = $userID AND RSOID = $rsoID";
    $query = mysqli_query($conn, $check);
    $rows = mysqli_num_rows($conn, $query);

    if ($rows > 0)
    {
        returnInfo("You're already a member of this RSO");
    }


    $sql = "INSERT INTO Members (StudentID, RSOID) VALUES ($userID, $rsoID)";
    
    if ($result = mysqli_query($conn, $sql))
        returnInfo("Successfully joined RSO!");

    else
        returnInfo($conn->error);

    function returnInfo($info)
    {
        $json->msg = $info;
        header('Content-type: application/json');
        $jsonObj = json_encode($json);
        echo $jsonObj;
        exit;
    }