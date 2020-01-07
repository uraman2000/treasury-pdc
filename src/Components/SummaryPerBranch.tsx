import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SummaryApiRepository from "../Library/SummaryApiRepository";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Container, Box } from "@material-ui/core";
import RegionRepository from "../Library/RegionRepository";
import RegionSelector from "./RegionSelector";
// borderLeft : border-right: 1px solid rgba(224, 224, 224, 1);
// border-left: 1px solid rgba(224, 224, 224, 1);
const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  formControl: {
    margin: 10,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: 2
  },
  borderLeft: {
    borderLeft: "1px solid rgba(224, 224, 224, 1)"
  },
  borderRight: {
    borderRight: "1px solid rgba(224, 224, 224, 1)"
  },
  borderLeftRight: {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    borderLeft: "1px solid rgba(224, 224, 224, 1)"
  },
  paper: {
    // width: "fit-content"
  }
});

const getTableHeader = (status: any, numberOfColSpan: number, classes: any) => {
  return status.values.map((value: any, key: any) => (
    <TableCell key={key} align="center" colSpan={numberOfColSpan} className={classes.borderLeftRight}>
      {value.status}
    </TableCell>
  ));
};

const getCountAmountHeader = (status: any, isWithCount: boolean, classes: any) => {
  const rowLen = status.values.length - 1;

  return status.values.map((element: any, key: any) => {
    const cellValues = ["Count", "%", "Amount", "%"];

    if (!isWithCount) {
      cellValues.splice(0, 2);
    }
    const cellLength = cellValues.length - 1;
    return cellValues.map((item: any, index: any) => (
      <TableCell
        align="center"
        className={
          index === 0 ? classes.borderLeft : key === rowLen && index === cellLength ? classes.borderRight : ""
        }
      >
        {item}
      </TableCell>
    ));
  });
};

const getTableBodyStatusValue = (statusValue: any, isWithCount: boolean, classes: any) => {
  const rowLen = statusValue.length - 1;

  return statusValue.map((value: any, key: any) => (
    <>
      {isWithCount ? (
        <>
          <TableCell align="right" className={classes.borderLeft}>
            {value.count}
          </TableCell>
          <TableCell align="right">{value.countPercentage}</TableCell>
          <TableCell align="right">{value.amount}</TableCell>
          <TableCell align="right" className={rowLen === key ? classes.borderRight : ""}>
            {value.amountPercentage}
          </TableCell>
        </>
      ) : (
        <>
          <TableCell align="right" className={classes.borderLeft}>
            {value.amount}
          </TableCell>
          <TableCell align="right" className={rowLen === key ? classes.borderRight : ""}>
            {value.amountPercentage}
          </TableCell>
        </>
      )}
    </>
  ));
};

export default function SummaryPerBranch() {
  const classes = useStyles();

  const [state, setstate] = useState();

  const populateTable = async (value: any) => {
    const tableData = await SummaryApiRepository.getSummaryPerBranch(value);
    setstate(tableData);
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        <RegionSelector callback={populateTable} />
        {!state ? null : (
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center" colSpan={10} className={classes.borderLeftRight}>
                  TYPE OF PDC
                </TableCell>
                <TableCell align="center" colSpan={20} className={classes.borderLeftRight}>
                  CHECK DEPOSIT STATUS
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell rowSpan={2}>BRANCH</TableCell>
                {getTableHeader(state[0].client_check_status, 4, classes)}
                <TableCell align="center">TOTAL PDC</TableCell>
                <TableCell align="center">TOTAL PDC</TableCell>

                {getTableHeader(state[0].check_deposit_status, 2, classes)}
                <TableCell align="center" colSpan={2} rowSpan={2}>
                  Total Deposit
                </TableCell>
              </TableRow>
              <TableRow>
                {getCountAmountHeader(state[0].client_check_status, true, classes)}
                <TableCell align="center">Count</TableCell>
                <TableCell align="center">Amount</TableCell>
                {getCountAmountHeader(state[0].check_deposit_status, false, classes)}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.map((item: any, key: any) => {
                return (
                  <TableRow key={key}>
                    <TableCell>{item.branch_name}</TableCell>
                    {getTableBodyStatusValue(item.client_check_status.values, true, classes)}
                    <TableCell align="right">{item.client_check_status.totalCount}</TableCell>
                    <TableCell align="right">{item.client_check_status.totalDeposit}</TableCell>
                    {getTableBodyStatusValue(item.check_deposit_status.values, false, classes)}
                    <TableCell align="right">{item.check_deposit_status.totalDeposit}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}

const generateGrandTotal = (data: object) => {
  console.log(data);
};
