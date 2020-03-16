import React, { useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import UserApiRespository from "../Library/UserApiRespository";
import RolesApiRepository from "../Library/RolesApiRepository";
import { TextField } from "@material-ui/core";
import RegionRepository from "../Library/RegionRepository";

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

export default function AdminUser() {
  const initState = {
    columns: [],
    data: []
  };
  const [state, setState] = React.useState<TableState>(initState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await UserApiRespository.get();
      console.log(data);
      const header = await Object.keys(data[0]);
      const role = await RolesApiRepository.getLookUp();
      const region = await RegionRepository.lookUp();

      const column: any = header.map((item: any) => {
        const itemTittle = item.toUpperCase().replace(/_/g, " ");
        let obj: any = {};

        if (item === "password") {
          obj["editComponent"] = (props: any) => (
            <TextField
              id="standard-password-input"
              type="password"
              autoComplete="current-password"
              margin="normal"
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
            />
          );
        }

        if (item === "createdAt" || item === "updatedAt" || item === "id") {
          obj["hidden"] = true;
          obj["editable"] = "never";
        }

        if (item === "role") {
          obj["lookup"] = role;
        }
        if (item === "region") {
          obj["lookup"] = region;
        }
        if (item === "status") {
          obj["lookup"] = { 1: "Pending", 2: "Active", 3: "Deactivate" };
        }

        obj["title"] = itemTittle;
        obj["field"] = item;

        return obj;
      });

      // const column: any = header.map(item => {
      //   if (item === "password") {
      //     return {
      //       title: item.toUpperCase(),
      //       field: item,
      //       editComponent: (props: any) => (
      //         // <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
      //         //   <input
      //         //     className="MuiInputBase-input MuiInput-input"
      //         //     type="password"
      //         //     value={props.value}
      //         //     onChange={e => props.onChange(e.target.value)}
      //         //   />
      //         // </div>
      //         <TextField
      //           id="standard-password-input"
      //           type="password"
      //           autoComplete="current-password"
      //           margin="normal"
      //           value={props.value}
      //           onChange={e => props.onChange(e.target.value)}
      //         />
      //       )
      //     };
      //   }

      //   if (item === "id") {
      //     return {
      //       title: item.toUpperCase(),
      //       field: item,
      //       editable: "never",
      //       hidden: true
      //     };
      //   }

      //   if (item === "role") {
      //     return {
      //       title: item.toUpperCase(),
      //       field: item,
      //       lookup: role
      //     };
      //   }
      //   if (item === "status") {
      //     return {
      //       title: capitalize(item),
      //       field: item,
      //       lookup: { 1: "Pending", 2: "Active", 3: "Deactivate" }
      //     };
      //   }

      //   return {
      //     title: item.toUpperCase(),
      //     field: item
      //   };
      // });

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
        options={{
          paging: false
        }}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState((prevState: any) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  UserApiRespository.save(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async resolve => {
              await UserApiRespository.patch(newData);
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  newData.password = "";
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
              resolve();
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
