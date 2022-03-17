import React, { useEffect } from "react";
import "./App.css";
import { init, typeOfUser } from "./Web3Client";
import DistributorPage from "./DistributorPage";
import ManufacturerPage from "./ManufacturerPage";
import OwnerPage from "./OwnerPage";
import Redirect from "./Redirect";

function App() {
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="App">
      {console.log(typeOfUser)}
      <OwnerPage />
      <ManufacturerPage />
      <DistributorPage />
    </div>
  );
}

export default App;
