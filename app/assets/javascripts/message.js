$(function(){

  function buildHTML(message){
    var body  = (message.body) ? message.body : '';
    if (message.image) {
      if (body) {
        var html = `<div class="message">
                      <p class="member-name">${message.name}</p>
                      <p class="message-time">${message.time}</p>
                      <p class="chat-text">${body}</p>
                      <p class="chat-text"><img class="image" src="${message.image}"></p>
                    </div>`
      } else {
        var html = `<div class="message">
                      <p class="member-name">${message.name}</p>
                      <p class="message-time">${message.time}</p>
                      <p class="chat-text"><img class="image" src="${message.image}"></p>
                    </div>`
      }
    } else {
        var html = `<div class="message">
                      <p class="member-name">${message.name}</p>
                      <p class="message-time">${message.time}</p>
                      <p class="chat-text">${body}</p>
                    </div>`
    }
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.pathname;
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.upload-icon').val('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(data){
      alert('error');
    });
  });
});
