import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForom from "./CheckoutForom";


const stripePromise = loadStripe(
  "pk_test_51JwLSlC7tPDysEb3jWJYfdhrRO4ZpbLP6f1QbQSIuNXSS3i2Rm9IzQKLBDv7BTBVMCXuJLeR85PJZMpNQs6pgy1100CMRiGC1Y"
);

const PaymentGateWaye = () => {
  const [targetedCorse, setTargetedCourse] = useState({});
  const { id } = useParams();
  useEffect(() => {
    {id &&
      fetch(`https://nameless-plains-00975.herokuapp.com/course/${id}`)
        .then((res) => res.json())
        .then((data) => setTargetedCourse(data));}
  }, [id]);

  return (
    <div>
      <h3>
        {" "}
        Please $ {targetedCorse.price} Pay for {targetedCorse.name}{" "}
      </h3>

      {targetedCorse?.price && (
        <Elements stripe={stripePromise}>
          <CheckoutForom course={targetedCorse} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentGateWaye;
