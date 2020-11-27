const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


// highScoresList.innerHTML = highScores
//   .map(score => {
//     return `<li class="high-score">${score.name} - ${score.score}</li>`;
//   })
//   .join("");

async function getUsers(){
  try{
      const result = await axios({
          method:'get',
          url: 'https://us-central1-comp426-firebase.cloudfunctions.net/users'
      })
      return result.data
  } catch {
      console.error();
  }
}


document.addEventListener("DOMContentLoaded", async function render(){
  let allUsers = await getUsers()

  let scores = new Array(allUsers.length)
  for(let i = 0; i < allUsers.length; i++){
    scores[i] = new Array(2)
  }
  for (let i = 0; i < allUsers.length; i++){
    scores[i][0] = allUsers[i].highestGameScore
    scores[i][1] = allUsers[i].userName
  }

  scores.sort(function(a,b) {
    return b[0]-a[0]
  });

  let highestFive = scores.slice(0, 10);

  highScoresList.innerHTML = highestFive
    .map((score, i) => {
      return `<li class="high-score">Top: ${i+1} ${score[1]} - ${score[0]}</li>`;
    })
    .join("")
})




