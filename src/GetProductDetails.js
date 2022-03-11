import React, { useState } from "react";
import { getProductDetails } from "./Web3Client";

export default () => {
  const [productId, setproductId] = useState("");
  const submitValue = () => {
    console.log(getProductDetails(productId));
  };

  return (
    <>
      <h3>Get Product</h3>
      <input
        type="text"
        placeholder="Product ID"
        onChange={(e) => setproductId(e.target.value)}
      />

      <button onClick={submitValue}>Submit</button>
    </>
  );
};
