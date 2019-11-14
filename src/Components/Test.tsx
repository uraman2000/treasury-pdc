import React from "react";
import { TextField, Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { Formik, Form, useFormik, FieldArray, Field } from "formik";
import IData from "./Interfaces/IData";

interface Props {
  tableData: IData[];
}
function Test(props: Props) {
  return (
    <div>
      <h1>Friend List</h1>
      <Formik
        enableReinitialize
        initialValues={props.tableData}
        onSubmit={values =>
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500)
        }
        render={({ values }) => (
          <Form>
            <FieldArray
              name="friends"
              render={arrayHelpers => (
                <div>
                  {values.map((friend, index) => (
                    <div key={index}>
                      <Field name={`[${index}]region`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))}
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      />
    </div>
  );
}

export default Test;
