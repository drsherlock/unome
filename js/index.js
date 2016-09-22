/**
 * Created by dr_sherlock on 20/9/16.
 */

$(function () {

    var regFlag = {
        username: 1,
        email: 1,
        password: 1
    };

    var loginFlag = {
        email: 1,
        password: 1
    };

    document.getElementById("reg_username").addEventListener("input", function () {
        var username = $("#reg_username").val();
        if (!isBlank(username)) {
            usernameCheck(username).done(usernameRegCallback);
        }
        else {
            regFlag.username = 1;
            $("#tick_reg_username").hide();
            $("#cross_reg_username").hide();
            enableButton("reg");
        }
    });

    document.getElementById("reg_email").addEventListener("input", function () {
        var email = $("#reg_email").val();
        if (!isBlank(email)) {
            emailCheck(email).done(emailRegCallback);
        }
        else {
            regFlag.email = 1;
            $("#tick_reg_email").hide();
            $("#cross_reg_email").hide();
            enableButton("reg");
        }
    });

    document.getElementById("reg_password").addEventListener("input", function () {
        var password = $("#reg_password").val();
        if (!isBlank(password)) {
            regFlag.password = 0;
            $("#cross_reg_password").hide();
            $("#tick_reg_password").fadeIn();
        }
        else {
            regFlag.password = 1;
            $("#tick_reg_password").hide();
            $("#cross_reg_password").hide();
        }
        enableButton("reg");
    });

    document.getElementById("login_email").addEventListener("input", function () {
        var email = $("#login_email").val();
        var password = $("#login_password").val();
        if (!isBlank(email)) {
            emailCheck(email).done(emailLoginCallback);
        }
        else {
            loginFlag.email = 0;
            $("#tick_login_email").hide();
            $("#cross_login_email").hide();
            enableButton("login");
        }
        if (!isBlank(password)) {
            passwordCheck(password, email).done(passwordLoginCallback);
        }
    });

    document.getElementById("login_password").addEventListener("input", function () {
        var password = $("#login_password").val();
        var email = $("#login_email").val();
        if (!isBlank(password)) {
            passwordCheck(password, email).done(passwordLoginCallback);
        }
        else {
            loginFlag.password = 0;
            $("#tick_login_password").hide();
            $("#cross_login_password").hide();
            enableButton("login");
        }
    });

    function usernameRegCallback(response) {
        var usernameResponse = parseInt(response);
        regFlag.username = usernameResponse;
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
        regFlag.email = emailResponse;
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
        loginFlag.email = emailResponse;
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
        var passwordResponse = parseInt(response);
        loginFlag.password = passwordResponse;
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
            if (regFlag.username === 0 && regFlag.email === 0 && regFlag.password === 0) {
                $("#register_btn").prop("disabled", false);
            }
            else {
                $("#register_btn").prop("disabled", true);
            }
        }
        else if (form === "login") {
            if (loginFlag.email === 1 && loginFlag.password === 1) {
                $("#login_btn").prop("disabled", false);
            }
            else {
                $("#login_btn").prop("disabled", true);
            }
        }
    }

    function isBlank(string) {
        return string === null || string === ''
    }
});
