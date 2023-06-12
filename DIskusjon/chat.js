// Retrieves HTML-elements 
var messageInput = document.getElementById("messageInput");
var sendButton = document.getElementById("sendButton");
var messagesList = document.getElementById("messages");

// Gives user the name "Bruker 1"
var name = "Bruker 1"

// Listens for the button to be pressed and then sends the message
sendButton.addEventListener("click", sendMessage);

// Listens for "Enter" keystroke in the message field and then sends the message
messageInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});

// Sendes message and shows it in the chat-window
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
  
// Scrolls down in the chat-window
function scrollToBottom() {
    messagesList.scrollTop = messagesList.scrollHeight;
}

