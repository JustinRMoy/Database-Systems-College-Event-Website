<?php

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

    $conn = mysqli_connect($dbServerName, $dbUserName, $dbPassword, $dbName);
    
    //Start Reading Sequence
        if ($conn->connect_error)
        {
            error( $conn->connect_error);
        }
       else
       {
        $sql = "INSERT INTO customer (customer_name, customer_password, customer_phone, customer_email, customer_prof_status) 
        VALUES ('".$fullName."','".$password."','".$phoneNumber."','".$email."', 0);";
    
        if($conn->query($sql) != TRUE )
        {
          returnError( $conn->error );
        }
        else
        {
          sendEmail("mr.l.t@hotmail.com");
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
  
  
  function sendEmail($email){
       $code = rand(100000, 100000000);

    $fromEmail = 'onotreplay@pricereview.cf';
    $toEmail = $email;
    $subjectName = "Email confirmation";
    $message = 'Generated code:' .$code. ;

    $to = $toEmail;
    $subject = $subjectName;
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: '.$fromEmail.'<'.$fromEmail.'>' . "\r\n".'Reply-To: '.$fromEmail."\r\n" . 'X-Mailer: PHP/' . phpversion();
    $message = '<!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
      </head>
      <body>
      <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">'.$message.'</span>
        <div class="container">
                 '.$message.'<br/>
                    Regards<br/>
                  '.$fromEmail.'
        </div>
      </body>
      </html>';
    $result = @mail($to, $subject, $message, $headers);

    echo '<script>alert("Email sent successfully !")</script>';
}
