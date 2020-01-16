/**
 * Intent: Getweather
 * Fulfillment: default
 */

 const axios = require('axios');
var apiKey = '1a391027e2bf406b0e0ee7e282275d38';

module.exports = {

    fulfillment: function (agent) {
        // de stadnaam uit dialogflow halen en toevoegen aan de agent
        const city = agent.parameters['geo-city'];
        agent.add('The weatherconditions in '+city+' are currently :')

        // get naar api met de ingevoerde stad in dialogflow + mijn apikey
       return axios.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+apiKey)
       // promise waarin ik de descriptie en temeratuur uit de api response haal en aan de agent toevoeg.
        .then((result) => {
            console.log(result);
            result.data.weather.map(cityObj =>{              
                agent.add(cityObj.description);
            }) 
           var kelvin = result.data.main.temp;
           var celsius = kelvin - 273.15;
           agent.add(' and the temperature is : ' +Math.round(celsius)+' Degrees!');
            
        })
    }

}