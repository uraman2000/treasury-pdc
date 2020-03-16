import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import BankApiRespository from "../Library/BankApiRespository";
import RegionRepository from "../Library/RegionRepository";

interface Row {
  id: number;
  status: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

function typeLogic(item: any) {
  if (
    item === "account_number" ||
    item === "maintaining_balance" ||
    item === "chq_cost_perpc" ||
    item === "buffer"
  ) {
    return "numeric";
  }
}

export default function AdminBank() {
  const initState = {
    columns: [],
    data: []
  };
  const [state, setState] = React.useState<TableState>(initState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await BankApiRespository.All();
      const regionLookUp = await RegionRepository.lookUp();

      const header = await Object.keys(data[0]);

      const column: any = header.map((item: any) => {
        const itemTittle = item.toUpperCase().replace(/_/g, " ");
        let obj: any = {};

        obj["type"] = typeLogic(item);
        if (item === "id") {
          obj["hidden"] = true;
          obj["editable"] = "never";
        }

        if (item === "region") {
          obj["lookup"] = regionLookUp;
        }

        if (item === "createdAt") {
          obj["hidden"] = true;
        }
        if (item === "created_by") {
          obj["hidden"] = true;
        }

        obj["title"] = itemTittle;
        obj["field"] = item;

        return obj;
      });

      setState({ columns: column, data: data });
    };
    fetchData();
  }, []);

  return (
    <>
      <MaterialTable
        title=""
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
                  BankApiRespository.save(newData);
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
                    BankApiRespository.save(newData);
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
                  BankApiRespository.delete(oldData.id);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    </>
  );
}
