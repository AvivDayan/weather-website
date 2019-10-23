const request=require('request');

const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXZpdjEyMyIsImEiOiJjazF4dTUxOXQwYjQ3M2NwY284OXM3NGw0In0.p3bYQTKydfS4g_niJiRnZQ&limit=1`;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to geocode services',undefined);
        }
        else if(body.features.length===0){

            callback('Unable to find location',undefined);
        }
        else{

            const place=body.features[0];
            callback(undefined,{
                location:place.place_name,
                longitude:place.center[0],
                latitude:place.center[1]
            });
        }
    });
}

module.exports=geocode;