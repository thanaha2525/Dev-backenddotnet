const socket = io();
const chatform = document.getElementById('chat-form');

chatform.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    if (msg) {
        socket.emit('sendMessage', msg);
    }
    e.target.elements.msg.value = "";
});

socket.on('retriveMessage', (msg) => {
    showMessage(msg);
})

function showMessage(message) {
    const div = document.createElement('div');
    const showMsg = document.getElementById('show-msg');

    div.classList.add('message');
    div.innerHTML =
        `<p class="">Brad <span>9:30</span></p>
    <p class="text">${message}</p>`;
    showMsg.appendChild(div);
}