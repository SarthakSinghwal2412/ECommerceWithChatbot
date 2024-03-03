const df = require('dialogflow-fulfillment');

const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Coupon = mongoose.model('coupon');
const Order = require("../models/orderModel");
module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new df.WebhookClient({ request: req, response: res });

        function scooby(agent){
            agent.add(`Welcome to my Scooby fulfillment!`);
        }
        
        async function learn(agent) {
            Demand.findOne({'product': agent.parameters.product}, function(err, product) {
                if (product !== null ) {
                    product.counter++;
                    product.save();
                }
                else {
                    const demand = new Demand({product: agent.parameters.product});
                    demand.save();
                }
            });
            
            let responseText = `You want to search about ${agent.parameters.product}. 
                    Here is a link to all of the product: http://localhost:3000/products`;

            

            let coupon = await Coupon.findOne({'product': agent.parameters.product});
            if (coupon !== null ) {
                responseText = `You want to search about ${agent.parameters.product}. 
                Here is a link to the product:`;
            }
            agent.add(responseText);
        }
        async function allOrders(agent){
            
            const doc = await Order.find({});
            var payloadData = {
                "orders": doc
            }

            agent.add("This is the list of all orders");
            agent.add(new df.Payload(agent.UNSPECIFIED, payloadData, {sendAsMessage: true, rawPayload:true}));
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        
        let intentMap = new Map();
        intentMap.set('Scooby', scooby);
        intentMap.set('search products', learn);
        intentMap.set('Default Fallback Intent', fallback);
        intentMap.set('Get all Orders', allOrders)

        agent.handleRequest(intentMap);
    });

}