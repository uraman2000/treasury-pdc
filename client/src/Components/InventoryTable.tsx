import React, { useState, useEffect } from "react";
import MaterialTable, { Column } from "material-table";
import IData from "./Interfaces/IData";
import InventoryApiRespository from "../Library/InventoryApiRespository";
import StatusApiRespository from "../Library/StatusApiRespository";
import { Fab, makeStyles, Theme, createStyles } from "@material-ui/core";
import { localDate, today, agingDate, getAccess, isAdmin } from "../utils";
import TableTextField from "./TableTextField";
import RolesApiRepository from "../Library/RolesApiRepository";
import RegionRepository from "../Library/RegionRepository";
import BranchApiRespository from "../Library/BranchApiRespository";
import BankApiRespository from "../Library/BankApiRespository";

import { baseUrl } from "../Constatnt";
import AddIcon from "@material-ui/icons/Add";

interface TableState {
  columns: Array<Column<IData>>;
  data: IData[];
}

var allStatus: any = [];
function deposit_today_logic(props: any) {
  const {
    check_amount,
    date_deposited,
    check_type_as_of_current_day,
    check_date,
    aging_undeposited,
    date_for_deposit_specific_day,
    check_deposit_status,
    date_hold
  } = props.rowData || props;

  console.log(props);

  const today = new Date().toLocaleDateString();
  let value = "";

  try {
    if (check_amount <= 0 || check_amount === "") {
      value = "";
    } else if (localDate(check_date) === today || localDate(date_for_deposit_specific_day) === today) {
      value = "FOR DEPOSIT-TODAY";
    } else if (date_deposited === "") {
      value = "DEPOSITED-UPDATE CHECK STATUS";
    } else if (allStatus["check_deposit_status"][check_deposit_status] !== "PDC") {
      value = allStatus["check_deposit_status"][check_deposit_status];
    } else if (check_type_as_of_current_day === "HOLD") {
      value = "UPDATE CHECK STATUS";
    } else if (aging_undeposited < 0) {
      value = "UNDEPOSITED-PDC";
    } else if (aging_undeposited === 0) {
      value = "UPDATE CHECK STATUS";
    } else if (date_hold === "" || date_hold === "0000-00-00") {
      value = "UPDATE CHECK STATUS";
    } else {
      value = "PDC";
    }
  } catch (error) {
    value = "PLS. CHECK";
    console.log(`deposit_today : ${error}`);
  }

  return value;
}

function agingUnDepositLogic(props: any) {
  let value = "";
  const { check_amount, date_deposited, check_date } = props.rowData || props;

  try {
    if (check_amount <= 0 || check_amount === "") {
      value = "";
    } else if (date_deposited === "" || date_deposited === "0000-00-00") {
      value = "0";
    } else {
      value = agingDate(localDate(check_date), today());
    }
  } catch (error) {
    value = "PLS. CHECK";
    console.log(`agingUnDeposit : ${error}`);
  }

  return value;
}

function agingReDepositLogic(props: any) {
  let value = "";
  const { date_bounced, date_re_deposited, check_deposit_status } = props.rowData || props;
  const BOUNCED = "2";
  try {
    if (date_bounced === "" || date_bounced === "0000-00-00") {
      value = "";
    } else if (date_re_deposited === "" || date_re_deposited === "0000-00-00") {
      value = agingDate(today(), date_bounced);
    } else if (
      allStatus["check_deposit_status"][check_deposit_status] === "BOUNCED" ||
      allStatus["check_deposit_status"][check_deposit_status] === "REDEPOSIT"
    ) {
      value = agingDate(localDate(date_re_deposited), localDate(date_bounced));
    }
  } catch (error) {
    value = "PLS. CHECK";
    console.log(`agingUnDeposit : ${error}`);
  }

  return value;
}

function check_type_as_of_current_day_logic(props: any) {
  let value = "";
  const { check_deposit_status, aging_undeposited } = props.rowData || props;

  try {
    if (allStatus["check_deposit_status"][check_deposit_status] === "HOLD") {
      value = "HOLD";
    } else if (aging_undeposited === "") {
      value = "";
    } else if (aging_undeposited < 0) {
      value = "DATED CHECK";
    } else if (aging_undeposited > 0) {
      value = "PDC";
    } else if (aging_undeposited === 0) {
      value = allStatus["check_deposit_status"][check_deposit_status];
    }
  } catch (error) {
    value = "PLS. CHECK";
    console.log(`agingUnDeposit : ${error}`);
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
    item === "date_deposited" ||
    item === "date_for_deposit_specific_day"
  ) {
    return "date";
  }

  if (
    item === "check_amount" ||
    item === "check_number" ||
    item === "account_number" ||
    item === "aging_undeposited"
  ) {
    return "numeric";
  }
}

function holdChecksAging(props: any) {
  let value = "";
  const { OR_number, date_hold } = props.rowData || props;
  console.log(date_hold !== "0000-00-00");

  if (OR_number > 0) {
    value = "";
  } else if (date_hold !== "0000-00-00") {
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

    if (item === "reason_for_hold_status_after_held_check") {
      obj["lookup"] = statuses["reason_for_hold_status"];
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

    if (item === "check_type_as_of_current_day") {
      obj["editComponent"] = (props: any) => {
        return <TableTextField props={props} value={check_type_as_of_current_day_logic(props)} />;
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
      allStatus = statuses;
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
