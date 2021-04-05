import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/homepage";
import Register from "./components/register";
import Login from "./components/login";
import Header from "./components/header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact patch="/" component={Home} />
        <Route patch="/register" component={Register} />
        <Route patch="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
//      <UserContext.Provider value={{ userData, setUserData }}>

export default App;
