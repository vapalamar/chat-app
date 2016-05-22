(function () {
    var socket = io();
    var inputArea = document.getElementById('input-area');
    var messagesView = document.getElementById('messages');
    var messageInput = document.getElementById('message-input');
    var loginForm = document.getElementById('login-form');
    var loginInput = document.getElementById('login-input');
    
    var socketEmit = function (formEvent, eventName, input) {
        formEvent.preventDefault();
        socket.emit(eventName, input.value);
        input.value = '';
        
        return false;
    }
    
    inputArea.addEventListener('submit', function (e) {
        socketEmit(e, 'chat message', messageInput)
    });
    
    loginForm.addEventListener('submit', function (e) {
        socketEmit(e, 'new user', loginInput)
    });
    
    socket.addEventListener('chat message', function (data) {
        var newMsg = document.createElement('li');
        var nickName = document.createElement('span');
        var msg = document.createElement('p');
        
        nickName.innerHTML = data.nickName;
        msg.innerHTML = data.msg;
        newMsg.appendChild(nickName);
        newMsg.appendChild(msg);
        messagesView.appendChild(newMsg);
    });
    
    socket.addEventListener('new user', function () {
        var loginArea = document.getElementById('login-area');
        var chat = document.getElementById('chat');
        chat.classList.remove('hidden');
        loginArea.classList.add('hidden');
    })
})();