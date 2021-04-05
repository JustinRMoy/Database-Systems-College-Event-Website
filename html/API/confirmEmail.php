<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

// Ensure that the URL contains the token
if ($_GET['token'])
{
  // Receive token via URL parameters
  $checkToken = $_GET['token'];

  mysql_connect('localhost','root','');
  mysql_select_db('DataBasey2');

  // Check if the token references any User in the database.
  $select = mysql_query("SELECT Email FROM Users WHERE emailToken ='$checkToken'");

  if (mysql_num_rows($select)==1)
  {
    $result = mysqli_query($conn, $sql_select)
    returnInfo("Successfully verified: " . $Email .);
  }

  else
  {
    echo("Token may have expired or was not sent properly.");
  }

  mysqli_close($conn);
}

else
{
  echo("Error, token not found in URL");
  mysqli_close($conn);
}

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