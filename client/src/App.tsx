import React from "react";
import InventoryTable from "./Components/InventoryTable";
import Login from "./Components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import SignUp from "./Components/SignUp";
import DrawerNavigation from "./Components/DrawerNavigation";
import SummaryStatus from "./Components/SummaryStatus";
import TabNavigation from "./Components/TabNavigation";
import AdminUser from "./Components/AdminUser";
import AdminStatus from "./Components/AdminStatus";
import PageNotFound from "./Components/PageNotFound";
import SummaryPerBranch from "./Components/SummaryPerBranch";
import Report from "./Components/Report";
import AdminRoles from "./Components/AdminRoles";
import AdminRoleAddEdit from "./Components/AdminRoleAddEdit";
import AdminBank from "./Components/AdminBank";
import InventoryBulk from "./Components/InventoryBulk";
import AdminRegion from "./Components/AdminRegion";
import AdminBranch from "./Components/AdminBranch";

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
            <ProtectedRoute path="/inventory/bulk" component={InventoryBulk} />
            <ProtectedRoute path="/report" component={Report} />
            <ProtectedRoute
              path="/summary"
              component={() => <TabNavigation statusTabs={status} tabContentComponent={SummaryStatus} />}
            />
            <ProtectedRoute path="/summary-per-branch" component={SummaryPerBranch} />
            <ProtectedRoute path="/admin/user" component={AdminUser} />
            <ProtectedRoute path="/admin/bank" component={AdminBank} />
            <ProtectedRoute path="/admin/roles" component={AdminRoles} />
            <ProtectedRoute path="/admin/region" component={AdminRegion} />
            <ProtectedRoute path="/admin/branch" component={AdminBranch} />
            <ProtectedRoute path="/admin/roles/edit" component={AdminRoleAddEdit} />
            <ProtectedRoute
              path="/admin/status"
              component={() => <TabNavigation statusTabs={adminStatus} tabContentComponent={AdminStatus} />}
            />
          </DrawerNavigation>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
