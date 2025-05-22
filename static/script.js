const ws = new WebSocket(`ws://${location.host}/ws`);
const chatBox = document.getElementsByClassName('chat-box')[0]
const flashMessage = document.getElementById('flash-message')

function flashMessageCall() {
    flashMessage.style.display = 'block'
     setTimeout(() => {
      flashMessage.style.display = 'none'
    }, 3000);
}

function createChatElement(text) {
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-box-item';
    chatItem.textContent = text;
    chatItem.onclick = function (e) {
        e.preventDefault()
        fallbackCopy(chatItem.innerText)
    }
    chatBox.appendChild(chatItem)
}

ws.onmessage = (event) => {
    createChatElement(event.data)
};

document.addEventListener('paste', async (event) => {
    const text = event.clipboardData.getData('text');
    if (text) {
        ws.send(text);
    }
});

function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";  // Avoid scrolling to bottom
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        const successful = document.execCommand("copy");
        if (successful) {
            flashMessageCall("Copied to clipboard!");
        } else {
            console.error("Fallback copy failed.");
        }
    } catch (err) {
        console.error("Fallback copy threw an error:", err);
    }

    document.body.removeChild(textarea);
}