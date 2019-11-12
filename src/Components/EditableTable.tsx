import React, { useState } from "react";
import clsx from "clsx";
import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import EnhancedTableHead from "./TableHead";
import IHeadCells from "./Interfaces/IHeadCells";
import IData from "./Interfaces/IData";

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

type Order = "asc" | "desc";

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    title: {
      flex: "1 1 100%"
    }
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3)
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    tableWrapper: {
      overflowX: "auto"
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    },
    hoverCell: {
      "& td": {
        padding: "0px",
        "& input": {
          padding: "16px",
          cursor: "pointer",
          border: "none",
          "&:hover": {
            background: "rgba(0, 0, 0, 0.07)"
          }
        }
      }
    },
    fixCell: {
      position: "sticky"
    }
  })
);

interface IEditableTableProps {
  headCell: IHeadCells[];
  dataCell: IData[];
}

export default function EditableTable(props: IEditableTableProps) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IData>("check_deposit_status");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IData) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.dataCell.map(n => n.region); //
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.dataCell.length - page * rowsPerPage);

  const [state, setState] = useState({
    firstName: ""
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <EnhancedTableHead
              headCell={props.headCell}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.dataCell.length}
            />
            <TableBody>
              {stableSort(props.dataCell, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.name);

                  return (
                    <TableRow className={classes.hoverCell} tabIndex={-1} key={row.id}>
                      <TableCell align="right" id={row.id.toString()} scope="row">
                        <input type="text" value={row.id} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.region} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.branch_name} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.client_bank_name} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.check_date} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.check_number} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.check_amount} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.client_ID} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.client_account_status} />
                      </TableCell>
                      <TableCell align="right" className={classes.fixCell}>
                        <input type="text" value={row.client_check_status} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.check_payee_name} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.check_deposit_status} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.reason_for_bounce_status} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.deposit_today} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.aging_undeposited} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.check_type_as_of_current_day} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.date_bounced} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.date_re_deposited} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.aging_redep} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.check_re_deposit_status} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.date_hold} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.reason_for_hold_status} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.hold_check_aging} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.OR_number} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.OR_date} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="text" value={row.remarks} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.dataCell.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "previous page"
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
