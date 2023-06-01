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

let meteoData = {};

$(function () {
  console.log("ready!");
  getMeteoData();
});

function getMeteoData() {
  try {
    fetch(
      "http://api.meteo-concept.com/api/forecast/daily/3/period/2?token=" +
        config.token_meteo +
        "&insee=51230",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((promiseResponse) => promiseResponse.json())
      .then((response) => {
        meteoData = response;
        data.seg[0].n =
          meteoData.forecast.temp2m.toString() +
          "° C " +
          "% pluie " +
          meteoData.forecast.probarain +
          "% " +
          "meteo " +
          meteoData.forecast.weather;
        postDataToWledAPI(data);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

function getTimeAndData() {
  try {
    fetch(
      "http://worldtimeapi.org/api/timezone/Europe/Paris",

      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((promiseResponse) => promiseResponse.json())
      .then((response) => {
        console.log(JSON.stringify(response));
        let date = new Date(response.datetime);
        data.seg[0].n =
          date.getDay +
          "/" +
          date.getMonth +
          "/" +
          date.getDay +
          "/" +
          date.getHours() +
          ":" +
          date.getMinutes();
        postDataToWledAPI(data);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

//timers
var meteoTimer = setInterval(function () {
  getMeteoData();
}, 60 * 60 * 1000); //1 heure

var timerID = setInterval(function () {
  getTimeAndData();
}, 60 * 1000); //1 minute

/*$(() => {
  let count = 0;
  $("#click-counter").text(count.toString());
  $("#countbtn").on("click", () => {
    count++;
    $("#click-counter").text(count);
    clearInterval(timerID);
  });
});*/

$(() => {
  let count = 0;
  $("#click-counter").text(count.toString());
  $("#countbtn").on("click", () => {
    count++;
    $("#click-counter").text(count);
    clearInterval(timerID);
  });
});

async function postDataToWledAPI(data = {}) {
  try {
    fetch("http://192.168.1.42/json/state", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
  } catch (error) {
    console.error("Error:", error);
  }
}
