// Function for sending a user's chat message to the server and appends the server's reply to the chat log and prints it in the chat-window.
function submitChat() {
    let input = $('#chat-input').val();
    $('#chat-input').val('');

    $('#chatlogs').append('<div class="user-message">' + input + '</div>');

    $.ajax({
        url: 'http://localhost:5000/reply',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $('#chatlogs').append('<div class="bot-message">' + 'ARNE: ' + data + '</div>');
            $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
        },
        data: JSON.stringify({ text: input })
    });
}

// Function for the chat-bubble which appears when you enter the page and stays for 10 seconds. 
window.onload = function() {
    setTimeout(function() {
        document.getElementById('bubble').style.display = 'none';
    }, 10000);
};