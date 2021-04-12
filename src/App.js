import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/homepage";
import Register from "./components/register";
import Login from "./components/login";
import "./app.scss";
import userContext from "./context/userContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        "https://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("https://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <userContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route exact patch="/" component={Home} />
          <Route patch="/register" component={Register} />
          <Route patch="/login" component={Login} />
        </Switch>
      </userContext.Provider>
    </BrowserRouter>
  );
}
export default App;
