$(function() {

  var search_list = $('#user-search-result');

  function appendUser(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    search_list.append(html)
  }

  function buildHTML(user){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id=${user.id}>削除</a>
              </div>`

    return html
  }

  $('.chat-group-form__input').on("keyup", function() {
    var input = $(this).val();
    $.ajax({
      type:     'GET',
      url:      "/users",
      data:     { keyword: input },
      dataType: 'json',
    })
    .done(function(users){
      $('#user-search-result').empty();
      if(users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      $('.chat-group-form__field').ready(function(){
        $('.chat-group-user__btn--add').on('click', function(){
          console.log(this);
          var id = $(this).attr('data-user-id');
          users.forEach(function(user){
            if (user.id == id){
              var html = buildHTML(user);
              $('#chat-group-users').append(html);
              $('#user-search-result').empty();
            }
          });
        });
      });
      $(document).on("click", ".user-search-remove", function() {
          var user_id = $(this).data('user-id')
          console.log(this)
          $(`#chat-group-user-${user_id}`).remove();
      });
    })
    .fail(function(users){
      $('#user-search-result').empty();
      if(users.length === 0) {
        alert('ユーザー検索に失敗しました');
      }
    });
  });
});
