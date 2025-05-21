const chatBox = document.getElementsByClassName('chat-box')[0]

function createChatElement(text) {
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-box-item';
    chatItem.textContent = text;
    chatItem.onclick = function (e) {
        e.preventDefault()
        console.log(chatItem.innerText)
    }
    chatBox.appendChild(chatItem)
}

document.addEventListener('paste', async (event) => {
    try {
        const text = await navigator.clipboard.readText();
        createChatElement(text)
    } catch (err) {
        console.error('Failed to read clipboard: ', err);
    }
});