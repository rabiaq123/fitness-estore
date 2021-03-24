import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/screens/Login/LoginPage";
import LandingPage from "./components/screens/LandingPage/LandingPage";
import Products from "./components/screens/Products/Products";
import ProductDetails from "./components/screens/ProductDetails/ProductDetails";

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/products" exact component={Products} />
          <Route path="/product-details" component={ProductDetails} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
