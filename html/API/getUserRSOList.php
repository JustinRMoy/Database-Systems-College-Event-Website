<?php

    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents("php://input"), true);

    $userID = $inputFromJson['userID'];

    $sql = "SELECT RSOID FROM Members WHERE StudentID = $userID";

    $result = mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_array($result))
    {
        $sql = "SELECT Name FROM RSO WHERE ID = $row['ID']";
        $result = mysqli_query($conn, $sql);
        $RSO = $result->fetch_assoc();
        $name = $RSO['Name'];
        echo "<option value='$name'>$name</option>";
    }

    $conn->close;