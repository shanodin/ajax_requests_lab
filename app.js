var init = function () {

  var renderFromStorage = function() {
    var savedCountry = JSON.parse(localStorage.getItem('country')) || {};
    populate(savedCountry)
  }

  var url = "https://restcountries.eu/rest/v2/all";

  var addCountriesToList = function(countries) {
    var dropdown = document.querySelector('#select')
    countries.forEach(function(country, index){
      var option = document.createElement("option")
      option.innerText = country.name;
      option.value = index
      select.appendChild(option)
    })
  }

  var populate = function (data) {
    var pTag = document.querySelector('#countryInfo');
    var selectedCountryName = data.name;
    var selectedCountryPopulation = data.population;
    var selectedCountryCapital = data.capital;
    var selectedCountryData = "Name: " + selectedCountryName + ", Population: " + selectedCountryPopulation + ", Capital City: " + selectedCountryCapital
    pTag.innerHTML = "";
    pTag.innerText = selectedCountryData;
  }

  var render = function(countries){
    addCountriesToList(countries);
    // handleCountrySelect(countries);
    var countryDropDown = document.querySelector("select");

    var handleCountrySelect = function(){
      var selectedCountry = countries[this.value];
      // var selectedCountryName = selectedCountry.name;
      // var selectedCountryPopulation = selectedCountry.population;
      // var selectedCountryCapital = selectedCountry.capital;
      // var selectedCountryData = "Name: " + selectedCountryName + ", Population: " + selectedCountryPopulation + ", Capital City: " + selectedCountryCapital
      populate(selectedCountry)
      save(selectedCountry)
    }
    countryDropDown.addEventListener("change", handleCountrySelect);
  }

  var makeRequest = function(url){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", function() {
      var countries = JSON.parse(this.responseText);
      render(countries)
      renderFromStorage(countries)
    });
    request.send();
  }

  makeRequest(url);
}

var save = function(country){
  console.log(country);
  // var countryIndex = handleCountrySelect();
  localStorage.setItem('country', JSON.stringify(country));
}

window.addEventListener('load', init )
