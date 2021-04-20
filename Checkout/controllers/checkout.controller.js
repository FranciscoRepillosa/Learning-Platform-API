
const stripe = require('stripe')('sk_test_51IdihjBfIYPsMJPYx3U4NKIPDElcR67bAPAqlwewLHzyf3fRgiVDZKIskke6RHpyJdfaG49HfMCzHjrRWL2eUDqd00IZIMxrtZ');

exports.getClientSecret = async (req, res) => {

   const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  }); 
  console.log(paymentIntent.client_secret)
  res.json(paymentIntent.client_secret);
}



