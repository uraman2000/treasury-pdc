import React, { useEffect, useState } from "react";
import SummaryApiRepository from "../Library/SummaryApiRepository";
import { Paper, TableHead, TableRow, TableCell, Table, TableBody } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  card: {
    width: 275
  },
  root: {
    width: "100%",
    marginTop: 6,
    overflowX: "auto",
    marginBottom: 6
  },
  table: {
    minWidth: 250
  },
  totalRow: {
    "& td": {
      fontWeight: 500
    }
  }
});

export default function SummaryStatus(props: ISummaryProps) {
  const classes = useStyles();
  const [state, setstate] = useState<ISummaryStatusState>();

  useEffect(() => {
    const fetchData = async () => {
      await setstate(await SummaryApiRepository.getSummary(props.tableName));
    };
    fetchData();
  }, []);

  if (state) {
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>STATUS</TableCell>
              <TableCell>COUNT</TableCell>
              <TableCell>%</TableCell>
              <TableCell>AMOUNT</TableCell>
              <TableCell>%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.statusItem.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.countPercentage}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.amountPercentage}</TableCell>
              </TableRow>
            ))}
            <TableRow className={classes.totalRow}>
              <TableCell>TOTAL</TableCell>
              <TableCell>{state.totalCount}</TableCell>
              <TableCell>{state.totalCountPercent}</TableCell>
              <TableCell>{state.totalAmount}</TableCell>
              <TableCell>{state.totalAmountPercent}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
  return <div></div>;
}

interface ISummaryStatusState {
  totalCount: number;
  totalAmount: number;
  statusItem: any[];
  totalCountPercent: string;
  totalAmountPercent: string;
}

interface ISummaryProps {
  tableName: string;
}
