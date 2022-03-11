import React, { useEffect } from "react";
import "./App.css";
import GetProductDetails from "./GetProductDetails";
import AddProuctComponent from "./Manufacturer/AddProuctComponent";
import ForSaleByManufacturerComponent from "./Manufacturer/ForSaleByManufacturerComponent";
import ShippedByManufacturerComponent from "./Manufacturer/ShippedByManufacturerComponent";

export default () => {
  return (
    <>
      <AddProuctComponent />
      <ForSaleByManufacturerComponent />
      <ShippedByManufacturerComponent />
      <GetProductDetails />
    </>
  );
};
