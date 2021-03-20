<?php

  require 'db_conn.php';
  
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  //$user_level = $inputFromJson['user_level'];
  $sql;
  $result = mysqli_query($conn, $sql);
    
  if($inputFromJson['mode'] == 1){//1 = create comment

    $sql = "INSERT INTO Comments (StudentID, EventID, Comment) 
    VALUES (". $inputFromJson['userId'] .",". $inputFromJson['eventId'] .",". $inputFromJson['comment'] .")";

  }elseif($inputFromJson['mode'] == 2){//delete a comment
    $sql = "DELETE FROM Comments 
    WHERE CommentID=" . $inputFromJson['commentId'];
  }elseif($inputFromJson['mode'] == 3){//update a comment
    $sql = "UPDATE Comments 
    SET Comment=" . $inputFromJson['comment'] . "
    WHERE CommentID=" . $inputFromJson['commentId'];
  }else{
      echo "No mode selected";
  }

  $conn->close();

  //FUNCTIONS
  function error($err)
  {
      $result = '{"user_id":0, "error":"' . $err . '"}';
      toJSON($result);
  }


  //This return JSON files to JS
  function toJSON($json)
  {
      // "Look JSON"
      header('Content-type: application/json');

      // "Prints text to the page" 
      echo $json;
  }
  function returnWithInfo( $searchResults )
  {
      $retValue = '{"results":[' . $searchResults . '],"error":"None"}';
      toJSON( $retValue );
  }