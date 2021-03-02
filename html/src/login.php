<?php

 $inputFromJson = json_decode(file_get_contents('php://input'), true);

    $email = $inputFromJson['userName'];
    $password = $inputFromJson['password'];
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
        else{
            //query to DB
            $sql = "SELECT customer_id, customer_name, customer_prof_status FROM customer WHERE customer_email = '".$email."' and customer_password = '".$password."';";
            $result = mysqli_query($conn, $sql);
            $numRows = mysqli_num_rows($result);
            //Review SQL Result
            if($numRows > 0){
                //User found
                $user = $result->fetch_assoc();
                $id = $user["customer_id"];
                $fullName = $user["customer_name"];
                $profile_status = $user["customer_prof_status"];
                //echo ($id);
                returnUser($id, $fullName, $profile_status);

            }
            //User not found
            else{
                error("Email or password is incorrect");
                }
            $conn->close();
        }
    //FUNCTIONS

    function error($err){
        $result = '{"customer_id":0, "error":"' . $err . '"}';
        toJSON($result);
    }

    //This takes the user to the landing page 
    //It will also send the user info to the landing page
    function returnUser($id, $fullName, $profile_status){
        $ret = '{"customer_id":"'. $id .'", "customer_fullname": "'. $fullName .'", "customer_prof_status": "'. $profile_status .'"}';
        toJSON($ret);
    }

    //This return JSON files to JS
    function toJSON($json){
        header('Content-type: application/json');
    echo $json;
    }
        
?>