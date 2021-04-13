<?php

  require 'db_conn.php';
  
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  $eventID = $inputFromJson['eventID'];

  $sql = "SELECT Description, contact_num, Contact_Email, startDate, endDate, startTime, endTime, Longitude, Latitude, Category 
          FROM Events 
          Where ID = $eventID";

  if($query = mysqli_query($conn, $sql))
  {
    echo "Event successfully found";
  // echo $sql;
  // returnInfo($sql);
    $autoFill = $query->fetch_assoc();
    outputJson($autoFill);
  }
  else
  {
    //echo "failed to find Event";
    returnError( $conn->error );
  }

  mysqli_close($conn);
    
  function returnError($error)
  {
    $retval = '{"msg":"' . $error .'"}';
    outputJson($retval);
  }
  
  function outputJson($file)
  {
    header("Content-type:application/json");
    $jsonPackage = json_encode($file);
    echo $jsonPackage;
  }
  
?>