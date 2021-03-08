
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
console.log(myParam);
let url = "https://www.metaweather.com/api/location/" + myParam;

function getDayName(dateStr) {
  var date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { weekday: 'long' });
}

function addValueToDiv(value, div) {
  let pNode = document.createElement("p");
  let textNode = document.createTextNode(value);
  pNode.appendChild(textNode);
  div.appendChild(pNode);
}

function getWeatherComponentDiv(day, image, description, minTemp, maxTemp) {
  let weatherComponentDiv = document.createElement("div");
  weatherComponentDiv.classList.add("weatherComponent");
  weatherComponentDiv.classList.add("col-md-4");
  weatherComponentDiv.classList.add("col-sm-6");

  addValueToDiv("Day: " + day, weatherComponentDiv);

  let img = document.createElement("img");
  img.setAttribute("src", image);
  weatherComponentDiv.appendChild(img);

  addValueToDiv(description, weatherComponentDiv);
  addValueToDiv("Min temperature " + minTemp + '°C', weatherComponentDiv);
  addValueToDiv("Max temperature " + maxTemp + '°C', weatherComponentDiv);

  return weatherComponentDiv;
}

fetch(url)
  .then(function (response) {
    if (response.status == 200) {
      response.json().then(function (data) {
        console.log(data);
        let x = data.consolidated_weather;
        for (let i = 0; i < x.length; i++) {
          let dataList = x[i];
          let day = getDayName(dataList.applicable_date);
          let minTemp = Math.round(dataList.min_temp);
          let maxTemp = Math.round(dataList.max_temp);
          let image = "https://www.metaweather.com/static/img/weather/" + dataList.weather_state_abbr + ".svg";
          let element = document.getElementById("weather");

          let weatherComponentDiv = getWeatherComponentDiv(day, image, dataList.weather_state_name, minTemp, maxTemp);
          element.appendChild(weatherComponentDiv);
        }
      });
    }
  })
  .catch(function (err) {
    console.log(err);
  });

