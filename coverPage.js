const handelSignupButtonPress = function () {
  window.location.href = "./signUp/signUp.html";
};
const handelloginButtonPress = function () {
  window.location.href = "./login.html";
};

$(function () {
  $("#signUpButton").on("click", handelSignupButtonPress);
  $("#loginButton").on("click", handelloginButtonPress);
});
