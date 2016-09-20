<?php
/**
 * Created by PhpStorm.
 * User: dr_sherlock
 * Date: 17/9/16
 * Time: 5:00 PM
 */

include_once("header.php");

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

    $query = "INSERT into users(username, email, password) VALUES('$username', '$email', '$password')";
    $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
    $_SESSION['user_session'] = $username;
    header("Location: home.php");
}

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

<div id="index-con" class="container-fluid">
    <div id="index-row" class="row animatedParent">

        <div id="index-left" class="col-xs-6 col-lg-6 animated bounceInDown">
            <div id="index-main">
                <h1>UNOME</h1>
                <h2>Keep Your Thoughts Safe With Unome</h2>
            </div>
        </div>

        <div id="index-right" class="col-xs-6 col-lg-6 animated bounceInUp">
            <div id="index-outer-form">
                <div class="index-mid-form row">
                    <!--Register Form-->
                    <div class="index-inner-form col-xs-10 col-lg-10 col-xs-offset-1 col-lg-offset-1">
                        <h3>Register</h3>
                        <br>
                        <form method="post" action = "index.php" class="form-group">
                            <div class="row">
                                <div class="col-xs-8 col-lg-8 col-xs-offset-2 col-lg-offset-2">
                                    <input type="text" placeholder="Username" name="username" id="reg_username" class="form-control" required />
                                </div>
                                <div class="col-xs-2 col-lg-2">
                                    <i id="tick_username" class="fa fa-2x fa-check" aria-hidden="true"></i>
                                    <i id="cross_username" class="fa fa-2x fa-times" aria-hidden="true"></i>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-8 col-lg-8 col-xs-offset-2 col-lg-offset-2">
                                    <input type="email" placeholder="Email" name="email" id="reg_email" class="form-control" required />
                                </div>
                                <div class="col-xs-2 col-lg-2">
                                    <i id="tick_email" class="fa fa-2x fa-check" aria-hidden="true"></i>
                                    <i id="cross_email" class="fa fa-2x fa-times" aria-hidden="true"></i>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-8 col-lg-8 col-xs-offset-2 col-lg-offset-2">
                                    <input type="password" placeholder="Password" name="password" id="reg_password" class="form-control" required />
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-6 col-lg-6 col-xs-offset-3 col-lg-offset-3">
                                    <button type="submit" name="register_btn" class="btn btn-default" id="register_btn" disabled>Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <hr>

                <div class="index-mid-form row">
                    <!--Login form-->
                    <div class=" index-inner-form col-xs-10 col-lg-10 col-xs-offset-1 col-lg-offset-1">
                        <h3>Login</h3>
                        <br>
                        <form method="post" action="index.php" class="form-group">
                            <div class="row">
                                <div class="col-xs-8 col-lg-8 col-xs-offset-2 col-lg-offset-2">
                                    <input type="email" placeholder="Email" name="email" class="form-control" required />
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-8 col-lg-8 col-xs-offset-2 col-lg-offset-2">
                                    <input type="password" placeholder="Password" name="password" class="form-control" required />
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-xs-6 col-lg-6 col-xs-offset-3 col-lg-offset-3">
                                    <button type="submit" name="login_btn" class="btn btn-default" disabled>Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php

include_once("footer.php") ;

?>