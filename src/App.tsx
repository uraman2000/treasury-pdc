import React, { useState, useEffect } from "react";
import ApiRespository from "./Library/InventoryApiRespository";
import { Container } from "@material-ui/core";
import InventoryTable from "./Components/InventoryTable";
import Login from "./Components/Login";
import SummaryStatus from "./Components/SummaryStatus";

function App() {
  const [headCell, setheadCell] = useState([]);
  const [dataCell, setdataCell] = useState([]);

  const apiRepo = new ApiRespository();
  useEffect(() => {
    const fetchData = async () => {
      await setheadCell(await apiRepo.getColumnNames());
      await setdataCell(await apiRepo.getInventory());
    };
    fetchData();
  }, []);

  return (
    <div>
      <Container>
        {/* <InventoryTable headCell={headCell} dataCell={dataCell} /> */}
        {/* <Login /> */}
        <SummaryStatus tableName={"check_deposite_status"} />
        <SummaryStatus tableName={"account_status"} />
        <SummaryStatus tableName={"client_check_status"} />
        <SummaryStatus tableName={"reason_for_bounce_status"} />
        <SummaryStatus tableName={"reson_for_hold_status"} />
      </Container>
    </div>
  );
}

export default App;
