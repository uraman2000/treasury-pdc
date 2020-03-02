import React, { useEffect, useState } from "react";
import { TextField, makeStyles, Container, Grid, Box, FormControl, InputLabel, Select } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import RegionRepository from "../Library/RegionRepository";
import BranchApiRespository from "../Library/BranchApiRespository";
import BankApiRespository from "../Library/BankApiRespository";
import StatusApiRespository from "../Library/StatusApiRespository";

const fields = [
  "region",
  "branch",
  "client_bank_name",
  "check_date",
  "check_number",
  "check_amount",
  "account_number",
  "client_name",
  "client_account_status",
  "client_check_status",
  "check_payee_name",
  "check_deposit_status",
  "reason_for_bounce_status",
  "deposit_today",
  "aging_undeposited",
  "check_type_as_of_current_day"
  // "date_deposited",
  // "date_bounced",
  // "date_re_deposited",
  // "aging_redep",
  // "check_re_deposit_status",
  // "date_hold",
  // "reason_for_hold_status",
  // "hold_check_aging",
  // "OR_number",
  // "OR_date",
  // "remarks"
];

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function InventoryBulk() {
  const classes = useStyles();
  const [state, setstate] = useState();
  // { region: [], branch: [], bank: [], statuses: [] }
  useEffect(() => {
    const fetchData = async () => {
      const regionLookup = await RegionRepository.lookUp();
      const branchLookup = await BranchApiRespository.lookUp();
      const bankLookup = await BankApiRespository.lookUp();
      const statuses = await StatusApiRespository.allStatus();
      setstate({
        region: regionLookup,
        branch: branchLookup,
        bank: bankLookup,
        statuses: statuses
      });
    };
    fetchData();
  }, []);

  if (!state) return null;

  return (
    <Container maxWidth="md">
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <CustomTextField label="client_name" />
          <CustomTextField placeholder="From" label={"check number"} type="number" />
          <CustomTextField placeholder="To" label={"check number"} type="number" />
        </Grid>
        <Grid container spacing={3}>
          <CustomSelect label={"region"} data={state.region} />
          {/* <CustomSelect label={"branch"} />

          <CustomSelect label={"client_bank_name"} /> */}
        </Grid>
        <Grid container spacing={3}>
          <CustomTextField label="account_number" type="number" />
          <CustomTextField label="check_amount" type="number" />
          <CustomDateInput label={"check date "} />
        </Grid>
        <Grid container spacing={3}>
          {/* <CustomSelect label={"check_payee_name"} />
          <CustomSelect label={"client_check_status"} />
          <CustomSelect label={"client_account_status"} />
          <CustomSelect label={"check_deposit_status"} /> */}
        </Grid>
      </form>
    </Container>
  );

  //   return (
  //     <Container maxWidth="lg">
  //       <form noValidate autoComplete="off">
  //         <Box display="flex" ml="54%">
  //           <InputLabel ref={null} htmlFor="outlined-age-native-simple">
  //             check number
  //           </InputLabel>
  //         </Box>
  //         <Box display="flex">
  //           <Grid container spacing={3}>
  //             <Grid item md={6}>
  //               <CustomTextField label="client_name" />
  //             </Grid>
  //             <Grid item md={3}>
  //               <CustomTextField label={"From"} type="number" />
  //             </Grid>
  //             <Grid item md={3}>
  //               <CustomTextField label={"To"} type="number" />
  //             </Grid>
  //           </Grid>
  //         </Box>
  //         <Box display="flex">
  //           <CustomSelect label={"region"} />
  //           <CustomSelect label={"branch"} />
  //           <CustomSelect label={"client_bank_name"} />
  //         </Box>
  //         <Box display="flex">
  //           <CustomTextField label="account_number" type="number" />
  //           <CustomTextField label="check_amount" type="number" />
  //           <CustomDateInput label={"check date "} />
  //         </Box>
  //         <Box display="flex">
  //           <Grid container spacing={3}>
  //             <Grid item md={3}>
  //               <CustomSelect label={"check_payee_name"} />
  //             </Grid>
  //             <Grid item md={3}>
  //               <CustomTextField label="client_check_status" />
  //             </Grid>

  //             <Grid item md={3}>
  //               <CustomTextField label="client_account_status " />
  //             </Grid>
  //             <Grid item md={3}>
  //               <CustomTextField label="check_deposit_status" />
  //             </Grid>
  //           </Grid>
  //         </Box>
  //         {/* <Box display="flex">
  //             <CustomTextField label="reason_for_bounce_status" />
  //             <CustomTextField label="deposit_today" />
  //             <CustomTextField label="aging_undeposited" />
  //           </Box>
  //           <Box display="flex">
  //             <CustomTextField label="check_type_as_of_current_day" />
  //           </Box> */}
  //       </form>
  //     </Container>
  //   );
  // }
}
interface props {
  label: string;
  type?: string;
  placeholder?: string;
  data?: any;
}

export function CustomTextField({ label, type, placeholder }: props) {
  return (
    <Grid item xs>
      <TextField
        fullWidth
        id={label}
        label={label}
        placeholder={placeholder}
        margin="dense"
        variant="filled"
        type={type}
        style={{ margin: 8 }}
      />
    </Grid>
  );
}
export function CustomSelect({ label, data }: props) {
  return (
    <Grid item xs>
      <FormControl fullWidth style={{ margin: 8 }} variant="filled" margin="dense">
        <InputLabel ref={null} htmlFor="outlined-age-native-simple">
          {label}
        </InputLabel>
        <Select
          native
          // value={state.age}
          // onChange={handleChange("age")}
          // labelWidth={labelWidth}
          inputProps={{
            name: "age",
            id: "outlined-age-native-simple"
          }}
        >
          <option value="" />
          {console.log(data)}

          {data.map((item: any, key: any) => {
            return (
              <option key={key} value={10}>
                {item}
              </option>
            );
          })}
          {/* {data.map((item: any, key: any) => (
            <option key={key} value={10}>
              {item}
            </option>
          ))} */}

          {/* <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option> */}
        </Select>
      </FormControl>
    </Grid>
  );
}

export function CustomDateInput({ label }: props) {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <Grid item xs>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          fullWidth
          margin="dense"
          variant="inline"
          format="MM/dd/yyyy"
          placeholder="mm/dd/yyyy"
          style={{ margin: 8 }}
          id={label}
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
