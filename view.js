let textData = {
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

let playlistData = {
  playlist: {
    ps: [4, 10, 8, 5],
    dur: [250, 250, 250, 250],
    transition: 0,
    repeat: 10,
    end: 21,
  },
};

let meteoData = {};
let dateHourData = {};
let isPostDatas = true;
let on = true;

$(function () {
  // init datas when dom ready
  console.log("ready!");
  getMeteo();
  postText("WLed");
  setTimeout(function () {
    postText("Bonjour Ricardo");
  }, 100 * 60);

  sendDatasTimer();
  $("#isPostDatas").text(isPostDatas.toString());
  $("#onOff").addClass("btn-success");

  //logic
  $("#postbtn").on("click", () => {
    isPostDatas = !isPostDatas;
    if (isPostDatas) sendDatasTimer();
    $("#isPostDatas").text(isPostDatas.toString());
  });

  $("#sendText").on("click", () => {
    let text = $("#textToSend").val();
    postText(text);
  });

  $("#onOff").on("click", () => {
    on = !on;
    if (on) {
      $("#onOff").addClass("btn-success");
      $("#onOff").removeClass("btn-danger");
    } else {
      $("#onOff").removeClass("btn-success");
      $("#onOff").addClass("btn-danger");
      isPostDatas = false;
    }
    postDataToWledAPI({ on: on });
  });
});

function getMeteo() {
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
        meteoData = textData;
        meteoData.seg[0].n =
          response.forecast.temp2m.toString() +
          "° C " +
          "% pluie " +
          response.forecast.probarain +
          "% " +
          "meteo " +
          response.forecast.weather;
      });
  } catch (error) {
    console.error("Error:", error);
  }
}
function getPostTimeAndDate() {
  try {
    fetch("http://worldtimeapi.org/api/timezone/Europe/Paris", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((promiseResponse) => promiseResponse.json())
      .then((response) => {
        console.log(JSON.stringify(response));
        let date = new Date(response.datetime);
        dateHourData = textData;
        dateHourData.seg[0].n =
          date.getDay() +
          "-" +
          date.getMonth() +
          "-" +
          date.getDay() +
          "  " +
          date.getHours() +
          "H" +
          date.getMinutes() +
          "m";
        postDataToWledAPI(textData);
        console.warn(textData.seg[0].n);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

let index = 0;

function sendDatasTimer() {
  if (isPostDatas) {
    console.log("timer");
    setTimeout(function () {
      if (index === 0) {
        postDataToWledAPI(meteoData);
      }
      if (index === 1) {
        postDataToWledAPI(playlistData);
      }
      if (index === 2) {
        getPostTimeAndDate();
        index = 0;
        sendDatasTimer();
      } else {
        index++;
        sendDatasTimer();
      }
    }, 500 * 60);
  }
}

function postText(text) {
  let randomTextData = textData;
  randomTextData.seg[0].n = text;
  postDataToWledAPI(randomTextData);
  setTimeout(function () {
    console.log("timer");
    index = 0;
    sendDatasTimer();
  }, 100 * 60);
}

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
      .then((response) =>
        console.info("wled is up and answer: " + JSON.stringify(response))
      );
  } catch (error) {
    console.error("Error:", error);
  }
}
