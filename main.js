console.log('test')
ServerSide = 'c5c921b4fc2f861f24b35b4aac94394c'
// url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${ServerSide}`

/* 

Remove/Exhange .daily

temp = .data.daily.temp.day
High = .data.daily.temp.max
Low = .data.daily.temp.min
Forecast = .data.daily.weather.main
Humidity = .data.daily.humidity

*/
const getCity = async (city) => {
    const cordResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${ServerSide}`)
    const cordData = await cordResponse.json()
    console.log(cordData)

    let lon = cordData[0]['lon']
    console.log(lon)
    let lat = cordData[0]['lat']
    console.log(lat)
    // return cordData

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ServerSide}`)
    const data = await response.json()
    console.log(data)

    // waiting on api key to activate. Presetting these values to variables. DOUBLE CHECK LOG DATA TO INSURE CORRECT PARCING, will most likely have to remove current.
// 
    // const test = document.getElementById('test').innerHTML = `
    // ${lon} , ${lat}
    // `

    let tempMax = parseFloat(data.main.temp_max)
    console.log(tempMax)
    const setMax = document.getElementById('tempMax').innerHTML = `
    <h3>${Math.ceil(((tempMax-273.15)*1.8)+32)}</h3>
    `

    let tempMin = parseFloat(data.main.temp_min)
    const setMin = document.getElementById('tempMin').innerHTML = `
    <h3>${Math.ceil(((tempMin-273.15)*1.8)+32)}</h3>
    `

    const forecast = data.weather[0].main
    console.log(forecast)
    const setForecast = document.getElementById('forecast').innerHTML = `
    <h3>${forecast}</h3>
    `

    const humidity = data.main.humidity
    console.log(humidity)
    const setHumidity = document.getElementById('humidity').innerHTML = `
    <h3>${humidity}</h3>
    `

    
}
// getCity()

const getInfo = async (event) => {
    if (event){
        event.preventDefault()
    }

    const citySearch = document.getElementById('city').value
    try {
        await getCity(citySearch)
    } catch (error){
        console.error('Submit error: ', error)
    }
}