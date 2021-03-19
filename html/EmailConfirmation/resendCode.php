<?php

     require_once ('sendmail.php');
     
    $inputFromJson = json_decode(file_get_contents('php://input'), true);
  
      $email = $inputFromJson['email'];
      $sql;
      $newResendCode = rand(100000, 999999);
     // echo $email;
      //CONNECTING to SQL server
      $dbServerName = "localhost";
      $dbUserName = "databaseuser";
      $dbPassword = "toorqwer";
      $dbName = "pricereviewdb";

      $conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);
      //Start Reading Sequence
     if ($conn->connect_error)
      {
              error( $conn->connect_error);
      }
      else
      {
        $sql = "SELECT customer_prof_status FROM customer WHERE customer_email = '". $email ."';";
        $result = mysqli_query($conn, $sql);
        $numRows = mysqli_num_rows($result);
          //echo $numRows;

            //Review SQL Result
          if($numRows > 0)
          {
                //User found
                $user = $result->fetch_assoc();
                $profile_status = $user["customer_prof_status"];
                //echo $profile_status;
                  if($profile_status == 1){
                       error("Profileisalreadyactivated");
                  
                   } else if ($profile_status == 0)
                  {
                           $query = "UPDATE customer SET customer_confcode='" . $newResendCode . "' WHERE customer_email = '". $email ."';";

                              if($conn->query($query) != TRUE ){
                                  error($conn->error);
                                }
                              else{
                                sendEmail($email, $newResendCode);
                                error("done");     
                                  }   
                 }                
           } //User not found
          else
            {
              error("Emailnotfound");
            }
         // $conn->close();  
       }


  function error($error){
          $retval = '{"msg":"' . $error .'"}';
        outputJson($retval);
  }
    
    
  function outputJson ($file){
      header("Content-type:application/json");
      echo $file;
  }
