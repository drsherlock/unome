<?php
/**
 * Created by PhpStorm.
 * User: dr_sherlock
 * Date: 11/9/16
 * Time: 8:12 PM
 */

require("do_not_show.php");

$dbhost = "localhost";
$dbuser = $user;
$dbpass = $pass;
$dbname = $name;

$dbconn = new MySQLi($dbhost, $dbuser, $dbpass, $dbname);

if(mysqli_connect_errno()) {
    die("DB Error".mysqli_connect_error());
}