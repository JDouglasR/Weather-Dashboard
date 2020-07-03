

const displayCityWeather = () => {
    
    var cityDate = moment().format('MMMM Do YYYY');
    
    var cityName = $("#citySearch").val()
    var queryWeather = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=561936218884bf45974f29319f32b882";

    $.ajax({
        url: queryWeather,
        method: "GET"
      }).then(function(responseWeather) {
          console.log(responseWeather);
          $("#cityName").text(` ${responseWeather.name}`);
          $("#tempResult").text( ` ${(((responseWeather.main.temp - 273.15) * 1.80 + 32).toFixed(2))} °F`);
          $("#humResult").text(` ${responseWeather.main.humidity}%`);
          $("#windResult").text(` ${responseWeather.wind.speed}mph`);
          var lat = responseWeather.coord.lat;
          var lon = responseWeather.coord.lon;
          var queryUV = "http://api.openweathermap.org/data/2.5/uvi?appid=561936218884bf45974f29319f32b882&lat="+lat+"&lon="+lon+"";
          $.ajax({
              url: queryUV,
              method: "GET"
          }).then(function(responseUV)  {
              console.log(responseUV);
              $("#uvResult").text(` ${responseUV.value}`)
          });

      });
}

$("#searchBtn").on("click",function(event){
    event.preventDefault();
    displayCityWeather();
})


