import React, { useState, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import IData from "./Interfaces/IData";
import InventoryApiRespository from "../Library/InventoryApiRespository";

interface TableState {
  columns: Array<Column<IData>>;
  data: IData[];
}

export default function InventoryTable() {
  const initState = {
    columns: [],
    data: []
  };
  const [state, setState] = useState<TableState>(initState);

  useEffect(() => {
    const fetchData = async () => {
      const head = await InventoryApiRespository.getColumnNames();
      const column = await InventoryApiRespository.getInventory();
      setState({ columns: head, data: column });
    };
    fetchData();
  }, []);

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState((prevState: any) => {
                const data = [...prevState.data];
                data.push(newData);
                InventoryApiRespository.saveInventory(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  InventoryApiRespository.saveInventory(newData);
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                InventoryApiRespository.deleteInventory(oldData.id);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
