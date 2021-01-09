import React from "react"
import { loadStripe } from "@stripe/stripe-js"





export default function Home() {

  const redirectToCheckout = async (event) => {
    event.preventDefault()
   
    const stripe = await loadStripe("pk_test_51HougmBQ6jXxmoQTWtoUEIaUAaM6RngkQBwFDRszQRM20aLA7SK2eIJWwiVyhTNxtd3ebJ7DQswa9OQTRZP2fk5B002Pjv6vtK")
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1HoxFhBQ6jXxmoQTO9hRS36o", quantity: 1 }],
      successUrl: `http://localhost:8000/payment-success`,
      cancelUrl: `http://localhost:8000/payment-error`,
    })
    if (error) {
      console.warn("Error:", error)
      
    }
  }



  return <div>
    <button  onClick={redirectToCheckout}>Buy Laptop</button>  &nbsp;&nbsp;
   <button> <a href="http://localhost:8000/products">products</a></button>
  </div>
}
