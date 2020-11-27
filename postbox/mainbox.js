import {getUser, getUsers} from './getUser.js'

$(function() {
    loadHeaderIntoDom();
    loadPostsIntoDOM();
});

const renderPost = async function(post) {
    let render = `
    <div class = "post card" id = "post${post.id}">
        <div class = "card-header">
            <h3 class = "author card-header-title">${post.username}</h2>
        </div>
        <p class = "body card-content">Welcome to my Mailbox! Please leave any question you have for me!</p>
    `;

    let user = await getUser();

    let bottom  = ``;
    if(user.id == post.id){
        bottom = `        
        <div class = "bottom card-footer">
            <a href = "mybox.html"><button type = "button" class = "button" id = "mymailbox">View My Mailbox</button></a>`;
    }else{
        bottom = `        
        <div class = "bottom card-footer">
            <button type = "button" class = "button detail${post.id}">Details</button>`;
    }

    bottom += `</div>`
    render += bottom;
    render += `</div>`;
    
    return render;        
};

const loadPostsIntoDOM = async function() {
    const $root = $('#root');

    let currentUser = await getUser();

    const result = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${currentUser.id}`,
      });

    const users = result.data.following;
    for (let i=0; i<users.length;i++){
        // console.log(users[i].userName)
        $root.append(await renderPost(users[i]));
        registerListeners(users[i]);
    };

};

//Load title
const loadHeaderIntoDom = async function(){
    const $title = $(`#title`);


    let postHeader = `
        <div class = "header">
            <h1 class="hero-head">Anonymous Mailbox</h1>
        </div>`;
    $title.append(postHeader)
};


const handleDetailPost = async function(event){
    event.preventDefault();
    const buttonclass = $(event.target).attr("class").split(" ");
    const buttonid = buttonclass[buttonclass.length -1]
    const postid = buttonid.replace('detail','');
    // console.log(postid)
    loadDetailPopup(postid);
}

const loadDetailPopup = async function(id){

    const box = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${id}`
    });
    const boxUser = box.data.userName;
    // console.log(boxUser);

    const detailPage = `
        <div class = "container" id = "popup">
            <div class = "message" style = "border:2px solid #485550; ">
                <div class = "message-header"><p>${boxUser}'s box</p><i type = "button" id = "exit${id}" class="fas fa-times-circle"></i></div>
                <div style="height:80vh; width:80vw; overflow:auto; padding-top: 0">
                    <div class = "message-body" id = "content${id}"></div>
                </div>
            </div>
        </div>
    `;
    $('#details').append(detailPage)
    loadDetailContent(id);
    $(`#exit${id}`).on('click', handleExitDetailPage);

}

const handleExitDetailPage = function(){
    $(`#popup`).remove();
};

const loadDetailContent = async function (id) {
    const content = $(`#content${id}`);

    const replyButton = `
    <div id = "questionBox" style = "text-align: center;"><button type = "button" class = "button" id = "postQuestion${id}">Post Question Here</button></div>`;
    content.append(replyButton);
    $(`#postQuestion${id}`).on('click', handlePostQuestion);

    const result = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/postTo/${id}`,
        // TODO
        params: {
            sort: {createdAt: 'DESC'}
        }
      });
    const postList = result.data;
    for (let i=0; i<postList.length;i++){
        content.append(await renderComment(postList[i]));
        $(`#deleteComment${postList[i].id}`).on('click', handleDeleteComment)
        if(postList[i].comments.length != 0){
            content.append(`<div class = "commentBox" id = "commentBox${postList[i].id}"></div>`)
            $(`#commentBox${postList[i].id}`).append(`<p>Reply from ${postList[i].comments[0].userName}: </p>`)
            $(`#commentBox${postList[i].id}`).append(renderReply(postList[i].comments[0]))
        }
    };

    if(postList.length == 0){
        let message = `
            <p id = "defaultText" style = "text-align: center;
            font-size: 3vh;
            margin-bottom: 3vh;">There's no question yet!</p>
        `;
        content.append(message);
    }
}

const renderReply = function(reply) {
    let render = `
    <div class = "post card" id = "replyBox${reply.id}">
        <div class = "card-header">
            <h3 class = "author card-header-title">${reply.userName}</h2>
        </div>
        <p class = "body card-content">${reply.body}</p>
        <div class = "bottom card-footer" style = "min-height: 8vh">
            
        </div>
    </div>`;
    
    return render;        
};

const handlePostQuestion = function(event){
    const buttonid = $(event.target).attr("id")
    const postToId = buttonid.replace('postQuestion','');
    let form = `
        <form class = "newPost card post">
            <textarea name = "bodytext" class = "textarea newPostText" placeholder = "Type your question here"></textarea>
            <div class = "card-footer">
                <button type = "button" class = "button" id = "cancelNew${postToId}">Cancel</button>
                <button type = "button" class = "button" id = "submitNew${postToId}">Submit</button>
            </div>
        </form>
    `;
    $(`#content${postToId} #defaultText`).remove();
    $(form).insertAfter(`#postQuestion${postToId}`);
    // $(`#content${postToId}`).prepend(form);

    $(`#cancelNew${postToId}`).on('click', handlenewQuestionCancel);
    $(`#submitNew${postToId}`).on('click', handlenewQuestionSubmit);
    
    $(`#postQuestion${postToId}`).off();
}

const handlenewQuestionSubmit = async function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const postToId = buttonid.replace('submitNew','');
    let text = $(`.newPostText`).serializeArray()[0].value;
    let user = await getUser();
    const userid = user.id;
    const userName = user.userName

    //Third Party API word filter
    const wordFilter = await axios({
        url: "https://api.promptapi.com/bad_words",
        method: "post",
        params: {"censor_character": "*"},
        headers: {"apikey": "aBn2ki5q7DHZ7xo4qRAk3Yj6V9aKmybs"},
        data: text
    });

    text = wordFilter.data.censored_content;

    const result = await axios({
        method: 'post',
        url: 'https://us-central1-comp426-firebase.cloudfunctions.net/posts',
        data:{
        "body": text,
        "uid": userid,
        "userName": userName,
        "anonymous": true,
        "postTo": postToId,
        }
      });
    $(`.newPost`).remove();
    $(`#postQuestion${postToId}`).on('click', handlePostQuestion);

    const post = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${result.data}`
        });

    $(await renderComment(post.data)).insertAfter(`#questionBox`);
    $(`#deleteComment${post.data.id}`).on('click', handleDeleteComment)
    // location.reload(true);
}

const handlenewQuestionCancel = function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const postToId = buttonid.replace('cancelNew','');
    $(`.newPost`).remove();
    $(`#postQuestion${postToId}`).on('click', handlePostQuestion);
}

const renderComment = async function(post){
    let user = await getUser();

    let comment =  `
        <div class = "card comment" id = "comment${post.id}">`
        if (post.anonymous == true){
            comment += `<div class = "card-header"><p class= "card-header-title">Anonymous</p></div>`
        }else{
            comment += `<div class = "card-header"><p class= "card-header-title">${post.userName}</p></div>`
        }

        comment += `<div class = "card-content">${post.body}</div>
            <div class = "card-footer" style = "min-height: 8vh">`
    if(user.id == post.uid){
        comment += `<button type = "button" class = "button" id = "deleteComment${post.id}">Delete</button>
        </div>
    </div>`
    }else{
        comment +=`</div></div>`
    }

    return comment;
}

const handleDeleteComment = async function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const postid = buttonid.replace('deleteComment','');
    const result = await axios({
        method: 'delete',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${postid}`
        });
    $(`#comment${postid}`).remove()
    $(`#commentBox${postid}`).remove()
}

//register listeners
const registerListeners = function(post){

    $(`.detail${post.id}`).on('click', handleDetailPost);

};


