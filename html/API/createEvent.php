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

  if(isset($_FILES['file']['name']))
  {
    $image = $_FILES['file']['name'];
    $target_dir = "../img/";
    $target_file = $target_dir . basename($_FILES['file']['name']);

    // Select file type
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Valid file extensions
    $extensions_arr = array("jpg","jpeg","png","gif");
  }

  // Check extension
  if ( in_array($imageFileType, $extensions_arr) )
  {

    // Insert record
    $moveimage = "/var/www/html/img/". $image;
    $imageLink = "http://198.199.77.197/img/". $image;


    $sql = "INSERT INTO Events (Name, Description, contact_num, Contact_Email, UniversityID, startDate, endDate, startTime, endTime, Longitude, Latitude, Category, Image)
    VALUES ('".$eventName."','".$description."','".$contactNumber."','".$email."', $uniID , '".$startDate."','".$endDate."','".$startTime."','".$endTime."','".$longitude."','".$latitude."','".$category."','".$imageLink."')";


    // Upload file
    chown($target_dir, 777);

    $uploadSuccess = move_uploaded_file($_FILES['file']['tmp_name'], $moveimage);


    if ($uploadSuccess === TRUE)
    {
      returnInfo($info);
    }
    else
    {
      returnError("Image file not uploaded")
      $conn->close();
    }

    if (mysqli_query($conn, $sql))
    {
      //echo "Records inserted successfully";
      returnInfo("done");
    }
    else
    {
      //echo "failed to insert records";
      returnError( $conn->error );
    }
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