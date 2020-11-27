var socket = undefined;

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

function buildConnection() {
  socket = io();
  const username = getCookie("LongLivePrincessHu").split(", ")[1];
  socket.emit("join", username);
  socket.on("chatMessage", (username, message, time) => {
    renderOthers(username, message, time);
  });
  socket.on("broadcast", (message) => {
    officialRender(message);
  });
  socket.on("myMsg", (username, msg, time) => {
    render(username, msg, time);
  });
}

async function unfollow(email) {
  const id = getCookie("LongLivePrincessHu").split(", ")[0];
  const result = await axios({
    method: "get",
    url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${id}`,
  });
  let newFollowList = result.data.following;
  newFollowList = newFollowList.filter((follow) => follow.email !== email);
  const result2 = await axios({
    method: "put",
    url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${id}`,
    data: {
      userName: result.data.userName,
      matchPoint: result.data.matchPoint,
      email: result.data.email,
      password: result.data.password,
      following: newFollowList,
      highestGameScore: result.data.highestGameScore,
    },
  });
  loadFollowing();
}
let IF = [];
buildConnection();
async function loadFollowing() {
  IF.splice(0, IF.length);
  $("#follow_column").empty();
  const column = $("#follow_column");
  const id = getCookie("LongLivePrincessHu").split(", ")[0];
  const result = await axios({
    method: "get",
    url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${id}`,
  });
  if (result.data.following.length === 0) {
    column.append('<h3 id="target">You follow no one</h3>');
    return;
  }
  result.data.following.map((follow) => {
    const div = `<div id = "${follow.userName}" class="individual">
    <p style="font-size: larger">${follow.username}</p><span style="relative;left: 50px">${follow.email}</span><button onclick="unfollow('${follow.email}')" style="float: right; position: relative; top: -15px"><i class="fas fa-minus-square fa-2x"></i></button>
    <br>
    </div>`;
    column.append(div);
    IF.push(follow.username);
  });
}
loadFollowing();
$(".textarea").keydown(function (e) {
  const username = getCookie("LongLivePrincessHu").split(", ")[1];
  if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
    const value = event.target.value;
    if (!value) {
      return;
    }
    socket.emit("chatMessage", username, value);
    $("#chat-ul").scrollTop = $("#chat-ul").scrollHeight;
    event.target.value = "";
    event.target.focus();
  }
});

function leave2() {
  $("#black_shadow").css("visibility", "hidden");
  $("#add_follow_window").css("visibility", "hidden");
}

async function showFollow() {
  $("#black_shadow").css("visibility", "visible");
  $("#add_follow_window").css("visibility", "visible");
  const result = await axios({
    method: "get",
    url: "https://us-central1-comp426-firebase.cloudfunctions.net/users",
  });
  localUsers.splice(0, localUsers.length);
  result.data.map((user) => {
    if (user.userName === getCookie("LongLivePrincessHu").split(", ")[1]) {
      return;
    }
    localUsers.push({
      id: user.id,
      username: user.userName,
      email: user.email,
    });
  });
}

async function confirmFollow() {
  if (!$("#follow_input").val()) return;
  if (IF.includes($("#follow_input").val())) {
    $("#search_res").empty();

    $("#search_res").append(
      '<h1 style="color: red">You follow someone twice!</h1>'
    );
    return;
  }
  const id = getCookie("LongLivePrincessHu").split(", ")[0];
  const result = await axios({
    method: "get",
    url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${id}`,
  });
  const newFollowList = result.data.following;
  const newFollow = localUsers.filter(
    (user) => user.username == $("#follow_input").val()
  )[0];
  newFollowList.push(newFollow);
  const result2 = await axios({
    method: "put",
    url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${id}`,
    data: {
      userName: result.data.userName,
      matchPoint: result.data.matchPoint,
      email: result.data.email,
      password: result.data.password,
      following: newFollowList,
      highestGameScore: result.data.highestGameScore,
    },
  });
  $("#target").html("");
  const div = `<div id = "${newFollow.email}" class="individual">
  <p style="font-size: larger">${newFollow.username}</p><span>${newFollow.email}</span><button style="float: right; position: relative; top: -15px" onclick="unfollow('${newFollow.email}')"><i class="fas fa-minus-square fa-2x"></i></button>
  <br>
  </div>`;
  $("#follow_column").append(div);
  IF.push($("#follow_input").val());
  $("#follow_input").val("");
  $("#search_res").empty();
  leave2();
}


function render(username, msg, time){
  $('#chat-ul').append(`<li class = "me"><div style="font-size: 15px;float: right">${username} UTC ${time}</div><br>${msg}</li>`);
  let chat_ul = document.getElementById('chat-ul')
  chat_ul.scrollTop = chat_ul.scrollHeight;
}

function renderOthers(username, msg, time){
  $('#chat-ul').append(`<li class = "him"><div style="font-size: 15px" >${username} UTC ${time}</div>${msg}</li>`);
  let chat_ul = document.getElementById('chat-ul')
  chat_ul.scrollTop = chat_ul.scrollHeight;
}

function officialRender(msg) {
  if (msg.length === 21) {
    $("#chat-ul").append(`<li class = "official" id = "A">${msg}</li>`);
  } else {
    $("#chat-ul").append(`<li class = "official" id = "B">${msg}</li>`);
  }

  let chat_ul = document.getElementById("chat-ul");
  chat_ul.scrollTop = chat_ul.scrollHeight;
}
