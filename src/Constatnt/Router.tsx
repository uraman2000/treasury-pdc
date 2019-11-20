import Login from "../Components/Login";
import InventoryTable from "../Components/InventoryTable";

export const routes = [
  {
    path: "/login",
    component: Login,
    name: "login"
  },
  {
    path: "/",
    component: InventoryTable,
    name: "inventoryTable"
  }
];
