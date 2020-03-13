import React, { useEffect, useState } from "react";
import MaterialTable, { Column } from "material-table";
import BranchApiRespository from "../Library/BranchApiRespository";

interface Row {
  id: number;
  status: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default function AdminBranch() {
  const initState = {
    columns: [],
    data: []
  };
  const [state, setstate] = useState<TableState>(initState);
  useEffect(() => {
    const fetchData = async () => {
      const data = await BranchApiRespository.All();
      const header = await Object.keys(data[0]);

      const column: any = header.map((item: any) => {
        const itemTittle = item.toUpperCase().replace(/_/g, " ");
        let obj: any = {};

        if (item === "createdAt" || item === "updatedAt" || item === "id") {
          obj["hidden"] = true;
          obj["editable"] = "never";
        }

        obj["title"] = itemTittle;
        obj["field"] = item;

        return obj;
      });

      setstate({ columns: column, data: data });
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
                setstate((prevState: any) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  BranchApiRespository.save(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setstate(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    BranchApiRespository.save(newData);
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setstate(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  BranchApiRespository.delete(oldData.id);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    </>
  );
}
