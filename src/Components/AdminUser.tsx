import React, { useEffect, useState } from "react";
import MaterialTable, { Column } from "material-table";
import UserApiRespository from "../Library/UserApiRespository";
import { getAccess } from "../utils";
import { TextField } from "@material-ui/core";

interface Row {
  id: number;
  username: string;
  password: string;
  role: string;
  status: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function AdminUser() {
  const initState = {
    columns: [],
    data: []
  };
  const [state, setState] = React.useState<TableState>(initState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await UserApiRespository.get();
      const header = await Object.keys(data[0]);

      const column: any = header.map(item => {
        if (item === "password") {
          return {
            title: item.toUpperCase(),
            field: item,
            editComponent: (props: any) => (
              // <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
              //   <input
              //     className="MuiInputBase-input MuiInput-input"
              //     type="password"
              //     value={props.value}
              //     onChange={e => props.onChange(e.target.value)}
              //   />
              // </div>
              <TextField
                id="standard-password-input"
                type="password"
                autoComplete="current-password"
                margin="normal"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
              />
            )
          };
        }

        if (item === "id") {
          return {
            title: item.toUpperCase(),
            field: item,
            editable: "never"
          };
        }
        if (item === "status") {
          return {
            title: capitalize(item),
            field: item,
            lookup: { 1: "Pending", 2: "Active", 3: "Deactivate" }
          };
        }

        return {
          title: item.toUpperCase(),
          field: item
        };
      });

      setState({ columns: column, data: data });

      // await setheader(Object.keys(user[0]));
    };
    fetchData();
  }, []);

  return (
    <>
      <MaterialTable
        title="Users"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    UserApiRespository.save(newData);
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
                  UserApiRespository.delete(oldData.id);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    </>
  );
}
