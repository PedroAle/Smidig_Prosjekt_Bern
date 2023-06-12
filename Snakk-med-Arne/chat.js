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

function scrollChatToBottom() {
    var chatlogs = document.getElementById('chatlogs');
    chatlogs.scrollTop = chatlogs.scrollHeight;
}


window.onload = function() {
    setTimeout(function() {
        document.getElementById('bubble').style.display = 'none';
    }, 10000);
};

/* <img src="/dashbord/images/ArneNæss_avatar.png" style="width: 50px; height: 50px;' */