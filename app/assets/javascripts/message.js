$(function(){

  function buildHTML(message){
    var image = (message.image) ? `<img class="lower-message__image" src="${message.image}">` : '';
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__member-name">${message.name}</div>
                    <div class="upper-message__time">${message.time}</div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__chat-text">${message.body}</p>
                    ${image}
                  </div>
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'swing');
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(data){
      alert('error');
    });
  });
});
