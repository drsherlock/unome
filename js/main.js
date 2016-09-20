/**
 * Created by dr_sherlock on 20/9/16.
 */

$(document).ready(function() {
    var usernameFlag = 1, emailFlag = 1, passwordFlag = 1;
    document.getElementById("reg_username").addEventListener("input", function() {
        var username = $("#reg_username").val();
        if(username !== null && username !== "") {
            usernameCheck(username).done(usernameCallback);
        }
        else {
            usernameFlag = 1;
            $("#tick_username").hide();
            $("#cross_username").hide();
            enableButton();
        }
    });

    document.getElementById("reg_email").addEventListener("input", function () {
        var email = $("#reg_email").val();
        if(email !== null && email !== "") {
            emailCheck(email).done(emailCallback);
        }
        else {
            emailFlag = 1;
            $("#tick_email").hide();
            $("#cross_email").hide();
            enableButton();
        }
    });

    document.getElementById("reg_password").addEventListener("input", function () {
        var password = $("#reg_password").val();
        if (password !== null && password !== "") {
            passwordFlag = 0;
            enableButton();
        }
        else {
            passwordFlag = 1;
            enableButton();
        }
    });

    function usernameCallback(response) {
        var usernameResponse = parseInt(response);
        usernameFlag = usernameResponse;
        if(usernameResponse === 1) {
            $("#tick_username").hide();
            $("#cross_username").fadeIn();
        }
        else {
            $("#cross_username").hide();
            $("#tick_username").fadeIn();
        }
        enableButton();
    }

    function emailCallback(response) {
        var emailResponse = parseInt(response);
        emailFlag = emailResponse;
        if(emailResponse === 1) {
            $("#tick_email").hide();
            $("#cross_email").fadeIn();
        }
        else {
            $("#cross_email").hide();
            $("#tick_email").fadeIn();
        }
        enableButton();
    }

    function usernameCheck (username) {
        return $.ajax({
            type: "POST",
            url: "check_availability.php",
            data: "username="+username
        });
    }

    function emailCheck (email) {
        return $.ajax({
            type: "POST",
            url: "check_availability.php",
            data: "email="+email
        });
    }


    function enableButton () {
        if (usernameFlag === 0 && emailFlag === 0 && passwordFlag === 0) {
            $("#register_btn").prop("disabled", false);
        }
        else {
            $("#register_btn").prop("disabled", true);
        }
    }

});

