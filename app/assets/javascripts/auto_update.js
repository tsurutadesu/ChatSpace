$(function(){

  function buildMessageHTML(message) {
    var image = (message.image) ? `<p class="chat-text"><img class="image" src="${message.image}"></p>` : '';
    var text = `<div class="message" data-id="${message.id}">
                  <p class="member-name">${message.name}</p>
                  <p class="message-time">${message.time}</p>
                  <p class="chat-text">${message.body}</p>
                  ${image}
                </div>`
    html = $('.messages').append(text);

    return html
  }

  $(function(){
    setInterval(updateMessage, 5000);
  });

  function updateMessage(){
    if($('.message')[0]){
      var message_id = $('.message:last').data('id');
    } else {
      var message_id = 0
    }
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        message: { id: message_id }
      },
      dataType: 'json',
    })
    .always(function(data){
      $.each(data,function(i, data){
        buildMessageHTML(data);
      });
    });
  }
});




