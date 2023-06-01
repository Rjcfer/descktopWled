$(function () {
  console.log("jquery is loaded");
});

/*$(document).ready(function () {
  $("#countbtn").click(function () {
    $.ajax({
      url:
        "http://api.meteo-concept.com/api/location/city?token=" +
        config.token_meteo +
        "&insee=51230",
      type: "get",
      success: function (data) {
        console.log(data);
        $("#click-counter").html(data.clicks);
      },
    });
  });
});
*/

$(() => {
  let count = 0;
  $("#click-counter").text(count.toString());
  $("#countbtn").on("click", () => {
    count++;
    $("#click-counter").text(count);
    console.log(config.token_meteo);
  });
});
