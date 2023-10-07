// This is your test publishable API key.
const stripe = Stripe("pk_test_51IdihjBfIYPsMJPYMND7ooEi9GsYOyMaY8mhIjB0MvynMaq7wpX2FAf9LpUkFlY43nBc2lbZX6lHk7YBC7djRemZ00yNsm8AUF");

// The items the customer wants to buy
const items = [{ id: "xl-tshirt" }];

let elements;
let clientSecret;
let cardElement;
const courseId = document.getElementById('payment-form').getAttribute("courseId");


initialize();
checkStatus();

document.getElementById('submit').addEventListener('click' , handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch(`/checkout/${courseId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const { client_secret } = await response.json();

  clientSecret = client_secret

  const appearance = {
    theme: 'night',
  };
  elements = stripe.elements({ appearance, client_secret });


  const paymentElementOptions = {
    layout: "tabs",
  };

  const paymentElement = elements.create("card", paymentElementOptions);
  paymentElement.mount("#payment-element");
  cardElement = paymentElement
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const res = await stripe
  .confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: 'Jenny Rosen',
      },
    },
  })

  if (res.error){
    setLoading(false);

    alertify
      .alert('Purchase error', `${res.error.message}`, function(){
        alertify.message('try again');
      });
  }

  else if(res.paymentIntent.status === "succeeded") {

    try {
      const courseAccess = fetch("/user/giveCourseAccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          courseId: courseId
        })
      })
      
      const saleRecord = fetch(`/sales/${courseId}`, {
        method: 'POST'
      })

      setLoading(false);

      alertify
        .alert('Purchase complete', 'Now you watch the full course ', function(){
            document.location = `/courses/${courseId}/show`
        });
      

    } catch (error) {
      alertify
        .alert('Error Adding the course to your list', 'Contact costumer support', function(){
            document.location = `/courses/${courseId}/show`
        });
    }

    // give course accces




  }

}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}