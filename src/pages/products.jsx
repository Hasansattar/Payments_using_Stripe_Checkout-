import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { graphql, useStaticQuery } from "gatsby"





export default function Home() {

  const redirectToCheckout = async (event,PID) => {
    event.preventDefault()
   
    const stripe = await loadStripe("pk_test_51HougmBQ6jXxmoQTWtoUEIaUAaM6RngkQBwFDRszQRM20aLA7SK2eIJWwiVyhTNxtd3ebJ7DQswa9OQTRZP2fk5B002Pjv6vtK")
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: PID, quantity: 1 }],
      successUrl: `http://localhost:8000/payment-success`,
      cancelUrl: `http://localhost:8000/payment-error`,
    })
    if (error) {
      console.warn("Error:", error)
      
    }
  }



const data=useStaticQuery(graphql`
query MyQuery {
    allStripePrice {
      edges {
        node {
          id
          product {
            id
            images
            name
            description
          }
        }
      }
    }
  }
  

`)
   console.log(data);


  return <div>

        <h1>MY PRODUCTS</h1>
        {data.allStripePrice.edges.map(({node})=>{
            return (
              <div key={node.id}>
              {/* <p> {JSON.stringify(node)}</p> */}

        <p>{node.product.name}</p>
        <p>{node.product.description}</p>
         <img src={node.product.images[0]}  height="200" width="200"  alt="pictuure" /> <br/>
         <button  onClick={(e)=>redirectToCheckout(e,node.id)}>Buy {node.product.name}</button>

                </div>  
            )


        })}

    {/* <button  onClick={redirectToCheckout}>Buy Laptop</button> */}
  </div>
}
