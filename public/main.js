(function () {
    var socket = io();
    var inputArea = document.getElementById('input-area');
    var messagesView = document.getElementById('messages');
    var messageInput = document.getElementById('message-input');
    
    inputArea.addEventListener('submit', function (e) {
        e.preventDefault();
        socket.emit('chat message', messageInput.value);
        messageInput.value = '';
        return false; 
    });
    socket.addEventListener('chat message', function (data) {
        var newMsg = document.createElement('li');
        newMsg.innerHTML = data;
        messagesView.appendChild(newMsg);
    });
})();