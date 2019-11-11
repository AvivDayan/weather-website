const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');



const app=express();
const port=process.env.PORT||3000;

const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');
const publicFolder=path.join(__dirname,"../public");

app.set('view engine','hbs');
app.set('views',viewsPath);
app.use(express.static(publicFolder));
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Aviv Dayan'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Dana shivro'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Help me plz!!!',
        title:'help',
        name:"Bonie"
    })
})


// app.get('/weather',(req,res)=>{
//     if(!req.query.address){
//         return res.send({ error:"You must provide an address."})
//     }
//     geocode(req.query.address).then(({longitude,latitude,location}={})=>{
//         forecast(longitude,latitude).then((forecastData)=>{
//             res.send({
//                 location:location,
//                 forecast:forecastData
//             })
//         }).catch((error)=>res.send({error}))
//     }).catch((error)=>res.send({error}))
// })

app.get('/weather',async (req,res)=>{
    if(!req.query.address){
        return res.send({ error:"You must provide an address."})
    }

    const addressToForecast=async (address)=>{
        const geoCode=await geocode(address);
        const weather=await forecast(geoCode.longitude,geoCode.latitude);
        return {
            location:geoCode.location,
            forecast:weather
        };
    }

    addressToForecast(req.query.address).then((result)=>{
        res.send(result);
    }).catch((error)=>{res.send({error})});
})



app.get('/products',(req,res)=>{
    if(!req.query.search){
         return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:"Help article not found",
        name:"avivi",
        title:'Error'
    });
})

app.get('*',(req,res)=>{
    res.render('error',{
        error:"Page not found",
        name:'avivo',
        title:'Error'
    });
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
})


