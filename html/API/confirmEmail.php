<?php

  // Connect to database.
  require 'db_conn.php';

  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  $Email = $inputFromJson['Email'];
  $checkToken = $inputFromJson['emailToken'];

  // Check if the token references any User in the database.
  $select = mysql_query("SELECT Email FROM Users WHERE emailToken ='$checkToken'");
  $result = mysqli_query($conn, $select);

  if (mysql_num_rows($select)==1)
  {
    $sql = mysql_query("UPDATE Users SET isVerified='Y', emailToken='' WHERE emailToken ='$checkToken'");
    $newResult = mysqli_query($conn, $sql);
    returnInfo("verified");
  }

  else
  {
    echo("Token may have expired or was not sent properly.");
  }

  mysqli_close($conn);

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