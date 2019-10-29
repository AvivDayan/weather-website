const request=require('request');

// const forecast=(longitude,latitude,callback)=>{
//     const url=`https://api.darksky.net/forecast/166b3635bec8ee7d45f2e0aa0da621db/${longitude},${latitude}?units=si`;
//     request({url,json:true},(error,{body})=>{
//         if(error){
//             callback("Unable to connect to weather services",undefined);
//         }
//         else if(body.error){
//             callback("Unable to find forecast for that coordinates!",undefined);
//         }
//         else{
//             callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature}. There is a ${body.currently.precipProbability}% chance of rain.`);
//         }
//     });
// } 

const forecast=(longitude,latitude)=>{
    return new Promise((resolve,reject)=>{
        const url=`https://api.darksky.net/forecast/166b3635bec8ee7d45f2e0aa0da621db/${longitude},${latitude}?units=si`;
        request({url,json:true},(error,{body})=>{
        if(error){
            reject("Unable to connect to weather services");
        }
        else if(body.error){
            reject("Unable to find forecast for that coordinates!");
        }
        else{
            resolve(`${body.daily.data[0].summary} It is currently ${body.currently.temperature}. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    });
    })
} 

module.exports=forecast;
