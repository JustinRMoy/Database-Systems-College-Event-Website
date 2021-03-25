<?php

  require 'db_conn.php';
  
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  //var jsonPayload = '{"EventName" : "' + eventName + '", "Email" : "' + contactEmail + '"Description" : "' + description + '", "PhoneNumber" : "' + contactNumber + '"}';
  $uniID = $inputFromJson['uniID'];
  $eventName = $inputFromJson['EventName'];
  $email =  $inputFromJson['Email'];
  $contactNumber = $inputFromJson['PhoneNumber'];
  $description = $inputFromJson['Description'];
  //$startDate = $inputFromJson['StartDate'];
  //$endDate = $inputFromJson['endDate'];
  //$startTime = $inputFromJson['startTime'];
  //$endTime = $inputFromJson['endTime'];
  //$longitude = $inputFromJson['longitude'];
  //$lattitude = $inputFromJson['lattitude'];

  // $UniNum = $result->fetch_assoc();
  // $ID = $UniNum['ID'];

  $sql = "INSERT INTO Events (Name, Description, contact_num, Contact_Email, UniversityID) 
  VALUES ('".$eventName."','".$description."','".$contactNumber."','".$email."', $uniID)";

  if(mysqli_query($conn, $sql))
  {
    echo "Records inserted successfully";
    returnInfo("done");
  }
  else
  {
    echo "failed to insert records";
    returnError( $conn->error );
  }

  mysqli_close($conn);
    
  function returnError($error){
        $retval = '{"msg":"' . $error .'"}';
    outputJson($retval);
  }
  
  function returnInfo($info){
        $retval = '{"msg":"' . $info .'"}';
    outputJson($retval);
  }
  
  function outputJson ($file){
    header("Content-type:application/json");
    echo $file;
  }
  
?>