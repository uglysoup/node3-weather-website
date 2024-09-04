const request = require('request')

const geocode = (address,callback)=>{
    const geocodeURL = 'https://api.mapbox.com/search/geocode/v6/forward?q='
    + encodeURIComponent(address) +
    '&access_token=pk.eyJ1IjoiYWJoaXNoZWt0aGFrdXIxMDUwIiwiYSI6ImNtMGwyMHQ0OTAwdHoybHM3ZGhnOWVlaTkifQ.RbfvQCb8s8NXDKOJzwV74A&limit=1'
    request({url:geocodeURL, json:true},(error, {body}={})=>{
            if(error){
                callback('Unable to connect1',undefined)
            }
            else if (body.features.length ===0){
                callback('Unable to connect',undefined)
            }
            else{
            callback(undefined,{
                latitude: body.features[0].geometry.coordinates[1], 
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.name_preferred
            })
        }
        })
}
module.exports = geocode