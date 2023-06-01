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
    postData(data);
  });
});

async function postData(data = {}) {
  $.ajax({
    type: "POST",
    url: "192.168.1.42/json/state",
    data: JSON.stringify({ Markers: markers }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      alert(data);
    },
    error: function (errMsg) {
      alert(errMsg);
    },
  });
}

let data = {
  on: true,
  bri: 128,
  transition: 7,
  mainseg: 0,
  seg: [
    {
      id: 0,
      start: 0,
      stop: 32,
      startY: 0,
      stopY: 8,
      grp: 1,
      spc: 0,
      of: 0,
      on: true,
      frz: false,
      bri: 23,
      cct: 127,
      n: "TOTO",
      col: [
        [0, 0, 255],
        [0, 0, 0],
        [0, 0, 0],
      ],
      fx: 122,
      sx: 128,
      ix: 128,
      pal: 43,
      c1: 0,
      c2: 128,
      c3: 16,
      sel: true,
      rev: false,
      mi: false,
      rY: false,
      mY: false,
      tp: false,
      o1: false,
      o2: false,
      o3: false,
      si: 0,
      m12: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
    {
      stop: 0,
    },
  ],
};
