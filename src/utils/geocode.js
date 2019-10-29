const request=require('request');
// const geocode=(address,callback)=>{
//     const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXZpdjEyMyIsImEiOiJjazF4dTUxOXQwYjQ3M2NwY284OXM3NGw0In0.p3bYQTKydfS4g_niJiRnZQ&limit=1`;
//     request({url,json:true},(error,{body})=>{
//         if(error){
//             callback('Unable to connect to geocode services',undefined);
//         }
//         else if(body.features.length===0){

//             callback('Unable to convert address to coordinates',undefined);
//         }
//         else{

//             const place=body.features[0];
//             callback(undefined,{
//                 location:place.place_name,
//                 latitude:place.center[0],
//                 longitude:place.center[1]
//             });
//         }
//     });
// }

const geocode=(address)=>{
    return new Promise((resolve,reject)=>{
        const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXZpdjEyMyIsImEiOiJjazF4dTUxOXQwYjQ3M2NwY284OXM3NGw0In0.p3bYQTKydfS4g_niJiRnZQ&limit=1`;
        request({url,json:true},(error,{body})=>{
        if(error){
            reject('Unable to connect to geocode services');
        }
        else if(body.features.length===0){
            reject('Unable to convert address to coordinates');
        }
        else{

            const place=body.features[0];
            resolve({
                location:place.place_name,
                latitude:place.center[0],
                longitude:place.center[1]
            });
        }
    });
    })
}

module.exports=geocode;