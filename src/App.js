import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { init } from "./Web3Client";
import ManufacturerPage from "./ManufacturerPage";
function App() {
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="App">
      <ManufacturerPage />
    </div>
  );
}

export default App;
