<?php

    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $uniID = $inputFromJson['uniID'];

    if ($uniID != NULL)
        $sql = "SELECT * FROM Events WHERE UniversityID = $uniID ORDER BY ID 
        DESC LIMIT 4";

    else
        $sql = "SELECT * FROM Events WHERE Category = 'Public' ORDER BY ID
        DESC LIMIT 4";

    if ($result = mysqli_query($conn, $sql))
    {
        $arr = array();

        while ($row = mysqli_fetch_array($result))
        {
            array_push($arr, $row);
        }

        toJSON($arr);
    }

    else
    {
        var_dump($conn->error);
    }

    function toJSON($json)
    {
        header("Content-type:application/json");
        echo json_encode($json);
    }
