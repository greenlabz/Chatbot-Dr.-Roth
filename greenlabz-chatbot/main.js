const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

chatToggle.addEventListener('click', () => {
    chatContainer.classList.toggle('open');
});

closeChat.addEventListener('click', () => {
    chatContainer.classList.remove('open');
});

sendBtn.addEventListener('click', sendMessage);

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    userInput.value = '';

    // Backend-Anbindung
    fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.reply, 'bot');
    })
    .catch(error => {
        console.error('Fehler:', error);
        addMessage("Entschuldige, der Server ist gerade nicht erreichbar.", 'bot');
    });
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = text;
    msgDiv.className = sender === 'user' ? 'msg-user' : 'msg-bot';
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
