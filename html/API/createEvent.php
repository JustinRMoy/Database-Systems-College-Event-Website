<?php

  require 'db_conn.php';
  
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  $eventName = $inputFromJson['eventName'];
  $email =  $inputFromJson['email'];
  $contactNumber = $inputFromJson['contactNumber'];
  $description = $inputFromJson['description'];
  $startDate = $inputFromJson['StartDate'];
  $endDate = $inputFromJson['endDate'];
  $startTime = $inputFromJson['startTime'];
  $endTime = $inputFromJson['endTime'];
  $longitude = $inputFromJson['longitude'];
  $lattitude = $inputFromJson['lattitude'];
  
  $sql_select = "SELECT ID FROM University WHERE Name = '$University'";

  if($result = mysqli_query($conn, $sql_select))
  {
    echo "University Records selected successfully";
    returnInfo("done");
  }
  else
  {
    echo "failed to find Uni ID records";
    returnError( $conn->error );
  }

  $UniNum = $result->fetch_assoc();
  $ID = $UniNum['ID'];

  $sql = "INSERT INTO Users (Password, Email, Name, UniversityID) 
  VALUES ('".$Password."','".$Email."','".$FullName."', $ID)";

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