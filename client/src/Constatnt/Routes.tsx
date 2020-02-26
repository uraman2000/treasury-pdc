import React from "react";
import Login from "../Components/Login";
import InventoryTable from "../Components/InventoryTable";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import TableChartRoundedIcon from "@material-ui/icons/TableChartRounded";


export const RoutesConfig = [
  {
    path: "/login",
    component: Login,
    icon: <TableChartRoundedIcon />,
    name: "login",
    text: "Inventory"
  },
  {
    path: "/",
    component: InventoryTable,
    name: "inventoryTable",
    text: "Inventory"
  }
];
