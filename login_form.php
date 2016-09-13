<?php
/**
 * Created by PhpStorm.
 * User: dr_sherlock
 * Date: 12/9/16
 * Time: 4:43 PM
 */

session_start();

//Go to home page if user already logged in
if(isset($_SESSION['user_session'])) {
    header("Location: home.php");
}

require_once('db_connect.php');

//When user clicks login button
if(isset($_POST['login_btn'])) {
    $email = mysqli_real_escape_string($dbconn, $_POST['email']);
    $password = mysqli_real_escape_string($dbconn, $_POST['password']);

    $query = "SELECT username, email, password from users WHERE email = '$email'";
    $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
    $result_rows = mysqli_num_rows($query_result);

//    If email not present in users table
    if($result_rows == 0) {
        $error_msg = "Email not registerd!";
        echo $error_msg;
    }
    else {
        $row = mysqli_fetch_assoc($query_result);
        $pass = password_verify($password, $row['password']);
//        If password does not match
        if(!$pass) {
            $error_msg = "Wrong password!";
            echo $error_msg;
        }
//        If password matches, set session and redirect to home page
        else {
            $_SESSION['user_session'] = $row['username'];
            header("Location: home.php");
        }
    }
}

mysqli_close($dbconn);

?>

<!--Login form-->
<form method="post" action="login_form.php">
    <input type="email" placeholder="Email" name="email" required />
    <input type="password" placeholder="password" name="password" required />
    <button type="submit" name="login_btn">Login</button>
</form>

<!--Register button-->
<form method="get" action="register_form.php">
    <button type="submit">Register</button>
</form>
