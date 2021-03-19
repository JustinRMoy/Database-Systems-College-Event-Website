<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    // Fetch credentials from file residing on the server.
    $conf = parse_ini_file('/var/www/db_conn.config');

    if ($conf)
    {
        // The file exists and we can open a new connection.
        $conn = new mysqli($conf['ip'], $conf['username'], $conf['password'], $conf['name']);
        if ($conn->connect_error)
        {
            // Invalid credentials in $conn.
            die('Connection to the database failed: ' . $conn->connect_error);
        }
    }
    else
    {
        die('Could not find database config file.');
    }
?>
