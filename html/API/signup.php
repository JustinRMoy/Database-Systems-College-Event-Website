<?php

  require 'db_conn.php';
  
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  $FullName = $inputFromJson['fullName'];
  $Password =  $inputFromJson['password'];
  $University = $inputFromJson['university'];
  $Email = $inputFromJson['email'];
  
  $sql_select = "SELECT ID FROM University WHERE Name = '$University'";

  if ($result = mysqli_query($conn, $sql_select))
  {
    if (checkEmailUsed($Email, $conn))
    {
      $UniNum = $result->fetch_assoc();
      $ID = $UniNum['ID'];

      // Generate a random token for users
      // $token = openssl_random_pseudo_bytes(16);
      // $token = bin2hex($token);

      $sql = "INSERT INTO Users (Password, Email, Name, UniversityID, User_level) 
      VALUES ('".$Password."','".$Email."','".$FullName."', '".$ID."', 'Student')";

      if (mysqli_query($conn, $sql))
      {
        //echo "Records inserted successfully";
        // sendEmail($Email, $conn);
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
  
//   function sendEmail($Email, $conn){

//     // Generate a random token for users
//     $token = openssl_random_pseudo_bytes(16);
//     $token = bin2hex($token);
    
//     echo($token);

//     $sql = "UPDATE Users SET emailToken = '$token' WHERE Email = '$Email'";

//       if (mysqli_query($conn, $sql))
//       {
//         // echo "Records inserted successfully";
//         echo("Email sent!");
//       }
//       else
//       {
//         //echo "failed to insert records";
//         returnError($conn->error);
//       }

//     // Email Password: COP4710Hurts

//     $fromEmail = 'collegeEventManagerCOP4710@outlook.com';
//     $toEmail = $Email;
//     $subjectName = "Email confirmation";
//     $message = 'Generated code:' .$code. ;

//     $to = $toEmail;
//     $subject = $subjectName;
//     $headers = "MIME-Version: 1.0" . "\r\n";
//     $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
//     $headers .= 'From: '.$fromEmail.'<'.$fromEmail.'>' . "\r\n".'Reply-To: '.$fromEmail."\r\n" . 'X-Mailer: PHP/' . phpversion();
//     $message = '<!doctype html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport"
//             content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
//         <meta http-equiv="X-UA-Compatible" content="ie=edge">
//         <title>Document</title>
//       </head>
//       <body>
//       <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">'.$message.'</span>
//         <div class="container">
//                  '.$message.'<br/>
//                     Regards<br/>
//                   '.$fromEmail.'
//         </div>
//       </body>
//       </html>';

//     $result = mail($to, $subject, $message, $headers);

//     echo '<script>alert("Email sent successfully !")</script>';
// }
?>
