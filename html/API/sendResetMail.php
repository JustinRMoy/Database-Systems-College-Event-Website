<?php

  // Connect to database.
  require 'db_conn.php';

  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  // Pull email from JSON 
  $Email = $inputFromJson['Email'];

  // Generate a random token for users
  $resetToken = md5(time().$Email);

  // Check if the token references any User in the database.
  $sql = "UPDATE Users SET resetToken = $resetToken WHERE Email = $Email";

  if (mysqli_query($conn, $sql))
  {
    $fromEmail = "collegeEventManagerCOP4710@outlook.com";
    $subjectName = "Reset Password";
    $codeMessage = 'Generated code:' . $resetToken . ' ';

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

    returnInfo("Email sent");
  }

  else
  {
    returnError("Email does not appear to be in database.");
  }

  mysqli_close($conn);

function returnError($error)
{
  $retval->msg = $error;
  outputJson($retval);
}

function returnInfo($info)
{
  $retval->msg = $info;
  outputJson($retval);
}

function outputJson ($file)
{
  header("Content-type:application/json");
  $jsonObj = json_encode($file);
  echo $jsonObj;
}

?>