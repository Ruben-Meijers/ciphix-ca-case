/**
 * Intent: Custom Welcome Intent
 * Fulfillment: default
 */

module.exports = {

    fulfillment: function (agent) {
        
        agent.add(
            `Welcome! This is the custom response you wanted!`
        )

    }

}
