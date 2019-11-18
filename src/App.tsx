import React, { useState, useEffect } from "react";
import ApiRespository from "./Library/InventoryApiRespository";
import { Container } from "@material-ui/core";
import InventoryTable from "./Components/InventoryTable";
import Login from "./Components/Login";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import LoginApiRepository from "./Library/LoginApiRepository";
import { getAccess } from "./utils";

function App() {
  const access_token = getAccess().access_token;
  const [state, setstate] = useState({ status: 200 });
  useEffect(() => {
    const fetchData = async () => {
      await setstate(await LoginApiRepository.isTokenExpired(access_token));
    };

    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <Router>
          <Switch>
            {/* <PublicRoute restricted={false} component={Home} path="/" exact /> */}
            <PublicRoute
              islogin={state.status}
              restricted={false}
              component={() => <Login />}
              path="/login"
              exact
            />

            <PrivateRoute islogin={state.status} component={InventoryTable} path="/inventory" exact />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
