import React, { useState, useEffect } from "react";
import EditableTable from "./Components/EditableTable";
import ApiRespository from "./Library/ApiRespository";
import { Container } from "@material-ui/core";
import Test from "./Components/Test";
import { FieldArray } from "formik";
import FieldArrayTest from "./Components/FieldArrayTest";

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
        {/* <EditableTable headCell={headCell} dataCell={dataCell} />
         */}

        <FieldArrayTest headCell={headCell} dataCell={dataCell} />

        <Test tableData={dataCell} />
      </Container>
    </div>
  );
}

export default App;
