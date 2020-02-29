import React from "react";
import { TextField, makeStyles, Container, Grid, Box, FormControl, InputLabel, Select } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";

const fields = [
  "id",
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
  "check_type_as_of_current_day",
  "date_deposited",
  "date_bounced",
  "date_re_deposited",
  "aging_redep",
  "check_re_deposit_status",
  "date_hold",
  "reason_for_hold_status",
  "hold_check_aging",
  "OR_number",
  "OR_date",
  "remarks"
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
  return (
    <Container maxWidth="sm">
      {fields.map(item => (
        <>
          <CustomTextField label={item} />
        </>
      ))}
    </Container>
  );

  // return (
  //   <Container maxWidth="lg">
  //     <form noValidate autoComplete="off">
  //       <Box display="flex" ml="54%">
  //         <InputLabel ref={null} htmlFor="outlined-age-native-simple">
  //           check number
  //         </InputLabel>
  //       </Box>
  //       <Box display="flex">
  //         <Grid container spacing={3}>
  //           <Grid item md={6}>
  //             <CustomTextField label="client_name" />
  //           </Grid>
  //           <Grid item md={3}>
  //             <CustomTextField label={"From"} type="number" />
  //           </Grid>
  //           <Grid item md={3}>
  //             <CustomTextField label={"To"} type="number" />
  //           </Grid>
  //         </Grid>
  //       </Box>
  //       <Box display="flex">
  //         <CustomSelect label={"region"} />
  //         <CustomSelect label={"branch"} />
  //         <CustomSelect label={"client_bank_name"} />
  //       </Box>
  //       <Box display="flex">
  //         <CustomTextField label="account_number" type="number" />
  //         <CustomTextField label="check_amount" type="number" />
  //         <CustomDateInput label={"check date "} />
  //       </Box>
  //       <Box display="flex">
  //         <Grid container spacing={3}>
  //           <Grid item md={6}>
  //             <CustomSelect label={"check_payee_name"} />
  //           </Grid>
  //           <Grid item md={2}>
  //             <CustomTextField label="client_check_status" />
  //           </Grid>
  //           <Grid item md={2}>
  //             <CustomTextField label="client_account_status " />
  //           </Grid>
  //           <Grid item md={2}>
  //             <CustomTextField label="check_deposit_status" />
  //           </Grid>
  //         </Grid>
  //       </Box>
  //       <Box display="flex">
  //         <CustomTextField label="reason_for_bounce_status" />
  //         <CustomTextField label="deposit_today" />
  //         <CustomTextField label="aging_undeposited" />
  //       </Box>
  //       <Box display="flex">
  //         <CustomTextField label="check_type_as_of_current_day" />
  //         <CustomTextField label="date_deposited" />
  //         <CustomTextField label="date_bounced" />
  //       </Box>
  //       <Box display="flex">
  //         <CustomTextField label="date_re_deposited" />
  //         <CustomTextField label="aging_redep" />
  //         <CustomTextField label="check_re_deposit_status" />
  //       </Box>
  //       <Box display="flex">
  //         <CustomTextField label="date_hold" />
  //         <CustomTextField label="reason_for_hold_status" />
  //       </Box>
  //       <Box display="flex">
  //         <CustomTextField label="hold_check_aging" />
  //         <CustomTextField label="OR_number" />
  //       </Box>
  //       <Box display="flex">
  //         <CustomTextField label="OR_date" />
  //         <CustomTextField label="remarks" />
  //       </Box>
  //     </form>
  //   </Container>
  // );
}

interface props {
  label: string;
  type?: string;
}

export function CustomTextField({ label, type }: props) {
  return (
    <TextField
      fullWidth
      id={label}
      label={label}
      margin="dense"
      variant="filled"
      type={type}
      style={{ margin: 8 }}
    />
  );
}
export function CustomSelect({ label }: props) {
  return (
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
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </FormControl>
  );
}

export function CustomDateInput({ label }: props) {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
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
  );
}
