$(function(){

  function buildHTML(message){
    var image = (message.image) ? `<p class="chat-text"><img class="image" src="${message.image}"></p>` : '';
    var html = `<div class="message" data-id="${message.id}">
                  <p class="member-name">${message.name}</p>
                  <p class="message-time">${message.time}</p>
                  <p class="chat-text">${message.body}</p>
                  ${image}
                </div>`

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.pathname;
    $.ajax({
      url:           url,
      type:       'POST',
      data:     formData,
      dataType:   'json',
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
