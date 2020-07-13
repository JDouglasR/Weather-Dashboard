$(document).ready(function() {

	var todaysDate = moment().format('MMMM Do YYYY');
	var cityList = $(".list-group");
	var cityButtons = [];

    // This function displays the weather to the page.
    var displayCityWeather = (cityName) => {
		
		// Global Variables.
		//cityName = $("#citySearch").val();
        
        var apiKey = "561936218884bf45974f29319f32b882";
        var queryWeather = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey;
		var queryForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey;
		

        // This ajax call is used to gather weather data from an API and display it to the page.
        $.ajax({
            url: queryWeather,
            method: "GET"
          }).then(function(responseWeather) {
              //console.log(responseWeather);
              $("#cityName").text(` ${responseWeather.name}`);
              $("#todaysDate").text(todaysDate);
              $("#tempResult").text(` ${(((responseWeather.main.temp - 273.15) * 1.80 + 32).toFixed(2))} °F`);
              $("#humResult").text(` ${responseWeather.main.humidity}%`);
							$("#windResult").text(` ${responseWeather.wind.speed}mph`);
							
							// This is creating variables to represent an icon that corresponds with current weather and displaying it to the page.
							// This also adds an alt tag to the picture for greater accessibility.
							var iconCode = responseWeather.weather[0].icon;
							var iconURL = "https://openweathermap.org/img/w/"+iconCode+".png";
							$("#owmIcon").attr("src", iconURL).attr("alt", responseWeather.weather[0].description)

              // Some local variables gathered from data from the first call to be used in a second nested ajax call. 
              var lat = responseWeather.coord.lat;
              var lon = responseWeather.coord.lon;
              var queryUV = "https://api.openweathermap.org/data/2.5/uvi?appid="+apiKey+"&lat="+lat+"&lon="+lon+"";

              // This ajax call is used to gather uv index data and display it to the page
              $.ajax({
                  url: queryUV,
                  method: "GET"
              }).then(function(responseUV)  {
									//console.log(responseUV);
									var uvIndex = responseUV.value;
                  $("#uvResult").text(` ${responseUV.value}  `)

                  // If statements to change the color of the uv index on the page.
                  if (uvIndex >= 0 && uvIndex <= 2) {
                    $("#uvResult").addClass("uvIndexLow");
                    $("#uvResult").removeClass("uvIndexMed");
                    $("#uvResult").removeClass("uvIndexMod");
                    $("#uvResult").removeClass("uvIndexHigh");
                    $("#uvResult").removeClass("uvIndexEx");
                	}
                	if (uvIndex >= 3 && uvIndex <= 5) {
                	  $("#uvResult").removeClass("uvIndexLow");
                	  $("#uvResult").addClass("uvIndexMed");
                	  $("#uvResult").removeClass("uvIndexMod");
                	  $("#uvResult").removeClass("uvIndexHigh");
                	  $("#uvResult").removeClass("uvIndexEx");
                	}
                	if (uvIndex >= 6 && uvIndex <= 7) {
                	  $("#uvResult").removeClass("uvIndexLow");
                	  $("#uvResult").removeClass("uvIndexMed");
                	  $("#uvResult").addClass("uvIndexMod");
                	  $("#uvResult").removeClass("uvIndexHigh");
                	  $("#uvResult").removeClass("uvIndexEx");
                	}
                	if (uvIndex >= 8 && uvIndex < 10) {
                	  $("#uvResult").removeClass("uvIndexLow");
                	  $("#uvResult").removeClass("uvIndexMed");
                	  $("#uvResult").removeClass("uvIndexMod");
                	  $("#uvResult").addClass("uvIndexHigh");
                	  $("#uvResult").removeClass("uvIndexEx");
                	};
                	if (uvIndex >= 10 ) {
                	  $("#uvResult").removeClass("uvIndexLow");
                	  $("#uvResult").removeClass("uvIndexMed");
                	  $("#uvResult").removeClass("uvIndexMod");
                	  $("#uvResult").removeClass("uvIndexHigh");
                	  $("#uvResult").addClass("uvIndexEx");
                	};
              });

          });

        // This ajax call is used to gather 5-day forecast data and display it to the page.
        $.ajax({
            url: queryForecast,
            method: "GET"
        }).then(function(responseForecast) {
						console.log(responseForecast);

						//This sets the date for corresponding days to variables.
						var date1 = moment().add(1, 'days').format("MM/DD/YYYY");
						var date2 = moment().add(2, 'days').format("MM/DD/YYYY");
						var date3 = moment().add(3, 'days').format("MM/DD/YYYY");
						var date4 = moment().add(4, 'days').format("MM/DD/YYYY");
						var date5 = moment().add(5, 'days').format("MM/DD/YYYY");

						//This sets icons for corresponding days to variables.
						var icon1 = "https://openweathermap.org/img/w/"+responseForecast.list[4].weather[0].icon+".png";
						var icon2 = "https://openweathermap.org/img/w/"+responseForecast.list[12].weather[0].icon+".png";
						var icon3 = "https://openweathermap.org/img/w/"+responseForecast.list[20].weather[0].icon+".png";
						var icon4 = "https://openweathermap.org/img/w/"+responseForecast.list[28].weather[0].icon+".png";
						var icon5 = "https://openweathermap.org/img/w/"+responseForecast.list[36].weather[0].icon+".png";

						//This sets temperature for corresponding days to variables.
						var temp1 = `Temp: ${(((responseForecast.list[4].main.temp - 273.15) * 1.80 + 32).toFixed(2))} °F`;
						var temp2 = `Temp: ${(((responseForecast.list[12].main.temp - 273.15) * 1.80 + 32).toFixed(2))} °F`;
						var temp3 = `Temp: ${(((responseForecast.list[20].main.temp - 273.15) * 1.80 + 32).toFixed(2))} °F`;
						var temp4 = `Temp: ${(((responseForecast.list[28].main.temp - 273.15) * 1.80 + 32).toFixed(2))} °F`;
						var temp5 = `Temp: ${(((responseForecast.list[36].main.temp - 273.15) * 1.80 + 32).toFixed(2))} °F`;
						
						//This sets humidity for corresponding days to variables.
						var hum1 = `Humidity: ${responseForecast.list[4].main.humidity}%`;
						var hum2 = `Humidity: ${responseForecast.list[12].main.humidity}%`;
						var hum3 = `Humidity: ${responseForecast.list[20].main.humidity}%`;
						var hum4 = `Humidity: ${responseForecast.list[28].main.humidity}%`;
						var hum5 = `Humidity: ${responseForecast.list[36].main.humidity}%`;

						//This displays correponding dates to the page.
						$("#date1").text(date1);
						$("#date2").text(date2);
						$("#date3").text(date3);
						$("#date4").text(date4);
						$("#date5").text(date5);
						
						//This displays icons for corresponding days to the page.
						$("#icon1").attr("src", icon1).attr("alt", responseForecast.list[4].weather[0].description);
						$("#icon2").attr("src", icon2).attr("alt", responseForecast.list[12].weather[0].description);
						$("#icon3").attr("src", icon3).attr("alt", responseForecast.list[20].weather[0].description);
						$("#icon4").attr("src", icon4).attr("alt", responseForecast.list[28].weather[0].description);
						$("#icon5").attr("src", icon5).attr("alt", responseForecast.list[36].weather[0].description);

						//This displays temperature for corresponding days to the page.
						$("#temp1").text(temp1);
						$("#temp2").text(temp2);
						$("#temp3").text(temp3);
						$("#temp4").text(temp4);
						$("#temp5").text(temp5);

						//This displays humidity for corresponding days to the page 
						$("#hum1").text(hum1);
						$("#hum2").text(hum2);
						$("#hum3").text(hum3);
						$("#hum4").text(hum4);
						$("#hum5").text(hum5);
		});

		
		
	};

	// This function gets array of cities searched from local storage.
	getCities = () => {
        var storedCities = localStorage.getItem("Cities Searched For");

        if (storedCities) {
			cityButtons = JSON.parse(storedCities);
			
			renderCityBtn();
			displayCityWeather(cityButtons.reverse());
		}
		
    }

	// This function renders a button for each searched city.
	const renderCityBtn = () => {

		// This deletes cities prior to adding new ones.
		$("#cityList").empty();

		// This loops through array of cities.
		for (var i = 0; i < cityButtons.length; i++){

			var ctyBtn = $("<button>");

			ctyBtn.attr("type", "button");
			ctyBtn.attr("class", "list-group-item list-group-item-action cityButton");
			ctyBtn.attr("data-cityName", cityButtons[i]);
			ctyBtn.text(cityButtons[i])

			$(cityList).append(ctyBtn);
		}

		// This sets the array of cities into local storage.
		localStorage.setItem("Cities Searched For", JSON.stringify(cityButtons));

	};

	// This is a click event that runs the above functions when the search button is clicked.
    $("#searchBtn").on("click",function(event){
		//event.preventDefault();

		var cityName = $("#citySearch").val();
		
		// This adds city that was searched to an array.
		cityButtons.push(cityName);

		console.log(cityButtons);


		renderCityBtn();
		displayCityWeather(cityName);
	});
	
	$(document).on("click", ".cityButton", function() {
		displayCityWeather($(this).attr("data-cityName"));
	});

	getCities();

});




