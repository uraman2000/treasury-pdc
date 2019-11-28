import React from "react";
import { Container } from "@material-ui/core";
import InventoryTable from "./Components/InventoryTable";
import Login from "./Components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import SignUp from "./Components/SignUp";
import DrawerNavigation from "./Components/DrawerNavigation";
import SummaryStatus from "./Components/SummaryStatus";
import TabNavigation from "./Components/TabNavigation";
import { setAccess, getAccess } from "./utils";
import AdminUser from "./Components/AdminUser";
import AdminStatus from "./Components/AdminStatus";
import PageNotFound from "./Components/PageNotFound";

const status = [
  "CLIENT ACCOUNT STATUS",
  "CHECK DEPOSIT STATUS",
  // "CHECK PAYEE NAME",
  // "DEPOSIT TODAY STATUS",
  "CLIENT CHECK STATUS",
  "REASON FOR BOUNCE STATUS",
  "REASON FOR HOLD STATUS"
];

const adminStatus = [
  "CLIENT ACCOUNT STATUS",
  "CHECK DEPOSIT STATUS",
  "CHECK PAYEE NAME",
  // "DEPOSIT TODAY STATUS",
  "CLIENT CHECK STATUS",
  "REASON FOR BOUNCE STATUS",
  "REASON FOR HOLD STATUS"
];

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route roles={["admin", "manager"]} path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />

          <DrawerNavigation>
            <ProtectedRoute path="/" component={InventoryTable} />
            <ProtectedRoute
              path="/summary"
              component={() => <TabNavigation statusTabs={status} tabContentComponent={SummaryStatus} />}
            />
            <ProtectedRoute path="/admin/user" component={AdminUser} />
            <ProtectedRoute
              path="/admin/status"
              component={() => <TabNavigation statusTabs={adminStatus} tabContentComponent={AdminStatus} />}
            />
          </DrawerNavigation>
          <Route path="*" exact component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
