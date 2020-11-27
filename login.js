function ValidateEmail(mail) {
  let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mail.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

const handelLoginButtonPress = async function (event) {
  event.preventDefault();
  event.stopPropagation();
  let email = $("#email").val();
  let password = $("#hidden").val();

  const $message = $("#message");

  let message = "";
  if (email.length === 0 || password.length === 0) {
    message = "Please provide all the needed fields!";
  } else if (!ValidateEmail(email)) {
    message = "Please provide a valid email address!!";
  } else {
    try {
      const result = await axios({
        method: "get",
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/email/${email}`,
      });
      let data = result.data;
      if (data.password != password) {
        message = "The password provided seems to be Incorrect!";
      } else {
        createCookie(
          "LongLivePrincessHu",
          `${data.id}, ${data.userName}, ${data.email}`
        );
        // This is where the jump to the main page is at, at this point, the email and password provided match what we have in the database. The data of the user is in the data filed.

        if (data.matchPoint[0] === -100) {
          // this need to jump to the questionar page
          // At this point, the email and password provided match what we have in the database. The data of the user is in the data filed.
          window.location.href = "./questionnaire/index.html";
        } else {
          // jump to the main page
          // At this point, the email and password provided match what we have in the database. The data of the user is in the data filed.
          window.location.href = "./main_interface/main_interface.html";
        }
      }
    } catch (err) {
      console.log(err);
      message = "This email has not been registered yet!";
    }
  }
  $message.empty();
  $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
};

$(function () {
  $("#loginButton").on("click", handelLoginButtonPress);
});
