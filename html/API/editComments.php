<?php

  require 'db_conn.php';

  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  //$user_level = $inputFromJson['user_level'];
  $sql;
    
  //Only Selects UCF IF for now
  //$sql_select = "SELECT ID FROM University WHERE Name = 'University of Central Florida'";
  //$result = mysqli_query($conn, $sql_select);
  //$Users = $result->fetch_assoc();

$userId = $inputFromJson['userId'];
$eventId = $inputFromJson['eventId'];
$commentId = $inputFromJson['commentId'];
$comment = $inputFromJson['comment'];
$mode = $inputFromJson['mode'];

  if ($mode == 1)
  {
    //1 = create comment
    $sql = "INSERT INTO Comments (StudentID, EventID, Comment) VALUES ($userId, $eventId ,'$comment')";

  }
  else if ($mode == 2)
  {
    //delete a comment
    $sql = "DELETE FROM Comments 
    WHERE CommentID=$commentId";
  }
  else if ($mode == 3)
  {
    //update a comment
    $sql = "UPDATE Comments SET Comment='$comment' WHERE CommentID=$commentId";
  }
  else
  {
      echo "No mode selected";
  }

  if (mysqli_query($conn, $sql))
  {
     //sendEmail("mr.l.t@hotmail.com");
     returnInfo("done");
  }
  else
  {
    returnInfo( "Unable to perform comment operation" );
  }
  $conn->close();
    
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
    
  
