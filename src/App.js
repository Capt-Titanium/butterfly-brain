import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <Route exact patch="/" component={Home} />
          <Route patch="/register" component={Register} />
          <Route patch="/login" component={Login} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
