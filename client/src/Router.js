import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/screens/Login/LoginPage";

export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LoginPage} /> {/* Replace with landing page */}
                    <Route path="/login" component={LoginPage} />
                </Switch>
            </BrowserRouter>

        </div>
    );
}