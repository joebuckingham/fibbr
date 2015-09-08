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
});
