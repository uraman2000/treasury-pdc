import React from "react";
import { TextField, Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { Formik, Form, useFormik } from "formik";
import IData from "./Interfaces/IData";

interface Props {
  tableData: IData[];
}
function Test(props: Props) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: props.tableData,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
      
    }
  });
  return (
    <div>
      {console.log(formik.values)}

      <form onSubmit={formik.handleSubmit}>
        <Table aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
          <TableBody>
            {formik.values.map((row, index) => {
              return (
                <TableRow tabIndex={-1} key={row.id}>
                  <TableCell align="right">
                    <TextField
                      name={`${row.id}client_account_status`}
                      type="text"
                      onChange={formik.handleChange}
                      value={row.client_account_status}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      name={`[${index}]client_check_status`}
                      type="text"
                      onChange={formik.handleChange}
                      value={row.client_check_status}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      id="check_deposit_status"
                      name="check_deposit_status"
                      type="text"
                      onChange={formik.handleChange}
                      value={row.check_deposit_status}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <button type="submit">Submit</button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </form>
    </div>
  );
}

export default Test;
