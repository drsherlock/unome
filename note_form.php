<?php
/**
 * Created by PhpStorm.
 * User: dr_sherlock
 * Date: 12/9/16
 * Time: 7:24 PM
 */

session_start();

if(!isset($_SESSION['user_session'])) {
    header("Location: login_form.php");
}

require_once('db_connect.php');

if(isset($_POST['create_note_btn'])) {

    $username = $_SESSION['user_session'];
    $query = "SELECT user_id from users WHERE username = '$username'";
    $query_result = mysqli_query($dbconn, $query);
    $row = mysqli_fetch_assoc($query_result);
    $user_id = $row['user_id'];

    $note = mysqli_real_escape_string($dbconn, $_POST['note']);

    $query = "INSERT into notes(date, creator_id, note) VALUES(NOW(), '$user_id', '$note')";
    $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
    header("Location: home.php");
}

mysqli_close($dbconn);

?>

<form method="post" action="note_form.php">
    <textarea name="note" placeholder="Your Note" rows="20" cols="140"></textarea>
    <br>
    <button type="submit" name="create_note_btn">Save</button>
</form>

<form method="get" action="home.php">
    <button type="submit">Cancel</button>
</form>
