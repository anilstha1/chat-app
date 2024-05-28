"use client";
import React from "react";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "@/components/checkoutForm";
import {useSearchParams} from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISER_KEY!);

function Checkout() {
  const searchParams = useSearchParams();
  const amount: any = searchParams.get("amount");
  const gif = searchParams.get("gif");
  const options = {
    mode: "payment",
    currency: "usd",
    amount: amount * 100,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} gif={gif} />
    </Elements>
  );
}

export default Checkout;
