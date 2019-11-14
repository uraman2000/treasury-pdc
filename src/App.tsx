import React, { useState, useEffect } from "react";
import ApiRespository from "./Library/ApiRespository";
import { Container } from "@material-ui/core";
import InventoryTable from "./Components/InventoryTable";

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
        <InventoryTable headCell={headCell} dataCell={dataCell} />
      </Container>
    </div>
  );
}

export default App;
