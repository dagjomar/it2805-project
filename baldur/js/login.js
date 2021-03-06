function setMenuLogin() {
    $( "#menuLogin").empty();
    $( "#menuLogin" ).append("<a class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\" id=\"navLogin\"><span class=\"glyphicon glyphicon-lock\"></span>&nbsp;&nbsp;Login</a>" +
        "<div class=\"dropdown-menu\" style=\"padding:17px;\">" +
        "<form class=\"bs-component\" id=\"formLogin\">" +
        "<div class=\"form-group\">" +
        "<input name=\"email\" id=\"email\" type=\"text\" placeholder=\"E-mail\"></div>" +
        "<div class=\"form-group\">" +
        "<input name=\"password\" id=\"password\" type=\"password\" placeholder=\"Password\"><br></div>" +
        "<div class=\"btn-group btn-block\"><button type=\"button\" id=\"loginButton\" class=\"btn-default btn-login\">Login</button>" +
        "<button type=\"button\" id=\"register\" class=\"btn-default btn-login\">Register</button></div>" +
        "</form></div>");
    document.getElementById("loginButton").addEventListener("click", loginFunc);
    document.getElementById("register").addEventListener("click", register);
    $("#password").bind("keypress", {}, submit);
}

function submit(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        e.preventDefault();
        loginFunc();
    }
};

function setMenuLoggedIn(){
    $( "#menuLogin").empty();
    $( "#menuLogin" ).append("<a class=\"dropdown-toggle\" href=\"#\" data-toggle=\"dropdown\" id=\"navLogin\"><span class=\"glyphicon glyphicon-user\"></span>&nbsp;&nbsp;</a>" +
        "<ul class=\"dropdown-menu\" aria-labelledby=\"userMenu\">" +
        "<li><a href='#' onclick=\"logout();return false;\">Log out</a></li>" +
        "<li><a href='#' onclick=\"profile();return false;\">Profile settings</a></li></ul>");
}
function logout() {
    $.removeCookie('baldurLogin', { path: '/' });
    setMenu();
    window.location.reload();
}
function setMenu() {
    if (!isLoggedIn()){
        setMenuLogin();
    }else{
        setMenuLoggedIn();
    }
}
window.onload=function(){
    setMenu();
};

function loginFunc(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(userExists(email, password)){
        $.cookie('baldurLogin', email, { expires: 1, path: '/' });
        setMenu();
        window.location.reload();
    }
}
function register(){
    var newPath = window.location.pathname.replace(/\/baldur\/.*/, "/baldur/");
    window.location = newPath+"register/register.html";
}
function profile(){
    var newPath = window.location.pathname.replace(/\/baldur\/.*/, "/baldur/");
    window.location = newPath+"profile/profile.html";
}

//TODO: Change user exists
function userExists(email, password) {
    var data = localStorage['baldur-users'];
    if (typeof data === 'undefined'){
        alert("wrong username or password");
        return false;
    }
    var users = JSON.parse(data);

    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if(user.email === email && user.password === password){
            return true;
        }
    }
    alert("wrong username or password");
    return false;
}