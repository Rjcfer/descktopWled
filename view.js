$(function () {
  alert("jquery is loaded");
});

$(document).ready(function () {
  $("#countbtn").click(function () {
    $.ajax({
      url: "http://api.meteo-concept.com/api/location/city?token=ad6fae89aeb81a84549f56a17667035c2060e05b9684ca5d3562cd4b8c259639&insee=51230",
      type: "get",
      success: function (data) {
        console.log(data);
        $("#click-counter").html(data.clicks);
      },
    });
  });
});

$(() => {
  let count = 0;
  $("#click-counter").text(count.toString());
  $("#countbtn").on("click", () => {
    count++;
    $("#click-counter").text(count);
  });
});
