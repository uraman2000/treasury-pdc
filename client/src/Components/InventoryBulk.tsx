import React from "react";
import { TextField, makeStyles, Container, Grid, Box, FormControl, InputLabel, Select } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
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
    <Container maxWidth="md">
      <form noValidate autoComplete="off">
        <Box display="flex" ml="50%">
          <InputLabel ref={null} htmlFor="outlined-age-native-simple">
            check number
          </InputLabel>
        </Box>
        <Box display="flex" ml="50%">
          <CustomTextField label={"From"} type="number" />
          <CustomTextField label={"To"} type="number" />
        </Box>
        <Box display="flex">
          <CustomSelect label={"region"} />
          <CustomSelect label={"branch"} />
        </Box>
        <Box display="flex">
          <CustomSelect label={"client_bank_name"} />
          <CustomDateInput label={"check date "} />
        </Box>
        <Box display="flex">
          <CustomTextField label="check_amount" />
          <CustomTextField label="account_number" />
        </Box>
        <Box display="flex">
          <CustomTextField label="client_name" />
          <CustomTextField label="client_account_status " />
        </Box>
        <Box display="flex">
          <CustomTextField label="client_check_status" />
          <CustomTextField label="check_payee_name" />
        </Box>
        <Box display="flex">
          <CustomTextField label="check_deposit_status" />
          <CustomTextField label="reason_for_bounce_status" />
        </Box>
        <Box display="flex">
          <CustomTextField label="deposit_today" />
          <CustomTextField label="aging_undeposited" />
        </Box>
        <Box display="flex">
          <CustomTextField label="check_type_as_of_current_day" />
          <CustomTextField label="date_deposited" />
        </Box>
        <Box display="flex">
          <CustomTextField label="date_bounced" />
          <CustomTextField label="date_re_deposited" />
        </Box>
        <Box display="flex">
          <CustomTextField label="aging_redep" />
          <CustomTextField label="check_re_deposit_status" />
        </Box>
        <Box display="flex">
          <CustomTextField label="date_hold" />
          <CustomTextField label="reason_for_hold_status" />
        </Box>
        <Box display="flex">
          <CustomTextField label="hold_check_aging" />
          <CustomTextField label="OR_number" />
        </Box>
        <Box display="flex">
          <CustomTextField label="OR_date" />
          <CustomTextField label="remarks" />
        </Box>
      </form>
    </Container>
  );
}

interface props {
  label: string;
  type?: string;
}

export function CustomTextField({ label, type }: props) {
  return <TextField fullWidth id={label} label={label} variant="filled" type={type} style={{ margin: 8 }} />;
}
export function CustomSelect({ label }: props) {
  return (
    <FormControl fullWidth style={{ margin: 8 }} variant="filled">
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
