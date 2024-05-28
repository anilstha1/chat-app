"use client";
import {useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({amount, gif}: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const res = await axios.post("/api/user/addgifs", {gif});
    console.log(res);
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // Trigger form validation and wallet collection
    const {error} = await elements.submit();
    if (error) {
      console.log(error);
      return;
    }
    const {data} = await axios.post("/api/create-intent", {
      amount: amount,
    });

    const result = await stripe.confirmPayment({
      clientSecret: data,
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <div className="flex justify-center w-screen mt-8">
      <form onSubmit={handleSubmit}>
        <div className="w-[450px]">
          <PaymentElement />
        </div>

        <button className="text-white bg-blue-800 border border-gray-200 rounded-md py-2 px-3 mt-5  hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
