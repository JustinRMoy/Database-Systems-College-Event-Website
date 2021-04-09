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
  $latitude = $inputFromJson['latitude'];
  $category = $inputFromJson['category'];

  $check = "SELECT * FROM Events WHERE (startTime >= '$startTime' AND 
  startTime <= '$endTime') OR (endTime >= '$startTime' AND endTime <= '$endTime')
  AND startDate = '$startDate' AND endDate = '$endDate' AND Longitude = '$longitude'
  AND Latitude = '$latitude'";
  $result = mysqli_query($conn, $check);
  $rows = mysqli_num_rows($result);

  if ($rows > 0)
  {
    returnError("Event conflicts with another event's date, time and location");
  }

  $sql = "INSERT INTO Events (Name, Description, contact_num, Contact_Email, UniversityID, startDate, endDate, startTime, endTime, Longitude, Latitude, Category)
  VALUES ('".$eventName."','".$description."','".$contactNumber."','".$email."', $uniID , '".$startDate."','".$endDate."','".$startTime."','".$endTime."','".$longitude."','".$latitude."','".$category."')";

  if(mysqli_query($conn, $sql))
  {
    //echo "Records inserted successfully";
    returnInfo("done");
  }
  else
  {
    //echo "failed to insert records";
    returnError( $conn->error );
  }

  mysqli_close($conn);
    
  function returnError($error){
    $retval = '{"msg":"' . $error .'"}';
    outputJson($retval);
    mysqli_close($conn);
    exit;
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