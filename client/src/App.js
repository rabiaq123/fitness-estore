import React from "react";
import "./App.css";
import Footer from "./components/utils/Footer/Footer";
import Navbar from "./components/utils/Navbar/Navbar";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
