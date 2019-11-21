import React from "react";
import { Container } from "@material-ui/core";
import InventoryTable from "./Components/InventoryTable";
import Login from "./Components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import SignUp from "./Components/SignUp";
import DrawerNavigation from "./Components/DrawerNavigation";
import SummaryStatus from "./Components/SummaryStatus";

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
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <DrawerNavigation>
              <ProtectedRoute path="/" component={InventoryTable} />
              <ProtectedRoute path="/summary" component={() => <SummaryStatus tableName={"account_status"} />} />
            </DrawerNavigation>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
