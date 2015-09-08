$(document).ready(function() {
  $("#okay").click(function() {
    var name = $("#namebox").val();
    var colors = ["#debf56", "#de7d7d", "#7bce95", "#e8994f", "#dc61bf", "#f8e374", "#f6546a", "#1b97ad", "#31abab", "#474545", "#f23d74", "#f4f1a2", "#8deedd", "#dfa6ff", "#b40088"];
    var i;
    var total = 0;
    for (i = 0; i < name.length; i++) {
      total = total + name.charCodeAt();
    }
    total = (total / i) % (colors.length - 1) ;
    $("body").css("background-color", colors[total]);
  });
});
