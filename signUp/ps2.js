var hideAll = setTimeout(function() {}, 0);

$(document).ready(function() {
  $("#password2").on("input", function() {
    var offset = $("#password2").val().length - $("#hidden2").val().length;
    if (offset > 0) $("#hidden2").val($("#hidden2").val() + $("#password2").val().substring($("#hidden2").val().length, $("#hidden2").val().length + offset));
    else if (offset < 0) $("#hidden2").val($("#hidden2").val().substring(0, $("#hidden2").val().length + offset));

    // Change the visible string
    if ($(this).val().length > 1) $(this).val($(this).val().substring(0, $(this).val().length - 1).replace(/./g, "•") + $(this).val().substring($(this).val().length - 1, $(this).val().length));

    // Set the timer
    clearTimeout(hideAll);
    hideAll = setTimeout(function() {
      $("#password2").val($("#password2").val().replace(/./g, "•"));
    }, 100);
  });
});