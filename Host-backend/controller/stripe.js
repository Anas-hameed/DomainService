const Stripe = require("stripe")
require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY)

const createCheckoutSession = async(req, res)=>{
    const item = req.body
    

      const transformedItem = {
          price_data: {
            currency: 'usd',
            product_data: {
              images: [item.images],
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          description: item.description,
          quantity: item.quantity,
        };
  
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [transformedItem],
          mode: 'payment',
          success_url: `${process.env.CLIENT_URL}/checkout/success`,
          cancel_url: `${process.env.CLIENT_URL}/`,
          metadata: {
            images: item.image,
          },
        })
     
        res.json({url: session.url}) 


}

const createToken = async(req, res)=>{

  const token = await stripe.tokens.create({
    card: {
      number: '4242424242424242',
      exp_month: 9,
      exp_year: 2023,
      cvc: '314',
    },
  });

  res.json(token)
}



module.exports = { createCheckoutSession, createToken }