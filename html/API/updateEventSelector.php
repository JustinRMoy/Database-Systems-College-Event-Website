<?php
    
    require 'db_conn.php';

    $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $rsoID = $inputFromJson['rsoID'];
    $userLevel = $inputFromJson['userLevel'];
    $uniID = $inputFromJson['UniversityID'];

    if ($userLevel == "Admin")
    {
        $sql = "SELECT * FROM Events WHERE rsoID = $rsoID";
        $result = mysqli_query($conn, $sql);
    }
    elseif ($userLevel == "SuperAdmin")
    {
        $sql = "SELECT * FROM Events WHERE UniversityID = $uniID";
        $result = mysqli_query($conn, $sql);
    }
    else
    {
        echo "You ain't got the clearance level for this bitttchhhhh";
    }

    echo "<select name='Events'>";
    while($rows = mysqli_fetch_array($result))
    {          
        $eventName = $rows['Name'];
        echo "<option value='$eventName'>$eventName</option>";
    }
    echo "</select>";

    $conn->close();