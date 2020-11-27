const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalScore.innerText = "Your Score is: " + mostRecentScore;

let current_id = null;
let current_user = null;
let current_email = null;
let user = null;

async function getUser() {
  let cookie = getCookie("LongLivePrincessHu");
  var re = ",";
  var cookieList = cookie.split(re);

  current_id = cookieList[0];
  current_user = cookieList[1];
  current_email = cookieList[2];

  username.innerHTML = current_user;

  try {
    const result = await axios({
      method: "get",
      url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${current_id}`,
    });

    user = result;
    return user;
  } catch {
    console.error("something went wrong pulling this user");
  }
}

async function upDateUser(event) {
  event.preventDefault();

  user.data.highestGameScore = parseInt(mostRecentScore);

  try {
    const result = await axios({
      method: "put",
      url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${current_id}`,
      data: user.data,
    });
  } catch {
    console.error("something went wrong");
  }
  confirm("Your new score has been Saved!");
  event.target.disabled = true;
}

document.addEventListener("DOMContentLoaded", getUser());
