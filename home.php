<?php
/**
 * Created by PhpStorm.
 * User: dr_sherlock
 * Date: 12/9/16
 * Time: 5:37 PM
 */

echo "Heloooo!";

session_start();

if(!isset($_SESSION['user_session'])) {
    header("Location: login_form.php");
}

if(isset($_GET['logout_btn'])) {
    session_destroy();
    header("Location: login_form.php");
}

?>

<form method="get" action="home.php">
    <button type="submit" name="logout_btn">Logout</button>
</form>


<form method="get" action="note_form.php">
    <button type="submit">New Note</button>
</form>

<?php

require_once('db_connect.php');

$username = $_SESSION['user_session'];
$query = "SELECT note_id, date, note from notes INNER JOIN users WHERE users.username = '$username' AND users.user_id = notes.creator_id ORDER BY date DESC";
$query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));;
while($row = mysqli_fetch_assoc($query_result)) {
    echo "<p><a href='/see_note.php?id={$row["note_id"]}'>{$row['note']} on {$row['date']}</a></p>";
}

mysqli_close($dbconn);

?>

