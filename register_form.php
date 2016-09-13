<?php
/**
 * Created by PhpStorm.
 * User: dr_sherlock
 * Date: 11/9/16
 * Time: 6:42 PM
 */

session_start();

//Go to home page if user already logged in
if(isset($_SESSION['user_session'])) {
    header("Location: home.php");
}

require_once('db_connect.php');

//When user clicks register button
if(isset($_POST['register_btn'])) {
    $username = mysqli_real_escape_string($dbconn, $_POST['username']);
    $email = mysqli_real_escape_string($dbconn, $_POST['email']);
    $password = mysqli_real_escape_string($dbconn, $_POST['password']);

//    Create password hash
    $password = password_hash($password, PASSWORD_DEFAULT);

    $query = "SELECT * from users WHERE email = '$email'";
    $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
    $result_rows = mysqli_num_rows($query_result);

//    If email already present in users table
    if($result_rows != 0) {
        $error_msg = "Email already registered!";
    }

    $query = "SELECT * from users WHERE username = '$username'";
    $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
    $result_rows = mysqli_num_rows($query_result);

//    If username already taken
    if($result_rows != 0) {
        $error_msg = "Username taken!";
    }

    if($error_msg) {
        echo $error_msg;
    }
//    If no error, register user and redirect to login page
    else {
        $query = "INSERT into users(username, email, password) VALUES('$username', '$email', '$password')";
        $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
        header("Location: login_form.php");
    }
}

mysqli_close($dbconn);

?>

<form method="post" action = "register_form.php">
    <input type="text" placeholder="Username" name="username" required />
    <input type="email" placeholder="Email" name="email" required />
    <input type="password" placeholder="Password" name="password" required />
    <button type="submit" name="register_btn">Register</button>
    <br>
</form>

<form method="get" action="login_form.php">
    <button type="submit">Login</button>
</form>
