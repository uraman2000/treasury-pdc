import React, { useEffect, useState } from "react";
import MaterialTable, { Column } from "material-table";
import UserApiRespository from "../Library/UserApiRespository";
import StatusApiRespository from "../Library/StatusApiRespository";
import { array } from "prop-types";

interface Row {
  id: number;
  status: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

interface Iprops {
  tableName?: any;
}

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function AdminStatus(props: Iprops) {
  const initState = {
    columns: [],
    data: []
  };
  const [state, setState] = React.useState<TableState>(initState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await StatusApiRespository.All(props.tableName);
      const header = await Object.keys(data[0]);

      const column: any = header.map((item: any) => {
        if (item === "id") {
          return {
            title: item.toUpperCase(),
            field: item,
            editable: "never",
            hidden: true
          };
        }
        return {
          title: item.toUpperCase(),
          field: item
        };
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
        options={{
          paging: false
        }}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState((prevState: any) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  StatusApiRespository.Save(props.tableName, newData);
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
                    StatusApiRespository.Save(props.tableName, newData);
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
                  StatusApiRespository.delete(props.tableName, oldData.id);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    </>
  );
}
