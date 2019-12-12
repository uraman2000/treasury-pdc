import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SummaryApiRepository from "../Library/SummaryApiRepository";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const setHead = (state: any) => {};

export default function SummaryPerBranch() {
  const classes = useStyles();

  const [state, setstate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await setstate(await SummaryApiRepository.getSummaryPerBranch("1"));
    };
    fetchData();
  }, []);

  const items = (row: string) => {
    state[row].values.map((item: any, key: any) => {
      return (
        <div key={key}>
          <TableCell>{item.amount}</TableCell>
          <TableCell>{item.percentage}</TableCell>
        </div>
      );
    });
  };

  if (state) {
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">region</TableCell>
              <TableCell align="center" colSpan={10}>
                TYPE OF PDC
              </TableCell>
              <TableCell align="center" colSpan={17}>
                CHECK DEPOSIT STATUS
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BRANCH</TableCell>

              {state[state.entities[0]].client_check_status.values.map((element: any, key: any) => (
                <TableCell key={key} align="center" colSpan={4}>
                  {element.status}
                </TableCell>
              ))}

              <TableCell align="center">TOTAL PDC</TableCell>
              <TableCell align="center">TOTAL PDC</TableCell>

              {state[state.entities[0]].check_deposit_status.values.map((element: any, key: any) => (
                <TableCell key={key} align="center" colSpan={2}>
                  {element.status}
                </TableCell>
              ))}

              <TableCell align="center" colSpan={2} rowSpan={2}>
                Total Deposit
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              {state[state.entities[0]].client_check_status.values.map((element: any, key: any) => (
                <>
                  <TableCell align="center">Count</TableCell>
                  <TableCell align="center">%</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">%</TableCell>
                </>
              ))}
              <TableCell align="center">Count</TableCell>
              <TableCell align="center">Amount</TableCell>
              {state[state.entities[0]].check_deposit_status.values.map((element: any, key: any) => (
                <>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">%</TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.entities.map((row: any, key: any) => {
              const client_check_status = state[row].client_check_status;
              const check_deposit_status = state[row].check_deposit_status;
              return (
                <>
                  <TableRow key={key}>
                    <TableCell>{row}</TableCell>

                    {client_check_status.values.map((element: any, key: any) => (
                      <>
                        <TableCell align="right">{element.count}</TableCell>
                        <TableCell align="right">{element.countPercentage}</TableCell>
                        <TableCell align="right">{element.amount}</TableCell>
                        <TableCell align="right">{element.amountPercentage}</TableCell>
                      </>
                    ))}
                    <TableCell align="right">{client_check_status.totalCount}</TableCell>
                    <TableCell align="right">{client_check_status.totalDeposit}</TableCell>

                    {check_deposit_status.values.map((element: any, key: any) => (
                      <>
                        <TableCell align="right">{element.amount}</TableCell>
                        <TableCell align="right">{element.amountPercentage}</TableCell>
                      </>
                    ))}

                    <TableCell align="right">{state[row].check_deposit_status.totalDeposit}</TableCell>
                  </TableRow>
                </>
              );
            })}

            {generateGrandTotal(state)}
            {/* {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  return <div></div>;
}

const generateGrandTotal = (data: object) => {
  console.log(data);
};
