/**
 * Intent: Getweather
 * Fulfillment: default
 */

 const axios = require('axios');
var apiKey = '1a391027e2bf406b0e0ee7e282275d38';

module.exports = {

    fulfillment: function (agent) {
        const city = agent.parameters['geo-city'];
        agent.add('The weatherconditions in '+city+' are currently :')
       return axios.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+apiKey)
        .then((result) => {
            result.data.weather.map(cityObj =>{              
                agent.add(cityObj.description);
            }) 
           var temp = result.data.main.temp;
           var celsius = temp - 273.15;
           agent.add(' and the temperature is : ' +Math.round(celsius)+' Degrees!');
            
        })
    }

}