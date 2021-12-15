$(document).ready(function() {
  
  $("#tweet-text").on("input", function () {

    let charsRemaining = 140 - $(this).val().length;

    $(".counter").text(charsRemaining);

    if (charsRemaining < 0) {
      $(".counter").addClass("counter-overlimit");
    } else {
      $(".counter").removeClass("counter-overlimit");
    }

  });
});
