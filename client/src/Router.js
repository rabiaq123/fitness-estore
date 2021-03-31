import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/screens/Login/LoginPage";
import CheckoutPage from "./components/screens/Checkout/Checkout";

export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LoginPage} /> {/* Replace with landing page */}
                    <Route path="/login" component={LoginPage} />
                    <Route path="/checkout" component={CheckoutPage} />
                </Switch>
            </BrowserRouter>

        </div>
    );
}