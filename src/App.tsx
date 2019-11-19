import React, { useState, useEffect } from "react";
import ApiRespository from "./Library/InventoryApiRespository";
import { Container } from "@material-ui/core";
import InventoryTable from "./Components/InventoryTable";
import Login from "./Components/Login";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import LoginApiRepository from "./Library/LoginApiRepository";
import { getAccess, deleteAccess } from "./utils";
import ProtectedRoute from "./Components/ProtectedRoute";
import InventoryApiRespository from "./Library/InventoryApiRespository";

function App() {
  return (
    <div>
      <Container>
        <Router>
          <Switch>
            {console.log(getAccess().refresh_token)}
            {/* <PublicRoute restricted={false} component={Home} path="/" exact /> */}
            {/* <Route path="/login" exact component={Login} />
            <Route path="/" exact component={InventoryTable} /> */}
            {/* {deleteAccess()} */}
            <Route path="/login" exact component={Login} />
            <ProtectedRoute path="/">
              <InventoryTable />
            </ProtectedRoute>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
