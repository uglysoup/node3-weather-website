const request = require('request')


const forecast= (latitude,longitude,callback)=>{
     const url = 'https://api.weatherstack.com/current?access_key=d6515c2e000ea80c8401f57e55c53fdc&query=' + latitude + ',' + longitude
//add & units=f fr fahren, m for metric, s for scientific

request({url, json:true},(error, {body})=>{
    // console.log(response.body.current)
    if(error){
        callback('Connectivity issue!',undefined)
    }
    else if (body.error){
        callback("Wrong location!",undefined)
    }
    else{
    callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature+' degree. It feels like ' + body.current.feelslike+ ' degree.')
    }
})
}

module.exports = forecast