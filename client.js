const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendMessage('You joined to the chat!');
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
    appendMessage(`User ${name} was connected to the chat`);
});

socket.on('user-disconnected', name => {
    appendMessage(`User ${name} was disconnected from the chat`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(text) {
    const message = document.createElement('div');

    message.classList.add('alert', 'alert-primary');
    message.setAttribute('role', 'alert');
    message.innerText = text;

    messageContainer.append(message);
}
