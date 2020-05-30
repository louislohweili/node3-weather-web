const request = require('request')

const forecast = (latitude, longitude, callback) =>{
   const url = 'http://api.weatherstack.com/current?access_key=82478dd557111497ced8deb949b3160e&query='+ latitude + ',' + longitude 
//    request({ url, json: true }, (error, { body }) => {
//       if (error){
//         callback('unable to connect to  webather service!', undefined)
//       }else if (body.error){
//         callback('Unable to find location', undefined)
  
//     } else {
//         callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precipProbability + 'degress out')
//     }
// })
//   }

//   module.exports = forecast      

request({ url, json: true }, (error, { body }) => {
  if (error) {
      callback('Unable to connect to weather service!', undefined)
  } else if (body.error) {
      callback('Unable to find location', undefined)
  } else {
      callback(undefined, body.current.weather_descriptions[0]  + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
  }
})
}

module.exports = forecast





