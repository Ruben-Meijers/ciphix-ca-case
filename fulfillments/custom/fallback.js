/**
 * Intent: Custom Fallback Intent
 * Fulfillment: default
 */

module.exports = {

    fulfillment: function (agent) {
    
        agent.add(
            `I don't get what you're saying! Please formulate your question in a different matter.`
        )

    }

}
