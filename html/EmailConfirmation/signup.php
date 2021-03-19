
<?php

  require_once ('sendmail.php');
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $fullName = $inputFromJson['fullName'];
    $password =  $inputFromJson['password'];
    $phoneNumber = $inputFromJson['phoneNumber'];
    $email = $inputFromJson['email'];
    $sql;

     //CONNECTING to SQL server
    $dbServerName = "localhost";
    $dbUserName = "databaseuser";
    $dbPassword = "toorqwer";
    $dbName = "pricereviewdb";
    
    $confirmCode = rand(100000, 1000000);

    $conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);
    
    //Start Reading Sequence
        if ($conn->connect_error)
        {
            error( $conn->connect_error);
        }
       else
       {
        $sql = "INSERT INTO customer (customer_name, customer_password, customer_phone, customer_email, customer_prof_status, customer_confcode) 
        VALUES ('".$fullName."','".$password."','".$phoneNumber."','".$email."', 0, '".$confirmCode."');";
    
        if($conn->query($sql) != TRUE )
        {
          returnError( $conn->error );
        }
        else
        {
          sendEmail($email, $confirmCode);
          returnInfo("done");
        }
        $conn->close();
      }    
    
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
  
  
