import {getUser} from './getUser.js'

$(function() {
    loadHeaderIntoDom();
    loadPostsIntoDOM();
});

const renderPost = function(post) {
    let render = `
    <div class = "post card" id = "question${post.id}">
        <div class = "card-header">
    `;

    if(post.anonymous == true){
        render += `<h3 class = "author card-header-title">Anonymous</h2>
        </div>
        <p class = "body card-content">${post.body}</p>`
    }else{
        render += `<h3 class = "author card-header-title">${post.userName}</h2>
        </div>
        <p class = "body card-content">${post.body}</p>`
    }

    let bottom  = ``;
    if(post.comments.length == 0){
        bottom += `        
        <div class = "bottom card-footer">
            <button type = "button" class = "button" id = "reply${post.id}">Reply</button>`;
    }else{
        bottom += `        
        <div class = "bottom card-footer" style = "min-height: 8vh">`;
    }

    bottom += `</div>`
    render += bottom;
    render += `</div>`;
    
    return render;        
};

const renderReply = function(reply) {
    let render = `
    <div class = "post card" id = "replyContainer${reply.id}">
        <div class = "card-header">
            <h3 class = "author card-header-title">${reply.userName}</h2>
        </div>
        <p class = "body card-content">${reply.body}</p>
        <div class = "bottom card-footer">
            <button type = "button" class = "button" id = "editReply${reply.id}">Edit</button>
            <button type = "button" class = "button" id = "deleteReply${reply.id}">Delete</button>
        </div>
    </div>`;
    
    return render;        
};

const loadPostsIntoDOM = async function() {
    const $root = $('#root');

    let user = await getUser();
    const userid = user.id
    const result = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/postTo/${userid}`,
      });

    const QuestionList = result.data;
    for (let i=0; i<QuestionList.length;i++){
        $root.append(renderPost(QuestionList[i]));
        if(QuestionList[i].comments.length != 0){
            $root.append(`<div class = "commentBox" id = "commentBox${QuestionList[i].id}"></div>`)
            $(`#commentBox${QuestionList[i].id}`).append(`<p>Your Response: </p>`)
            $(`#commentBox${QuestionList[i].id}`).append(renderReply(QuestionList[i].comments[0]))
        }
        registerListeners(QuestionList[i]);

        $(`#deleteReply${QuestionList[i].id}`).on('click', handleDeleteReply)
        $(`#editReply${QuestionList[i].id}`).on('click', handleEditReply)
        
    };

    if(QuestionList.length == 0){
        $root.append(`<p style = "text-align: center; font-size: 1.5em">You don't have any question inbox yet.</p>`)
    }

};

//Load title
const loadHeaderIntoDom = async function(){
    const $title = $(`#title`);

    let postHeader = `
        <div class = "header">
            <h1 class="hero-head">My Question Inbox</h1>
        </div>`;
    $title.append(postHeader)
};

const handleQuestionReply = function (event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const questionid = buttonid.replace('reply', '');
    $(`#question${questionid}`).after(renderReplyForm(questionid))
    $(`#cancelReply${questionid}`).on('click', handleCancelReply);
    $(`#submitReply${questionid}`).on('click', handleSubmitReply);
    $(`#reply${questionid}`).off('click', handleQuestionReply);
}

const renderReplyForm = function(id){
    let form = `
    <form class = "newReply card post replybox${id}">
    <textarea name = "bodytext" class = "textarea newPostText" placeholder = "Type your response here"></textarea>
    <div class = "card-footer">
        <button type = "button" class = "button" id = "cancelReply${id}">Cancel</button>
        <button type = "button" class = "button" id = "submitReply${id}">Submit</button>
    </div>
    </form>`;
    return form;
};

const renderReplyEditForm = function(id, body){
    let form = `
    <form class = "newReply card post replybox${id}">
    <textarea name = "bodytext" class = "textarea newPostText">${body}</textarea>
    <div class = "card-footer">
        <button type = "button" class = "button" id = "cancelReply${id}">Cancel</button>
        <button type = "button" class = "button" id = "submitReply${id}">Submit</button>
    </div>
    </form>`;
    return form;
};

const handleCancelReply = function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const id = buttonid.replace('cancelReply', '');
    $(`.replybox${id}`).remove();
    $(`#reply${id}`).on('click', handleQuestionReply);
};

const handleSubmitReply = async function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const questionid = buttonid.replace('submitReply', '');

    let user = await getUser();

    const question = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${questionid}`
    });
    const questionbody = question.data.body;
    const uid = question.data.uid
    const username = question.data.userName;
    const postTo = question.data.postTo;
    const comments = [];
    let text = $(`.replybox${questionid}`).serializeArray()[0].value;

        //Third Party API word filter
        const wordFilter = await axios({
            url: "https://api.promptapi.com/bad_words",
            method: "post",
            params: {"censor_character": "*"},
            headers: {"apikey": "aBn2ki5q7DHZ7xo4qRAk3Yj6V9aKmybs"},
            data: text
        });
    
        text = wordFilter.data.censored_content
        
    const comment = {"id":questionid,
                    "userName": user.userName,
                    "body":text
                    }
    comments.push(comment)

    const result = await axios({
        method: 'put',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${questionid}`,
        data:{
        "body": questionbody,
        "uid": uid,
        "userName": username,
        "anonymous": true,
        "comments": comments,
        "likes": [],
        "postTo": postTo,
        }
    });
    location.reload(true);
    // $(`#question${questionid}`).after(`<div class = "commentBox" id = "commentBox${questionid}"></div>`)
    // $(`#commentBox${questionid}`).append(`<p>Your Response: </p>`)
    // $(`#commentBox${questionid}`).append(renderReply(comment))

    // $(`#deleteReply${questionid}`).on('click', handleDeleteReply)
    // $(`#editReply${questionid}`).on('click', handleEditReply)
    // $(`.replybox${questionid}`).remove();
};

//delete reply
const handleDeleteReply = async function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const questionid = buttonid.replace('deleteReply', '');

    const question = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${questionid}`
    });
    const questionbody = question.data.body;
    const uid = question.data.uid
    const username = question.data.userName;
    const postTo = question.data.postTo;
    const comments = [];
    const result = await axios({
        method: 'put',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${questionid}`,
        data:{
        "body": questionbody,
        "uid": uid,
        "userName": username,
        "anonymous": true,
        "comments": comments,
        "likes": [],
        "postTo": postTo,
        }
    });

    // $(`#commentBox${questionid}`).remove()
    location.reload(true)
}

//edit reply
const handleEditReply = function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const questionid = buttonid.replace('editReply', '');
    const text = $(`#replyContainer${questionid} p`).html();

    //TODO
    let previousReply = $(`#commentBox${questionid}`);
    $(`#commentBox${questionid}`).remove()
    $(`#question${questionid}`).after(renderReplyEditForm(questionid, text))
    $(`#cancelReply${questionid}`).on('click', function(){
        $(`#question${questionid}`).after(previousReply);
        $(`#deleteReply${questionid}`).on('click', handleDeleteReply)
        $(`#editReply${questionid}`).on('click', handleEditReply)
        $(`.replybox${questionid}`).remove();
    });
    $(`#submitReply${questionid}`).on('click', handleSubmitReply);

}

//register listeners
const registerListeners = function(post){

    $(`#reply${post.id}`).on('click', handleQuestionReply);

};


