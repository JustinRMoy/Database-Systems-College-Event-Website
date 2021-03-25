<?php

  require 'db_conn.php';
  
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

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
  $lattitude = $inputFromJson['lattitude'];
  $category = $inputFromJson['category'];

  // $UniNum = $result->fetch_assoc();
  // $ID = $UniNum['ID'];

  $sql = "INSERT INTO Events (Name, Description, contact_num, Contact_Email, UniversityID, startDate, endDate, startTime, endTime, Longitude, Lattitude, Category)
  VALUES ('".$eventName."','".$description."','".$contactNumber."','".$email."', $uniID , '".$startDate."', '".$endDate."', '".$startTime."', '".$endTime."', '".$longitude."', '".$lattitude."', '".$category."')";

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