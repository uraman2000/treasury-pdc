import React, { useState, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import IData from "./Interfaces/IData";
import ApiRespository from "../Library/ApiRespository";

interface IEditableTableProps {
  headCell: Array<Column<IData>>;
  dataCell: IData[];
}

interface TableState {
  columns: Array<Column<IData>>;
  data: IData[];
}

export default function InventoryTable(props: IEditableTableProps) {
  let { headCell, dataCell } = props;
  const apiRepo = new ApiRespository();
  const initState = {
    columns: headCell,
    data: dataCell
  };
  const [state, setState] = useState<TableState>(initState);

  useEffect(() => {
    setState({ columns: headCell, data: dataCell });
  }, [props]);

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
                apiRepo.saveInventory(newData);
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
                  apiRepo.saveInventory(newData);
                  console.log(newData);
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

                apiRepo.deleteInventory(oldData.id);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
