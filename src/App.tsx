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
import SignUp from "./Components/SignUp";
import DrawerNavigation from "./Components/DrawerNavigation";

function App() {
  return (
    <div>
      <Container>
        {/* <SummaryStatus tableName={"check_deposite_status"} />
        <SummaryStatus tableName={"account_status"} />
        <SummaryStatus tableName={"client_check_status"} />
        <SummaryStatus tableName={"reason_for_bounce_status"} />
        <SummaryStatus tableName={"reson_for_hold_status"} /> */}

        <Router>
          <Switch>
            {/* {deleteAccess()} */}
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <DrawerNavigation>
              <ProtectedRoute path="/">
                <InventoryTable />
              </ProtectedRoute>
            </DrawerNavigation>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
