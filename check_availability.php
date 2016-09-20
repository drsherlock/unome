<?php
/**
 * Created by PhpStorm.
 * User: dr_sherlock
 * Date: 20/9/16
 * Time: 12:35 AM
 */

session_start();

require_once('db_connect.php');

if(isset($_POST['username'])) {
    $username = mysqli_real_escape_string($dbconn, $_POST['username']);

    $query = "SELECT * from users WHERE username = '$username'";
    $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
    $result_rows = mysqli_num_rows($query_result);

    echo $result_rows;
    mysqli_close($dbconn);
}

if(isset($_POST['email'])) {
    $email = mysqli_real_escape_string($dbconn, $_POST['email']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 1;
    }

    else {
        $query = "SELECT * from users WHERE email = '$email'";
        $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
        $result_rows = mysqli_num_rows($query_result);

        echo $result_rows;
    }

    mysqli_close($dbconn);
}

?>