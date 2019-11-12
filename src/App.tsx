import React, { useState, useEffect } from "react";
import EditableTable from "./Components/EditableTable";
import ApiRespository from "./Library/ApiRespository";
import { Container } from "@material-ui/core";

function App() {
  const [headCell, setheadCell] = useState([]);
  const [dataCell, setdataCell] = useState([]);
  const apiRepo = new ApiRespository();
  useEffect(() => {
    const fetchData = async () => {
      setheadCell(await apiRepo.getColumnNames());
      setdataCell(await apiRepo.getInventory());
    };
    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <EditableTable headCell={headCell} dataCell={dataCell} />
      </Container>
    </div>
  );
}

export default App;
