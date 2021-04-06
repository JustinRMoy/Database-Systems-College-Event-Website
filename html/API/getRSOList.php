<?php
    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $uniID = $inputFromJson['uniID'];

    $sql = "SELECT * FROM RSO WHERE UniversityID = $uniID";
    $result = mysqli_query($conn, $sql);
    