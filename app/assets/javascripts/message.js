$(function(){

  function buildHTML(message){
    var text = `<p class="member-name">${message.name}</p>
                <p class="message-time">${message.time}</p>
                <p class="chat-text">${message.body}</p>`
    if (message.image) {
        var html = `<div class="message">
                      ${text}
                      <p class="chat-text"><img class="image" src="${message.image}"></p>
                    </div>`
    } else {
        var html = `<div class="message">
                      ${text}
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
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(data){
      alert('error');
    });
  });
});
