<?php
    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents("php://input"), true);

    $rsoID = $inputFromJson['rsoID'];
    $userID = $userID['userID'];

    $sql = "UPDATE Users SET RSOID = $rsoID WHERE ID = $userID";
    
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
    }