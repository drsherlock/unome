/**
 * Created by dr_sherlock on 20/9/16.
 */

$(function () {

    var usernameRegFlag = 1, emailRegFlag = 1, passwordRegFlag = 1;
    var emailLoginFlag = 0, passwordLoginFlag = 0;

    document.getElementById("reg_username").addEventListener("input", function () {
        var username = $("#reg_username").val();
        if (username !== null && username !== "") {
            usernameCheck(username).done(usernameRegCallback);
        }
        else {
            usernameRegFlag = 1;
            $("#tick_reg_username").hide();
            $("#cross_reg_username").hide();
            enableButton("reg");
        }
    });

    document.getElementById("reg_email").addEventListener("input", function () {
        var email = $("#reg_email").val();
        if (email !== null && email !== "") {
            emailCheck(email).done(emailRegCallback);
        }
        else {
            emailRegFlag = 1;
            $("#tick_reg_email").hide();
            $("#cross_reg_email").hide();
            enableButton("reg");
        }
    });

    document.getElementById("reg_password").addEventListener("input", function () {
        var password = $("#reg_password").val();
        if (password !== null && password !== "") {
            passwordRegFlag = 0;
            $("#cross_reg_password").hide();
            $("#tick_reg_password").fadeIn();
        }
        else {
            passwordRegFlag = 1;
            $("#tick_reg_password").hide();
            $("#cross_reg_password").hide();
        }
        enableButton("reg");
    });

    document.getElementById("login_email").addEventListener("input", function () {
        var email = $("#login_email").val();
        var password = $("#login_password").val();
        if (email !== null && email !== "") {
            emailCheck(email).done(emailLoginCallback);
            if (password !== null && password !== "") {
                passwordCheck(password, email).done(passwordLoginCallback);
            }
            else {
                $("#tick_login_password").hide();
                $("#cross_login_password").hide();
            }
        }
        else {
            emailLoginFlag = 0;
            $("#tick_login_email").hide();
            $("#cross_login_email").hide();
            passwordCheck(password, email).done(passwordLoginCallback);
            enableButton("login");
        }
    });

    document.getElementById("login_password").addEventListener("input", function () {
        var password = $("#login_password").val();
        var email = $("#login_email").val();
        if (password !== null && password !== "") {
            passwordCheck(password, email).done(passwordLoginCallback);
        }
        else {
            passwordLoginFlag = 0;
            $("#tick_login_password").hide();
            $("#cross_login_password").hide();
            enableButton("login");
        }
    });

    function usernameRegCallback(response) {
        var usernameResponse = parseInt(response);
        usernameRegFlag = usernameResponse;
        if (usernameResponse === 1) {
            $("#tick_reg_username").hide();
            $("#cross_reg_username").fadeIn();
        }
        else {
            $("#cross_reg_username").hide();
            $("#tick_reg_username").fadeIn();
        }
        enableButton("reg");
    }

    function emailRegCallback(response) {
        var emailResponse = parseInt(response);
        emailRegFlag = emailResponse;
        if (emailResponse === 1 || emailResponse === -1) {
            $("#tick_reg_email").hide();
            $("#cross_reg_email").fadeIn();
        }
        else {
            $("#cross_reg_email").hide();
            $("#tick_reg_email").fadeIn();
        }
        enableButton("reg");
    }

    function emailLoginCallback(response) {
        var emailResponse = parseInt(response);
        emailLoginFlag = emailResponse;
        if (emailResponse === 0 || emailResponse === -1) {
            $("#tick_login_email").hide();
            $("#cross_login_email").fadeIn();
        }
        else {
            $("#cross_login_email").hide();
            $("#tick_login_email").fadeIn();
        }
        enableButton("login");
    }

    function passwordLoginCallback(response) {
        console.log(" " + response + " ");
        var passwordResponse = parseInt(response);
        passwordLoginFlag = passwordResponse;
        if (passwordResponse === 0) {
            $("#tick_login_password").hide();
            $("#cross_login_password").fadeIn();
        }
        else {
            $("#cross_login_password").hide();
            $("#tick_login_password").fadeIn();
        }
        enableButton("login");
    }

    function usernameCheck(username) {
        return $.ajax({
            type: "POST",
            url: "ajax_index.php",
            data: "username=" + username
        });
    }

    function emailCheck(email) {
        return $.ajax({
            type: "POST",
            url: "ajax_index.php",
            data: {email: email, emailCheck: 1}
        });
    }

    function passwordCheck(password, email) {
        return $.ajax({
            type: "POST",
            url: "ajax_index.php",
            data: {password: password, email: email, passCheck: 1}
        });
    }

    function enableButton(form) {
        if (form === "reg") {
            if (usernameRegFlag === 0 && emailRegFlag === 0 && passwordRegFlag === 0) {
                $("#register_btn").prop("disabled", false);
            }
            else {
                $("#register_btn").prop("disabled", true);
            }
        }
        else if (form === "login") {
            if (emailLoginFlag === 1 && passwordLoginFlag === 1) {
                $("#login_btn").prop("disabled", false);
            }
            else {
                $("#login_btn").prop("disabled", true);
            }
        }
    }
});

