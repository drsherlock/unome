<?php
/**
 * Created by PhpStorm.
 * User: dr_sherlock
 * Date: 12/9/16
 * Time: 10:58 PM
 */

session_start();

//Go to login page if not logged in
if(!isset($_SESSION['user_session'])) {
    header("Location: login_form.php");
}

require_once("db_connect.php");

//Get note id from url
$note_id = $_GET['id'];

$query = "SELECT note from notes WHERE note_id = '$note_id'";
$query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
$row = mysqli_fetch_assoc($query_result);
$note = $row['note'];

//When user clicks save button
if(isset($_POST['save_note_btn'])) {
    $note = $_POST['note'];

//    Save note and redirect to home page
    $query = "UPDATE notes SET note = '$note' WHERE note_id ='$note_id'";
    $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
    header("Location: home.php");
}

//When user clicks delete button
if(isset($_POST['del_note_btn'])) {
//    Delete note and redirect to home page
    $query = "DELETE from notes WHERE note_id = '$note_id'";
    $query_result = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
    header("Location: home.php");
}

mysqli_close($dbconn);

?>

<!--Edit and save note-->
<form method="post" action="see_note.php?id=<?php echo $note_id; ?>">
    <textarea name="note" placeholder="Your Note" rows="20" cols="140"><?php echo $note; ?></textarea>
    <br>
    <button type="submit" name="save_note_btn">Save</button>
</form>

<!--Cancel button-->
<form method="get" action="home.php">
    <button type="submit">Cancel</button>
</form>

<!--Delete button-->
<form method="post" action="see_note.php?id=<?php echo $note_id; ?>">
    <button type="submit" name="del_note_btn">Delete</button>
</form>
