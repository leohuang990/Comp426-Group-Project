import { fakeppl } from "./fakeppl.js";

let current_id = null;
let current_user = null;
let current_email = null;
let user = null;

export async function getUser() {
  let cookie = getCookie("LongLivePrincessHu");
  var re = ",";
  var cookieList = cookie.split(re);

  current_id = cookieList[0];
  current_user = cookieList[1];
  current_email = cookieList[2];

  try {
    const result = await axios({
      method: "get",
      url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${current_id}`,
    });

    user = {
      id: "",
      userName: "",
      email: "",
      password: "",
      matchPoint: [],
      friends: [],
      highestGameScore: 0,
    };
    // user.userName = "给世上最美好的SWW献上赞歌"
    // user.email = "sww@sww.com"
    // user.password = "xxx"
    // user.matchPoint = [10,10,10,10,10]
    // user.friends = []
    // user.highestGameScore = 0

    user.id = result.data.id;
    user.userName = result.data.userName;
    user.email = result.data.email;
    user.password = result.data.password;
    user.matchPoint = result.data.matchPoint;
    user.following = result.data.following;
    user.highestGameScore = result.data.highestGameScore;
    return user;
  } catch {
    console.error("something went wrong pulling this user");
  }
}

export async function getUsers() {
  try {
    const result = await axios({
      method: "get",
      url: "https://us-central1-comp426-firebase.cloudfunctions.net/users",
    });
    return result.data;
  } catch {
    console.error("something went wrong pulling users");
  }
}

export function getFakeUsers() {
  return fakeppl;
}

export async function upDateUser(finalScore) {
  let temp = [];
  temp[0] = finalScore.extraversion;
  temp[1] = finalScore.agreeableness;
  temp[2] = finalScore.conscientiousness;
  temp[3] = finalScore.emotional_stability;
  temp[4] = finalScore.intellect;

  user.matchPoint = temp;

  const result = await axios({
    method: "put",
    url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${current_id}`,
    data: user,
  });
}

export async function addFriend(event) {
  let target = event.target;
  target.innerHTML = "(๑•̀ㅂ•́)و✧ Successfully Followed";
  target.classList.remove("is-warning");
  target.classList.remove("fas");
  target.classList.remove("fa-user-plus");
  target.classList.add("is-success");
  let id = target.id;

  let followTarget = null;
  try {
    followTarget = await axios({
      method: "get",
      url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${id}`,
    });
  } catch {
    console.error("get following error");
  }

  let followTargetObj = {
    id: followTarget.data.id,
    // username is lowercase in this only fucking place
    username: followTarget.data.userName,
    email: followTarget.data.email,
  };

  user.following.push(followTargetObj);

  try {
    const result = await axios({
      method: "put",
      url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${current_id}`,
      data: user,
    });
  } catch {
    console.error("put following error");
  }
}
