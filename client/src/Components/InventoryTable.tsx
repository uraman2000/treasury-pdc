import React, { useState, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import IData from "./Interfaces/IData";
import InventoryApiRespository from "../Library/InventoryApiRespository";
import StatusApiRespository from "../Library/StatusApiRespository";
import { async } from "q";
import { TextField, Container, Button, Box, Fab, makeStyles, Theme, createStyles } from "@material-ui/core";
import { localDate, today, agingDate, getAccess, isAdmin } from "../utils";
import TableTextField from "./TableTextField";
import RolesApiRepository from "../Library/RolesApiRepository";
import RegionRepository from "../Library/RegionRepository";
import BranchApiRespository from "../Library/BranchApiRespository";
import BankApiRespository from "../Library/BankApiRespository";
import HandleToken from "../Library/HandleToken";
import Axios from "axios";
import { baseUrl } from "../Constatnt";
import AddIcon from "@material-ui/icons/Add";

interface TableState {
  columns: Array<Column<IData>>;
  data: IData[];
}

function deposit_today_logic(props: any) {
  const { check_amount, date_deposited, check_type_as_of_current_day, check_date, aging_undeposited } =
    props.rowData || props;
  const today = new Date().toLocaleDateString();
  let value = "";

  if (check_amount <= 0) {
    value = "";
  } else if (date_deposited == "") {
    value = "REFER: CHECK DEPOSIT STATUS";
  } else if (check_type_as_of_current_day === "HOLD") {
    value = "REFER: CHECK DEPOSIT STATUS";
  } else if (localDate(check_date) === today) {
    value = "FOR DEPOSIT-TODAY";
  } else if (aging_undeposited < 0) {
    value = "UNDEPOSITED-PDC";
  } else if (aging_undeposited === 0) {
    value = "CHANGE CDS";
  } else {
    value = "PDC";
  }

  return value;
}

function agingUnDepositLogic(props: any) {
  let value = "";
  const { check_amount, date_deposited, check_date } = props.rowData || props;

  if (check_amount <= 0) {
    value = "";
  } else if (date_deposited === "") {
    value = "0";
  } else {
    value = agingDate(localDate(check_date), today());
  }
  if (value === "NaN") {
    value = "PLS. CHECK";
  }
  return value;
}

function agingReDepositLogic(props: any) {
  let value = "";
  const { date_bounced, date_re_deposited, check_deposit_status } = props.rowData || props;
  const BOUNCED = "2";

  if (date_bounced === "") {
    value = "";
  } else if (date_re_deposited === "") {
    value = agingDate(today(), date_bounced);
  } else if (check_deposit_status === BOUNCED) {
    value = agingDate(localDate(date_re_deposited), localDate(date_bounced));
  }

  return value;
}

function lookUpLogic(item: any, statuses: any) {
  if (
    item === "client_account_status" ||
    item === "client_check_status" ||
    item === "check_payee_name" ||
    item === "check_deposit_status" ||
    item === "reason_for_bounce_status" ||
    item === "check_re_deposit_status" ||
    item === "reason_for_hold_status"
  ) {
    return statuses[item];
  }
}

function typeLogic(item: any) {
  if (
    item === "check_date" ||
    item === "date_bounced" ||
    item === "date_re_deposited" ||
    item === "date_hold" ||
    item === "OR_date" ||
    item === "date_deposited"
  ) {
    return "date";
  }

  if (item === "check_amount" || item === "check_number" || item === "account_number") {
    return "numeric";
  }
}

function holdChecksAging(props: any) {
  let value = "";
  const { OR_number, date_hold } = props.rowData || props;

  if (OR_number > 0) {
    value = "";
  } else if (date_hold) {
    value = agingDate(today(), localDate(date_hold));
  }

  return value;
}

function column(headData: any, statuses: any, roles: any, regionLookup: any, branchLookup: any, bankLookup: any) {
  const column: any = headData.map((item: any) => {
    const itemTittle = item.toUpperCase().replace(/_/g, " ");
    let obj: any = {};
    obj["lookup"] = lookUpLogic(item, statuses);

    if (item === "region") {
      obj["lookup"] = regionLookup;
    }
    if (item === "branch") {
      obj["lookup"] = branchLookup;
    }
    if (item === "client_bank_name" || item === "bank_deposited") {
      obj["lookup"] = bankLookup;
    }

    obj["type"] = typeLogic(item);
    if (item === "id") {
      obj["editable"] = "never";
      obj["defaultSort"] = "asc";
      // obj["hidden"] = true;
    }

    if (roles.access[item] === false) {
      obj["editable"] = "never";
    }

    if (item === "deposit_today") {
      obj["editComponent"] = (props: any) => {
        return <TableTextField props={props} value={deposit_today_logic(props)} />;
      };
    }

    if (item === "aging_undeposited") {
      obj["editComponent"] = (props: any) => {
        return <TableTextField props={props} value={agingUnDepositLogic(props)} />;
      };
    }
    if (item === "aging_redep") {
      obj["editComponent"] = (props: any) => {
        return <TableTextField props={props} value={agingReDepositLogic(props)} />;
      };
    }
    if (item === "hold_check_aging") {
      obj["editComponent"] = (props: any) => {
        return <TableTextField props={props} value={holdChecksAging(props)} />;
      };
    }
    obj["title"] = itemTittle;
    obj["field"] = item;
    if (item === "client_name") {
      obj["customFilterAndSearch"] = () => {};
    }
    obj["headerStyle"] = {
      whiteSpace: "nowrap"
    };
    obj["cellStyle"] = {
      whiteSpace: "nowrap"
    };

    return obj;
  });

  return column;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      top: theme.spacing(9),
      right: theme.spacing(2),
      margin: theme.spacing(1)
    },
    table: {
      marginTop: theme.spacing(5)
    }
  })
);

export default function InventoryTable() {
  const classes = useStyles();
  const initState = {
    columns: [],
    data: []
  };

  const [state, setState] = useState<TableState>(initState);

  useEffect(() => {
    const fetchData = async () => {
      const statuses = await StatusApiRespository.allStatus();
      const regionLookup = await RegionRepository.lookUp();
      const data = await InventoryApiRespository.getColumnNames();
      const role = await RolesApiRepository.getOne(getAccess().role);
      const branchLookup = await BranchApiRespository.lookUp();
      const bankLookup = await BankApiRespository.lookUp();

      const header = await Object.keys(data);

      const columns = column(header, statuses, role, regionLookup, branchLookup, bankLookup);

      setState({ columns: columns, data: data });
    };
    fetchData();
  }, []);
  const tableRef: any = React.createRef();
  return (
    <>
      <div className={classes.table}>
        <MaterialTable
          title=""
          columns={state.columns}
          tableRef={tableRef}
          // onSearchChange={e => console.log(e)}
          data={(query: any) =>
            new Promise(async (resolve, reject) => {
              let url = `${baseUrl}/inventory/paginate`;
              url += "?page=" + (query.page + 1);
              url += "&limit=" + query.pageSize;
              // url += "&search=" + query.search;
              const region = isAdmin() ? null : getAccess().region;
              url += "&region=" + region;

              const filters = query.filters;

              fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  access_token: getAccess().access_token || ""
                },
                body: JSON.stringify(filters)
              })
                .then(response => response.json())
                .then(result => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.total
                  });
                });
            })
          }
          actions={[
            {
              icon: "refresh",
              tooltip: "Refresh Data",
              isFreeAction: true,
              onClick: () => tableRef.current && tableRef.current.onQueryChange()
            }
          ]}
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 20, 30, 40, 50],
            loadingType: "overlay",
            sorting: false,
            filtering: true,
            search: false,
            addRowPosition: "first",
            doubleHorizontalScroll: false,
            // maxBodyHeight: 600,
            debounceInterval: 1000
          }}
          editable={{
            onRowAdd: newData =>
              new Promise(async resolve => {
                await InventoryApiRespository.saveInventory(newData);
                tableRef.current.onQueryChange();
                resolve();
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(async resolve => {
                if (oldData) {
                  newData["deposit_today"] = deposit_today_logic(newData);
                  newData["aging_undeposited"] = agingUnDepositLogic(newData);
                  newData["aging_redep"] = agingReDepositLogic(newData);
                  newData["hold_check_aging"] = Number(holdChecksAging(newData));
                  await InventoryApiRespository.saveInventory(newData);
                  tableRef.current.onQueryChange();
                }
                resolve();
              }),
            onRowDelete: oldData =>
              new Promise(async resolve => {
                await InventoryApiRespository.deleteInventory(oldData.id);
                resolve();
                tableRef.current.onQueryChange();
              })
          }}
        />
      </div>
      <Fab
        href="inventory/bulk"
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
        className={classes.fab}
      >
        <AddIcon /> bulk Insert
      </Fab>
    </>
  );
}
