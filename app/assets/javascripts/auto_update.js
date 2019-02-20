$(function(){

  function buildMessageHTML(message) {
    var image = (message.image) ? `<img class="lower-message__image" src="${message.image}">` : '';
    var text = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__member-name">${message.name}</div>
                    <div class="upper-message__time">${message.time}</div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__chat-text">${message.body}</p>
                    ${image}
                  </div>
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
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'swing')
      });
    });
  }
});




