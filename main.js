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

    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=(minutely,hourly,daily,alerts)&appid=${ServerSide}`)
    const data = response.json()
    console.log(data)

    // waiting on api key to activate. Presetting these values to variables. DOUBLE CHECK LOG DATA TO INSURE CORRECT PARCING, will most likely have to remove current.

    const allData = document.querySelectorAll('.title-text')

    const temp = ((allData.data.current.temp.day)*1.8)+32
    console.log(temp)
    const setTemp = document.getElementById('temp').innerHTML = `
    <h3>${temp}</h3>
    `

    const forecast = data.current.weather.main.innerText
    console.log(forecast)
    const setForecast = document.getElementById('forecast').innerHTMl = `
    <h3>${forecast}</h3>
    `

    const humidity = data.current.humidity.innerText
    console.log(humidity)
    const setHumidity = document.getElementById('humidity').innerHTML = `
    <h3>${humidity}</h3>
    `

    const test = document.getElementById('test').innerHTML = `
    ${lon} , ${lat}
    `
    
}
getCity('lexington')