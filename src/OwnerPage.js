import React, { useEffect } from "react";
import "./App.css";
import AddManufacturerComponent from "./Owner/AddManufacturerComponent";
import AddRetailerComponent from "./Owner/AddRetailerComponent";
import AddDistributorComponent from "./Owner/AddDistributorComponent";
import AddConsumerComponent from "./Owner/AddConsumerComponent";

export default () => {
  return (
    <>
      <AddManufacturerComponent />
      <AddDistributorComponent />
      <AddRetailerComponent />
      <AddConsumerComponent />
    </>
  );
};
