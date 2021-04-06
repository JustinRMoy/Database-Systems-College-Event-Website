<?php

require 'db_conn.php';

$inputFromJson = json_decode(file_get_contents('php://input'), true);

$rsoName = $inputFromJson['rsoName'];
$admin = $inputFromJson['admin'];
$students = array();

foreach($inputFromJson['students'] as $email)
{
    array_push($students, $email);
}

$uniID = $inputFromJson['uniID'];

$sql_name = "SELECT * FROM RSO WHERE Name = '$rsoName' AND UniversityID = $uniID";
$check = mysqli_query($conn, $sql_name);

if ($check == false)
{
    returnError($conn->error);
}

$numRows = mysqli_num_rows($check);

if ($numRows > 0)
{
    returnError("RSO name already exists", $conn);
}

foreach ($students as $student)
{
    $sql_id = "SELECT ID from Users WHERE Email = '$student'";
    $result = mysqli_query($conn, $sql_id);

    if ($result == false)
    {
        returnError($conn->error);
    }

    if ($result == NULL)
    {
        $error = "Student email: " . $student . " is not an active student account";
        returnError($error);
    }
}

$sql_insert = "INSERT INTO RSO (UniversityID, AdminID, Name)
Values ($uniID, $admin, '".$rsoName."')";
$added = mysqli_query($conn, $sql_insert);

if ($added == false)
{
    returnError($conn->error);
}

$sql_update_admin = "UPDATE Users SET User_level = 'Admin' WHERE ID = $admin";
$updated = mysqli_query($conn, $sql_update_admin);

if ($updated == false)
{
    returnError($conn->error);
}

$sql_ros_id = "SELECT ID FROM RSO WHERE Name = '$rsoName'";
$result = mysqli_query($conn, $sql_ros_id);
$RSONum = $result->fetch_assoc();
$id = $RSONum['ID'];

$sql_user_rso = "UPDATE Users SET RSOID = $id WHERE ID = $admin";
mysqli_query($conn, $sql_user_rso);

foreach($students as $student)
{
    $sql_user_rso = "UPDATE Users SET RSOID = $id WHERE Email = '$student'";
    mysqli_query($conn, $sql_user_rso);
}

returnInfo("RSO created successfully!");


function returnError($error, $conn)
{
    $ret->msg = $error;
    toJson($ret);
    $conn->close();
    exit;
}

function returnInfo($info)
{
    $ret->msg = $info;
    toJSON($ret);
}

function toJSON($ret)
{
    header('Content-type: application/json');
    $json = json_encode($ret);
    echo $json;
}