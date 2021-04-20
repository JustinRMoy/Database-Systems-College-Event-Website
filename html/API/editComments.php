<?php

  require 'db_conn.php';
  
  $inputFromJson = json_decode(file_get_contents('php://input'), true);

  //$user_level = $inputFromJson['user_level'];
  $sql;
    
  //Only Selects UCF IF for now
  //$sql_select = "SELECT ID FROM University WHERE Name = 'University of Central Florida';";
  //$result = mysqli_query($conn, $sql_select);
  //$Users = $result->fetch_assoc();
 

if($inputFromJson['mode'] == 1){//1 = create comment

  $sql = "INSERT INTO Comments (StudentID, EventID, Comment) 
  VALUES ('". $inputFromJson['userId'] ."','". $inputFromJson['eventId'] ."','". $inputFromJson['comment'] ."')";

}elseif($inputFromJson['mode'] == 2){//delete a comment
  $sql = "DELETE FROM Comments 
  WHERE CommentID='" . $inputFromJson['commentId'] . "'";
}elseif($inputFromJson['mode'] == 3){//update a comment
  $sql = "UPDATE Comments 
  SET Comment='" . $inputFromJson['comment'] . "'
  WHERE CommentID='" . $inputFromJson['commentId'] . "'";
}else{
  $sql = "INSERT INTO Comments (StudentID, EventID, Comment) 
  VALUES ('". $inputFromJson['userId'] ."','". $inputFromJson['eventId'] ."','". $inputFromJson['comment'] ."')";
}

  if($conn->query($sql) != TRUE )
  {
    echo "SQL Error";
    returnError( $conn->error );
  }
  else
  {
    //sendEmail("mr.l.t@hotmail.com");
    returnInfo("done");
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
    
  
