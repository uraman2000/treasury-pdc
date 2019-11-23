import React from "react";
import { Container } from "@material-ui/core";
import InventoryTable from "./Components/InventoryTable";
import Login from "./Components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import SignUp from "./Components/SignUp";
import DrawerNavigation from "./Components/DrawerNavigation";
import SummaryStatus from "./Components/SummaryStatus";
import SummaryNav from "./Components/SummaryNav";
import { setAccess } from "./utils";
import AdminUser from "./Components/AdminUser";

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* {deleteAccess()} */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <DrawerNavigation>
            <ProtectedRoute path="/" component={InventoryTable} />
            <ProtectedRoute path="/summary" component={SummaryNav} />
            <ProtectedRoute path="/admin/user" component={AdminUser} />
          </DrawerNavigation>
        </Switch>
      </Router>
    </>
  );
}

export default App;
