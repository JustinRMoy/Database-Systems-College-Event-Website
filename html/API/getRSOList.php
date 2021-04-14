<?php
    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $uniID = $inputFromJson['uniID'];

    $sql = "SELECT * FROM RSO WHERE UniversityID = $uniID";
    $result = mysqli_query($conn, $sql);
    
    $arr = array();

    while ($row = mysqli_fetch_array($result))
    {
        array_push($arr, $row);
    }

    header("Content-type:application/json");
    echo json_encode($arr);