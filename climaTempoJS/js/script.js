const api = {
    key: "08a43962974a3c07c3a879bdb57039d0",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

const cidade = document.querySelector('.cidade')
const data = document.querySelector('.data')
const icone = document.querySelector('.container-img')
const weatherTempo = document.querySelector('.weather')
const container_temp = document.querySelector('.container-temp')
const tempNumero = document.querySelector('.tempNumero')
const tempUnidade = document.querySelector('.tempUnidade')
const low_high = document.querySelector('.hi-low')
const search_input = document.querySelector('.pesquisa')
const search_button = document.querySelector('.btn')

window.addEventListener('load', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError)
    } else {
        alert('navegador não suporta geoLocalização')
    }
    function setPosition(position) {
        console.log(position)
        let lat = position.coords.latitude
        let long = position.coords.longitude
        coordResults(lat, long)
    }
    function showError(error) {
        alert(`erro: ${error.message}`)
    }
})

function coordResults(lat, long) {
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then(response => {
        if(!response.ok){
            throw new Error(`http error: status ${response.status}`)
        }
        return response.json();
    })
    .catch(error => {
        alert(error.message)
    })
    .then(response => {
        displayResults(response)
    })
}

search_button.addEventListener('click', function() {
    searchResults(search_input.value)
})

search_input.addEventListener('keypress', enter)

function enter(event) {
    key = event.keyCode
    if(key === 13) {
        searchResults(search_input.value)
    }
}

function searchResults(cidade) {
    fetch(`${api.base}weather?q=${cidade}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then(response => {
        if(!response.ok){
            throw new Error(`http error: status ${response.status}`)
        }
        return response.json();
    })
    .catch(error => {
        alert(error.message)
    })
    .then(response => {
        displayResults(response)
    })
}

function displayResults(weather){
    console.log(weather)

    cidade.innerText = `${weather.name}, ${weather.sys.country}`

    let agora = new Date();
    data.innerText = dateBuilder(agora)

    let iconeName = weather.weather[0].icon
    icone.innerHTML = `<img src="./icons/${iconeName}.png">`

    let temperatura = `${Math.round(weather.main.temp)}`
    tempNumero.innerText = temperatura
    tempUnidade.innerText = `°c`

    let weatherT = weather.weather[0].description
    weatherTempo.innerText = capitalizeFirstLetter(weatherT)

    low_high.innerText = `${Math.round(weather.main.temp_min)}°c | ${Math.round(weather.main.temp_max)}°c`
}

function dateBuilder(d){
    let dias =  ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    let dia = dias[d.getDay()] //getDay retorna uma posição entre 0 e 6. Sendo 0, Domingo... 1, Segunda...
    let data = d.getDate();
    let month = months[d.getMonth()];
    let ano = d.getFullYear();

    return `${dia}, ${data} de ${month} de ${ano}`
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}