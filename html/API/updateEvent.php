<?php

  require 'db_conn.php';
  
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  $eventID = $inputFromJson['eventID'];
  $uniID = $inputFromJson['uniID'];
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

  $sql = "UPDATE Events
          SET (Name = $eventName, Description = $description, contact_num = $contactNumber, Contact_Email = $email, UniversityID = $uniID, startDate = $startDate, endDate = $endDate, startTime = $startTime, endTime = $endTime, Longitude = $longitude, Latitude = $latitude, Category = $category) 
          WHERE ID = $eventID";

  if(mysqli_query($conn, $sql))
  {
    //echo "Records UPDATED successfully";
    returnInfo("done");
  }
  else
  {
    //echo "failed to UPDATE records";
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