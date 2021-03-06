function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function addCity(location) {
  let node = document.createElement("li");
  let a = document.createElement("a");
  a.href = "forecast.html?id=" + location.woeid;
  let textnode = document.createTextNode(location.title);
  a.appendChild(textnode);
  node.appendChild(a);
  document.getElementById("locations").appendChild(node);

}

function showPosition(position) {
  let url = "https://www.metaweather.com/api/location/search/";
  url = url + "?lattlong=" + position.coords.latitude;
  url += "," + position.coords.longitude;

  fetch(url)
    .then(function (response) {
      if (response.status == 200) {
        response.json().then(function (data) {
          for (let i = 0; i < data.length; i++) {
            let location = data[i];
            addCity(location);
          }
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

