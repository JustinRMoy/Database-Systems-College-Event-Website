<?php

require_once 'session.php';

session_destroy();
header('location: ../index.html');

?>