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
        email: 0,
        password: 0
    };

    document.getElementById("reg_username").addEventListener("input", function () {
        var username = $(this).val();
        if (!isBlank(username)) {
            usernameCheck(username).done(usernameRegCallback);
        }
        else {
            regFlag.username = 1;
            hideSign("reg", "username");
        }
    });

    document.getElementById("reg_email").addEventListener("input", function () {
        var email = $(this).val();
        if (!isBlank(email)) {
            emailCheck(email).done(emailRegCallback);
        }
        else {
            regFlag.email = 1;
            hideSign("reg", "email");
        }
    });

    document.getElementById("reg_password").addEventListener("input", function () {
        var password = $(this).val();
        if (!isBlank(password)) {
            regFlag.password = 0;
            showTick("reg", "password");
        }
        else {
            regFlag.password = 1;
            hideSign("reg", "password");
        }
    });

    document.getElementById("login_email").addEventListener("input", function () {
        var email = $(this).val();
        var password = $("#login_password").val();
        if (!isBlank(email)) {
            emailCheck(email).done(emailLoginCallback);
        }
        else {
            loginFlag.email = 0;
            hideSign("login", "email");
        }
        if (!isBlank(password)) {
            passwordCheck(password, email).done(passwordLoginCallback);
        }
    });

    document.getElementById("login_password").addEventListener("input", function () {
        var password = $(this).val();
        var email = $("#login_email").val();
        if (!isBlank(password)) {
            passwordCheck(password, email).done(passwordLoginCallback);
        }
        else {
            loginFlag.password = 0;
            hideSign("login", "password");
        }
    });

    function usernameRegCallback(response) {
        regFlag.username = parseInt(response);
        if (regFlag.username === 1) {
            showCross("reg", "username");
        }
        else {
            showTick("reg", "username");
        }
    }

    function emailRegCallback(response) {
        regFlag.email = parseInt(response);
        if (regFlag.email === 1 || regFlag.email === -1) {
            showCross("reg", "email");
        }
        else {
            showTick("reg", "email");
        }
    }

    function emailLoginCallback(response) {
        loginFlag.email = parseInt(response);
        if (loginFlag.email === 0 || loginFlag.email === -1) {
            showCross("login", "email");
        }
        else {
            showTick("login", "email");
        }
    }

    function passwordLoginCallback(response) {
        loginFlag.password = parseInt(response);
        if (loginFlag.password === 0) {
            showCross("login", "password");
        }
        else {
            showTick("login", "password");
        }
    }

    function usernameCheck(username) {
        return $.ajax({
            type: "POST",
            url: "ajax_index.php",
            data: {username: username, usernameCheck: 1}
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

    //Utility functions


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

    function isBlank(type) {
        return type === null || type === '';
    }

    function hideSign(form, type) {
        $("#tick_" + form + "_" + type).hide();
        $("#cross_" + form + "_" + type).hide();
        enableButton(form);
    }

    function showCross(form, type) {
        $("#tick_" + form + "_" + type).hide();
        $("#cross_" + form + "_" + type).fadeIn();
        enableButton(form);
    }

    function showTick(form, type) {
        $("#cross_" + form + "_" + type).hide();
        $("#tick_" + form + "_" + type).fadeIn();
        enableButton(form);
    }

});
