let Config = {
    // serviceBasicUrl: 'https://n5mg79xrk3.execute-api.ap-northeast-1.amazonaws.com/prod/api/'
    serviceBasicUrl: 'http://localhost:3000/api/'
}

document.querySelector('#menu-bar ul>li').addEventListener('click', function(){
    document.querySelector('#menu-bar ul>li').classList.remove('active');
    this.classList.add('active');

    let command = this.children[0].dataset && this.children[0].dataset.command;
    loadPage(command.toLowerCase());
});

loadPage('room');

function loadPage(pageName) {
    let mainEle = document.getElementById("content");
    mainEle.innerHTML = '';
    let getContent = (url)=>fetch(url).then(res=>res.text()).then(res=>{
        mainEle.innerHTML = res;
    });
    switch (pageName) {
        case "room":
            $("#content").load('components/room.html');
            break;
    }
}