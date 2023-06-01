$(function () {
  alert("jquery is loaded");
});

/*$(document).ready(function () {
  $("#countbtn").click(function () {
    $.ajax({
      url: "http://localhost:3000/clicks",
      type: "Post",
      success: function (data) {
        $("#click-counter").html(data.clicks);
      },
    });
  });
});*/

$(() => {
  let count = 0;
  $("#click-counter").text(count.toString());
  $("#countbtn").on("click", () => {
    count++;
    $("#click-counter").text(count);
  });
});
