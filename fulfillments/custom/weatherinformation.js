/**
 * Intent: WeatherInformation
 * Fulfillment: default
 */

 const axios = require('axios');
var apiKey = '1a391027e2bf406b0e0ee7e282275d38';

module.exports = {

    fulfillment: function (agent) {
       // de stadnaam en datum uit dialogflow halen en toevoegen aan de agent
       const city = agent.parameters['geo-city'];
       const dialogflowDate = agent.parameters['date'];
        var dt = new Date(dialogflowDate);
        var timestamp = dt.getTime();
        var currentTime = Date.now();
        console.log(city +' ' + timestamp + ' ' + dt);
        if(timestamp > currentTime){
           // console.log('Er word om een forecast gevraagd voor de stad: '+city);
            //informatie aan de user geven met feedback welke stad er gekozen is en welke informatie de forecast gaat bieden.
            agent.add('I can show you a weather forecast for the next 5 days for the city '+city+'. The information is on an interval of 3 hours.')
               // get naar api met stad en apikey. notice dat dit een forecast url is en niet een curr.weather
       return axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+city+'&APPID='+apiKey)
        .then((result) =>{
            //mapping in apiresponse om in de array te kunnen zien waar de tijden/weersomstandigheden staan.
            result.data.list.map(listObj =>{
           //  console.log('De voorspelde weeromstandigheden zijn '+listObj.weather[0].description+' rond het tijdstip '+listObj.dt_txt);  
             agent.add('The weather forecast are: '+listObj.weather[0].description+' around '+listObj.dt_txt);            
            })
       })
        } 
        else {
            agent.add(
                `The information provided is false! Can you reformulate your question please? Sorry for the inconvenience.`
            )
        }
    


    }

}