/* CLIENT-SIDE CODE */

var notifications = 0;
var focused = true;
var socket = io();
var uname = "user";
var colors = ["#b9e2f0", "#e2b9f0", "#f0c7b9", "#c7f0b9", "#b9c1f0", "#f0b9dc", "#f0e8b9", "#b9f0cc", "#b9eda6", "#eddaa6"];
function notifUpdate(add) {
  notifications += add;
  if (notifications > 0 && !focused) {
    document.title = "(" + notifications + ") fibbr";
  } else {
    document.title = "fibbr";
  }
}
function randomUname() {
  uname = "user" + Math.floor(Math.random() * 1000);
}
function nameColour(u) {
  var i;
  var total = 0;
  for (i = 0; i < u.length; i++) {
    total = total + u.charCodeAt(i);
  }
  console.log(u);
  total = total % (colors.length - 1);
  console.log(total);
  return colors[total];
}
$(document).ready(function() {
  randomUname();
  $("#chatname").text(uname);
  $("#newname").val(uname);
  socket.emit('user_enter', uname);
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
  /* CHAT */
  $('#chatform').submit(function(){
    socket.emit('chat_msg', uname, $('#chatinput').val());
    $('#chatinput').val('');
    return false;
  });
  socket.on('chat_msg', function(usr, msg){
    notifUpdate(1);
    $('#messages').append($('<p>').html("<span class='usertag' style='background-color:" + nameColour(usr) + "'>" + usr + ":</span> " + msg));
    $('#messages').animate({
      scrollTop: $('#messages').get(0).scrollHeight}, 2000);
  });
  socket.on('chat_alert', function(icn, msg){
    notifUpdate(1);
    $('#messages').append($('<p>').html("<span class='glyphicon glyphicon-" + icn + "'></span>&nbsp;" + msg));
    $('#messages').animate({
      scrollTop: $('#messages').get(0).scrollHeight}, 2000);
  });
  $('#unameform').submit(function(){
    socket.emit('user_change', uname, $('#newname').val());
    uname = $('#newname').val();
    $("#chatname").text(uname);
    $('#unameChangeModal').modal('hide');
    return false;
  });
  socket.on('userlist', function(list){
    var towrite = "";
    for (var i = 0; i < list.length; i++) {
      towrite = towrite + "<li class='list-group-item'><span class='glyphicon glyphicon-user' style='padding: 2px; border-radius: 2px; background-color: #FF0000;' aria-hidden='true'></span>&nbsp;&nbsp;<strong>" + list[i].name + "</strong> " + list[i].score + " points</li>";
    }
    $("#userlist").html(towrite);
  });
});
