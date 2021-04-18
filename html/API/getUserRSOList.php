<?php

    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents("php://input"), true);

    $userID = $inputFromJson['userID'];

    $sql = "SELECT RSOID FROM Members WHERE StudentID = $userID";

    $result = mysqli_query($conn, $sql);

    echo "<option value='None'>None</option>";

    while ($row = mysqli_fetch_array($result))
    {
        $ID = $row['RSOID'];
        $sql_select = "SELECT Name FROM RSO WHERE ID = $ID";
        $next = mysqli_query($conn, $sql_select);
        $RSO = $next->fetch_assoc();
        $name = $RSO['Name'];
        echo "<option value='$name'>$name</option>";
    }

    $conn->close;