var res;
var res_start;

$(document).ready(function() {
    console.log('pagina carregada!!|');
    renderStartChatbot();
});

$('#txtArea').keypress(function(e) {
    if (e.keyCode == 13) {
        let msg = document.getElementById("txtArea").value;
        renderMsgFromUser(msg);
        renderMsgFromChatbot(msg);
        document.getElementById("txtArea").value = "";
    }
});

async function renderStartChatbot() {
     await postStartChat();
     let html = `   <div class="d-flex flex-row p-3">
                        <div class="bg-white mr-2 p-3"><span class="text-muted">${res_start.msg_from_chatbot}</span></div>
                         <img src="/imagens/bot.png" width="30" height="30">
                    </div>`
     let container = document.querySelector('.container_msg');
     container.innerHTML += html;
}

async function renderMsgFromUser(msg) {
     let html = `   <div class="d-flex flex-row p-3">
                        <img src="/imagens/user.png" width="30" height="30">
                        <div class="chat ml-2 p-3">${msg}</div>
                    </div>`
     let container = document.querySelector('.container_msg');
     container.innerHTML += html;
}

async function renderMsgFromChatbot(msg) {
    await postMsg(msg);
    let html = `   <div class="d-flex flex-row p-3">
                        <div class="bg-white mr-2 p-3"><span class="text-muted">${res.msg_from_chatbot}</span></div>
                         <img src="/imagens/bot.png" width="30" height="30">
                    </div>`
    let container = document.querySelector('.container_msg');
    container.innerHTML += html;
    setScrollOnTheEnd();
}

function setScrollOnTheEnd() {
    let container = document.querySelector('.container_msg');
    $('.container_msg').scrollTop(container.scrollHeight);
}

async function postStartChat(msg) {
     const response =  await fetch('http://127.0.0.1:5000/chatbot/start', {
     method: "POST",
     mode: "cors"
     });
     res_start = await response.json();
}

async function postMsg(msg) {
    const formData = new FormData();
    formData.append('msg', msg);
    const response =  await fetch('http://127.0.0.1:5000/chatbot/send_msg', {
        method: "POST",
        mode: "cors",
        body: formData,
        })
    res = await response.json();
}
















