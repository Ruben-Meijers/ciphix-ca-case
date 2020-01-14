const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()

/**
 * Require all intent fulfillment modules
 */
const f_welcome = require('./fulfillments/default/welcome')
const f_fallback = require('./fulfillments/default/fallback')
const f_customwelcome = require('./fulfillments/custom/welcome')
const f_customfallback = require('./fulfillments/custom/fallback')
const f_getweather = require('./fulfillments/custom/weather')
// Todo: create and require a fulfillment module for each custom intent
// Hint: use the directory fulfillments/custom

app.post('/', express.json(), (req, res) => {
  
  const agent = new WebhookClient({ request: req, response: res })
  let intentMap = new Map()
  
  /**
   * Connect fulfillment modules to Dialogflow intents
   */
  intentMap.set('Default Welcome Intent', f_welcome.fulfillment)
  intentMap.set('Default Fallback Intent', f_fallback.fulfillment)
  intentMap.set('Custom Welcome Intent', f_customwelcome.fulfillment)
  intentMap.set('Custom Fallback Intent', f_customfallback.fulfillment)
  intentMap.set('Getweather', f_getweather.fulfillment)
  // Todo: connect each custom intent with custom fulfillment modules
  // Hint: create a intent in Dialogflow first

  // Connect the agent to the intent map
  agent.handleRequest(intentMap)

})

// Startup server on port 8080
app.listen(process.env.PORT || 8080)
console.log('Node server running on port 8080');