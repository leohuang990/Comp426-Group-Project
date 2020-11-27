var hideAll = setTimeout(function() {}, 0);

$(document).ready(function() {
  $("#password").on("input", function() {
    var offset = $("#password").val().length - $("#hidden").val().length;
    if (offset > 0) $("#hidden").val($("#hidden").val() + $("#password").val().substring($("#hidden").val().length, $("#hidden").val().length + offset));
    else if (offset < 0) $("#hidden").val($("#hidden").val().substring(0, $("#hidden").val().length + offset));

    // Change the visible string
    if ($(this).val().length > 1) $(this).val($(this).val().substring(0, $(this).val().length - 1).replace(/./g, "•") + $(this).val().substring($(this).val().length - 1, $(this).val().length));

    // Set the timer
    clearTimeout(hideAll);
    hideAll = setTimeout(function() {
      $("#password").val($("#password").val().replace(/./g, "•"));
    }, 100);
  });
});