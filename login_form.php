<?php
/**
 * Created by PhpStorm.
 * User: dr_sherlock
 * Date: 12/9/16
 * Time: 4:43 PM
 */

session_start();

if(isset($_SESSION['user_session'])) {
    header("Location: home.php");
}

require_once('db_connect.php');

if(isset($_POST['login_btn'])) {
    $email = mysqli_real_escape_string($dbconn, $_POST['email']);
    $password = mysqli_real_escape_string($dbconn, $_POST['password']);

    $query = "SELECT username, email, password from users WHERE email = '$email'";
    $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
    $result_rows = mysqli_num_rows($query_result);

    if($result_rows == 0) {
        $error_msg = "Email not registerd!";
        echo $error_msg;
    }
    else {
        $row = mysqli_fetch_assoc($query_result);
        $pass = password_verify($password, $row['password']);
        if(!$pass) {
            $error_msg = "Wrong password!";
            echo $error_msg;
        }
        else {
            $_SESSION['user_session'] = $row['username'];
            header("Location: home.php");
        }
    }
}

mysqli_close($dbconn);

?>

<form method="post" action="login_form.php">
    <input type="email" placeholder="Email" name="email" required />
    <input type="password" placeholder="password" name="password" required />
    <button type="submit" name="login_btn">Login</button>
</form>

<form method="get" action="register_form.php">
    <button type="submit">Register</button>
</form>
