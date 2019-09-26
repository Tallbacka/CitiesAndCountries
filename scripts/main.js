const cities = "json/stad.json";
const countries = "json/land.json";
var nav = document.getElementById('navbarCountries');


// Countries json data retrival
async function getCountryData() {
    let responseCountry = await fetch(countries);
    let countryData = await responseCountry.json()
    return countryData;    
} getCountryData()
    .then(countryData => drawCountry(countryData))
    .then(countryData => {return countryData})
    .catch(err => console.log(err));

// Cities json data retrival
async function getCityData() {
    
    let responseCity = await fetch(cities);
    let cityData = await responseCity.json()
    return cityData;
} getCityData()
    .then(cityData => sortByPopulation(cityData))
    .catch(err => console.log(err));

// Draws the country buttons based on JSON data
function drawCountry(countryData) {

    for (let i = 0; i < Object.values(countryData).length; i++) {

        var b = document.createElement('button');
        b.setAttribute('class', "navbar-toggler");
        b.setAttribute('type', "button");
        b.setAttribute('data-toggle', "collapse");
        b.setAttribute('data-target', "#collapsibleNavbar");
        b.setAttribute('id', countryData[i].id);
        b.setAttribute('onClick', "compareCountriesAndCities(this.id)" )

        var span = document.createElement('span');
        span.innerHTML = (countryData[i].countryname);

        b.appendChild(span);
        nav.appendChild(b);
    }
}

function compareCountriesAndCities(buttonId){
    var compare = [];
    getCityData().then(city =>{
        for (let i = 0; i < Object.values(city).length; i++) {
            if (buttonId == city[i].countryid) {
                compare.push(city[i]);
            }
            console.log(compare);
        }
    })
    drawCities(compare);
}

function drawCities (cityData){

    var div = document.createElement('div');
    div.setAttribute('class', "collapse navbar-collapse");
    div.setAttribute('id', "collapsibleNavbar");

    var ul = document.createElement('ul');
    ul.setAttribute('class', "navbar-nav");
    ul.setAttribute('id', "listCities");

    
    
    for (let i = 0; i < Object.values(cityData).length; i++) {
        var li = document.createElement('li');
        li.innerHTML = cityData[i].stadname
        ul.appendChild(li)
    }    

    div.appendChild(ul);
    nav.appendChild(div);
}

function sortByPopulation(cityData) {
    cityData.sort(function (a, b) { return b.population -a.population});
    return cityData;
}