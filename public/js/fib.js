var notifications = 0;
var focused = true;
var socket = io();
function notifUpdate(add) {
  notifications += add;
  if (notifications > 0 && !focused) {
    document.title = "(" + notifications + ") fibbr";
  } else {
    document.title = "fibbr";
  }
}
$(document).ready(function() {
  $("#div_create").hide();
  $("#div_join").hide();
  $("#div_setup").hide();
  $("#btn_create").click(function() {
    $("#div_intro").slideUp();
    $("#div_create").slideDown();
  });
  $("#btn_join").click(function() {
    $("#div_intro").slideUp();
    $("#div_join").slideDown();
  });
  $(window).focus(function(){
    focused = true;
    notifications = 0;
    notifUpdate(0);
  })
  $(window).blur(function() {
    focused = false;
  })
  $('#chatform').submit(function(){
    socket.emit('chat_msg', $('#chatname').val(), $('#chatinput').val());
    $('#chatinput').val('');
    return false;
  });
  socket.on('chat_msg', function(usr, msg){
    notifUpdate(1);
    $('#messages').append($('<p>').html("<strong>" + usr + ":</strong> " + msg));
    $('#messages').animate({
      scrollTop: $('#messages').get(0).scrollHeight}, 2000);
  });
  socket.on('chat_alert', function(icn, msg){
    notifUpdate(1);
    $('#messages').append($('<p>').html("<span class='glyphicon glyphicon-" + icn + "'></span>&nbsp;" + msg));
    $('#messages').animate({
      scrollTop: $('#messages').get(0).scrollHeight}, 2000);
  });
});
