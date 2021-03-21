<?php
    
    require 'db_conn.php';

    $sql = "SELECT * FROM University";
    $result = mysqli_query($conn, $sql);

    while($rows = mysqli_fetch_array($result))
    {          
        $university_name = $rows['Name'];
        echo "<option value='$university_name'>$university_name</option>";
    }