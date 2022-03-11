import React, { useEffect } from "react";
import "./App.css";
import { init } from "./Web3Client";
import AddManufacturerComponent from "./AddManufacturerComponent";
import AddRetailerComponent from "./AddRetailerComponent";
import AddDistributorComponent from "./AddDistributorComponent";
import AddConsumerComponent from "./AddConsumerComponent";

function App() {
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="App">
      <AddManufacturerComponent />
      <AddDistributorComponent />
      <AddRetailerComponent />
      <AddConsumerComponent />
    </div>
  );
}

export default App;
