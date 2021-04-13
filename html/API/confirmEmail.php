<?php

  // Connect to database.
  require 'db_conn.php';

  // $inputFromJson = json_decode(file_get_contents('php://input'), true);

  $checkToken = $inputFromJson['emailToken'];
  $verify = 'Y';

  // Check if the token references any User in the database.
  $sql = "UPDATE Users SET isVerified = 'Y' WHERE emailToken = 'ed49050180d8e5d8de83131a34afeebc'";

  if (mysqli_query($conn, $sql))
  {
    returnInfo("verified");
  }

  else
  {
    returnError("Token may have expired or was not sent properly.");
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