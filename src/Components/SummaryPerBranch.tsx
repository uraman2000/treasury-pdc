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

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

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
      //   console.log(item.amount);

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
              <TableCell>BRANCH</TableCell>
              <TableCell align="center" colSpan={2}>
                CLEARED
              </TableCell>
              <TableCell align="center" colSpan={2}>
                BOUNCED
              </TableCell>
              <TableCell align="center" colSpan={2}>
                FOR DEPOSIT-TODAY
              </TableCell>
              <TableCell align="center" colSpan={2}>
                HOLD
              </TableCell>
              <TableCell align="center" colSpan={2}>
                PDC
              </TableCell>
              <TableCell align="center" colSpan={2}>
                UNDEPOSITED-PDC
              </TableCell>
              <TableCell align="center" colSpan={2}>
                CHANGE CDS
              </TableCell>
              <TableCell align="center" colSpan={2}>
                REDEPOSIT
              </TableCell>
              <TableCell align="center" colSpan={2} rowSpan={2}>
                Total Deposit
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>

              <TableCell>Amount</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.entities.map((row: any) => {
              return (
                <>
                  <TableRow key={row}>
                    <TableCell>{row}</TableCell>
                    {state[row].values.map((item: any, key: any) => {
                      return (
                        <>
                          <TableCell>{item.amount}</TableCell>
                          <TableCell>{item.percentage}</TableCell>
                        </>
                      );
                    })}
                    <TableCell>{state[row].totalDeposit}</TableCell>
                  </TableRow>
                </>
              );
            })}

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
