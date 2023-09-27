
const stripe = require('stripe')('sk_test_51IdihjBfIYPsMJPYx3U4NKIPDElcR67bAPAqlwewLHzyf3fRgiVDZKIskke6RHpyJdfaG49HfMCzHjrRWL2eUDqd00IZIMxrtZ');
const Course = require('../../Courses/models/course.models')


exports.getClientSecret = async (req, res) => {

   const {priceInCents} = await Course.findById(req.params.courseId)
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: priceInCents,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  }); 
  console.log(paymentIntent.client_secret)
  res.json(paymentIntent);
}


exports.renderCheckoutPage = async (req, res) => {

  const course = await Course.findById(req.params.courseId)

  res.render('checkout/new', {course} )

} 


