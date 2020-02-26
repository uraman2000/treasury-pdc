import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import SummaryApiRepository from "../Library/SummaryApiRepository";
import RegionSelector from "./RegionSelector";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const tableHead = () => {
  const headData = [
    "BRANCH NAME",
    "CLIENT BANK NAME",
    "CHECK DATE",
    "CHECK NUMBER",
    "CHECK AMOUNT",
    "ACCOUNT NUMBER",
    "CLIENT NAME",
    "CLIENT ACCOUNT STATUS",
    "DATE HOLD",
    "REASON FOR HOLD",
    "HOLD CHECKS AGING (IN DAYS)"
  ];

  return headData.map((item: string, key: any) => (
    <TableCell key={key} align={"center"}>
      {item}
    </TableCell>
  ));
};

const data = (state: any) => {
  return state.map((item: any, key: any) => (
    <TableRow key={key}>
      <TableCell align="center">{item.branch_name}</TableCell>
      <TableCell align="center">{item.client_account_status}</TableCell>
      <TableCell align="center">{item.client_bank_name}</TableCell>
      <TableCell align="center">{item.check_date}</TableCell>
      <TableCell align="center">{item.check_number}</TableCell>
      <TableCell align="center">{item.check_amount}</TableCell>
      <TableCell align="center">{item.account_number}</TableCell>
      <TableCell align="center">{item.client_name}</TableCell>
      <TableCell align="center">{item.date_hold}</TableCell>
      <TableCell align="center">{item.reason_for_hold_status}</TableCell>
      <TableCell align="center">{item.hold_check_aging}</TableCell>
    </TableRow>
  ));
};

export default function Report() {
  const classes = useStyles();
  const [state, setState] = useState();

  const populateTable = async (value: any) => {
    const tableData = await SummaryApiRepository.getSummaryReport(value);
    setState(tableData);
  };

  return (
    <Container>
      <Paper>
        <RegionSelector callback={populateTable} />
        {!state ? null : (
          <Table>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>{tableHead()}</TableRow>
              </TableHead>
              <TableBody>{data(state)}</TableBody>
            </Table>
          </Table>
        )}
      </Paper>
    </Container>
  );
}
