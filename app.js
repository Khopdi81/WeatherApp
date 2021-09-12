const { response } = require("express");
const express = require ("express");
const bodyParser = require ("body-parser");

const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extened:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apikey="8fcf6f8ccafe00f9e5bd5f6884f6862e";
    const units="metric";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;

    https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
         const WeatherData = JSON.parse(data);
         console.log(WeatherData);
         const temperature= WeatherData.main.temp;
         const description = WeatherData.weather[0].description;
         const image= WeatherData.weather[0].icon;
         const imageURL = "http://openweathermap.org/img/wn/"+image+"@2x.png";
         res.set("content-type", "text/html");
         res.write("<H3>The weather is: "+ description +"</H3>");
         res.write("<H1>The Tempreture at "+query+" city is: "+ temperature + " DegreeC </H1>"); 
         res.write("<img src="+imageURL+">");
         res.send();
    });
})

});


app.listen("5050",function(){
    console.log("The Server Is Running On Port: 5050.")
})
         









