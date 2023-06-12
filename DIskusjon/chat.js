// Henter DOM-elementer
var messageInput = document.getElementById("messageInput");
var sendButton = document.getElementById("sendButton");
var messagesList = document.getElementById("messages");

// Spør brukeren om navnet
var name = "Bruker 1"

// Venter på klikk på send-knappen
sendButton.addEventListener("click", sendMessage);

// Venter på Enter-tastetrykk i meldingsfeltet
messageInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});

// Sender melding og viser den i chat-vinduet
function sendMessage() {
    var message = messageInput.value;
    if (message.trim() !== "") {
      var messageContainer = document.createElement("div");
      var nameElement = document.createElement("span");
      var messageText = document.createElement("span");
      nameElement.textContent = name + ": ";
      messageText.textContent = message;
  
      messageContainer.classList.add("message", "user-message");
      nameElement.classList.add("message-name");
      messageText.classList.add("message-text");
  
      messageContainer.appendChild(nameElement);
      messageContainer.appendChild(messageText);
      messagesList.appendChild(messageContainer);
  
      messageInput.value = "";
      scrollToBottom();
    }
  }
  
// Ruler ned til bunnen av chat-vinduet
function scrollToBottom() {
    messagesList.scrollTop = messagesList.scrollHeight;
}

