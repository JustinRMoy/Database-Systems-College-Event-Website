<?php

  require 'db_conn.php';
  
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  $FullName = $inputFromJson['fullName'];
  $Password =  $inputFromJson['password'];
  $University = $inputFromJson['university'];
  $Email = $inputFromJson['email'];

  // Generate a random token for users
  $verifyToken = md5(time().$Email);
  
  $sql_select = "SELECT ID FROM University WHERE Name = '$University'";

  if ($result = mysqli_query($conn, $sql_select))
  {
    if (checkEmailUsed($Email, $conn))
    {
      $UniNum = $result->fetch_assoc();
      $ID = $UniNum['ID'];

      $sql = "INSERT INTO Users (Password, Email, Name, UniversityID, User_level, emailToken) 
      VALUES ('".$Password."','".$Email."','".$FullName."', '".$ID."', 'Student', '".$verifyToken."')";

      if (mysqli_query($conn, $sql))
      {
        echo "Records inserted successfully";
        
        $fromEmail = "collegeEventManagerCOP4710@outlook.com";
        $subjectName = "Email confirmation";
        $codeMessage = 'Generated code: ' . $verifyToken . ' ';

        $to = $Email;
        $subject = $subjectName;
        $headers = "From: collegeEventManagerCOP4710@outlook.com \r\n";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
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
          <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">'.$codeMessage.'</span>
            <div class="container">
                    '.$codeMessage.'<br/>
                        Regards<br/>
                      '.$fromEmail.'
            </div>
          </body>
          </html>';

        mail($to, $subject, $message, $headers);

        returnInfo($info);
      }
      else
      {
        //echo "failed to insert records";
        returnError( $conn->error );
      }
    }

    else 
    {
      returnInfo("email used");
    }
  }

  else
  {
    //echo "failed to find Uni ID records";
    returnError($conn->error);
  }

  mysqli_close($conn);
    
  function returnError($error){
        $retval->msg = $error;
    outputJson($retval);
  }
  
  function returnInfo($info){
        $retval->msg = $info;
    outputJson($retval);
  }

  function showToken($token){
    outputJson($retval);
}
  
  function outputJson ($file){
    header("Content-type:application/json");
    $jsonObj = json_encode($file);
    echo $jsonObj;
  }

  function checkEmailUsed($email, $conn){
    $sql = "SELECT * FROM Users WHERE Email = '$email'";
    $result = mysqli_query($conn, $sql);
    $rows = mysqli_num_rows($result);

    if ($rows > 0)
    {
      return False;
    }

    else
      return True;
  }
