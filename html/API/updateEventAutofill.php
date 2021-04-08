<?php

  require 'db_conn.php';
  
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  $eventID = $inputFromJson['eventID'];
  //$uniID = $inputFromJson['uniID'];
  $eventName = $inputFromJson['EventName'];
  $email =  $inputFromJson['Email'];
  $contactNumber = $inputFromJson['PhoneNumber'];
  $description = $inputFromJson['Description'];
  $startDate = $inputFromJson['startDate'];
  $endDate = $inputFromJson['endDate'];
  $startTime = $inputFromJson['startTime'];
  $endTime = $inputFromJson['endTime'];
  $longitude = $inputFromJson['longitude'];
  $latitude = $inputFromJson['latitude'];
  $category = $inputFromJson['category'];

  $sql = "SELECT Description, contact_num, Contact_Email, startDate, endDate, startTime, endTime, Longitude, Latitude, Category 
          FROM Events 
          Where ID = $eventID";

  if(mysqli_query($conn, $sql))
  {
    //echo "Event successfully found";
    returnInfo($sql);
  }
  else
  {
    //echo "failed to find Event";
    returnError( $conn->error );
  }

  mysqli_close($conn);
    
  function returnError($error){
    $retval = '{"msg":"' . $error .'"}';
    outputJson($retval);
  }
  
  function returnInfo($info)
  {
    $retval = '{"msg":"' . $info .'"}';
    outputJson($retval);
  }
  
  function outputJson($file)
  {
    header("Content-type:application/json");
    echo $file;
  }
  
?>