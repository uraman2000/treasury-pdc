import React, { useState, useEffect } from "react";
import ApiRespository from "./Library/InventoryApiRespository";
import { Container } from "@material-ui/core";
import InventoryTable from "./Components/InventoryTable";
import Login from "./Components/Login";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";

function App() {
  const [state, setstate] = useState({
    isLoggedIn: false
  });

  return (
    <div>
      <Container>
        <Router>
          <Switch>
            {/* <PublicRoute restricted={false} component={Home} path="/" exact /> */}
            <PublicRoute restricted={false} component={() => <Login />} path="/login" exact />
            <PrivateRoute component={InventoryTable} path="/inventory" exact />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
