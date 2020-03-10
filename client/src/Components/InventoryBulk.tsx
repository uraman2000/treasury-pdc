import React, { useEffect, useState } from "react";
import {
  TextField,
  makeStyles,
  Container,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  Button
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import RegionRepository from "../Library/RegionRepository";
import BranchApiRespository from "../Library/BranchApiRespository";
import BankApiRespository from "../Library/BankApiRespository";
import StatusApiRespository from "../Library/StatusApiRespository";
import SaveIcon from "@material-ui/icons/Save";
import { useFormik, Field } from "formik";

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
  const formik = useFormik({
    initialValues: {
      check_date: "",
      password: ""
    },
    onSubmit: values => {}
  });

  if (!state) return null;
  console.log(formik.values);

  return (
    <Container maxWidth="md">
      <form noValidate autoComplete="off" action={""} onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <CustomTextField formik={formik} label="client_name" />
        </Grid>
        <Grid container spacing={3}>
          <CustomTextField formik={formik} label={"check_number_from"} type="number" />
          <CustomTextField formik={formik} label={"check_number_to"} type="number" />
        </Grid>
        <Grid container spacing={3}>
          <CustomSelect formik={formik} label={"region"} data={state.region} />
          <CustomSelect formik={formik} label={"branch"} data={state.branch} />
        </Grid>
        <Grid container spacing={3}>
          <CustomSelect formik={formik} label={"client_bank_name"} data={state.bank} />
          <CustomTextField formik={formik} label="account_number" type="number" />
          <CustomTextField formik={formik} label="check_amount" type="number" />
          <CustomDateInput formik={formik} label={"check_date"} />
          {/* <Field name="date" component={DatePickerField} /> */}
        </Grid>
        <Grid container spacing={3}>
          <CustomSelect formik={formik} label={"check_payee_name"} data={state.statuses.check_payee_name} />
          <CustomSelect formik={formik} label={"client_check_status"} data={state.statuses.client_check_status} />
          <CustomSelect
            formik={formik}
            label={"client_account_status"}
            data={state.statuses.client_account_status}
          />
          <CustomSelect
            formik={formik}
            label={"check_deposit_status"}
            data={state.statuses.check_deposit_status}
          />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
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
  formik: any;
  label: string;
  type?: string;
  placeholder?: string;
  data?: any;
}

export function CustomTextField({ formik, label, type, placeholder }: props) {
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
        onChange={formik.handleChange}
        value={formik.values.label}
      />
    </Grid>
  );
}
export function CustomSelect({ formik, label, data }: props) {
  // for (let [key, value] of Object.entries(data)) {
  //   console.log(`${key}: ${value}`);
  // }
  // array.forEach(element => {

  // });

  return (
    <Grid item xs>
      <FormControl fullWidth style={{ margin: 8 }} variant="filled" margin="dense">
        <InputLabel ref={null} htmlFor="outlined-age-native-simple">
          {label}
        </InputLabel>
        <Select
          native
          onChange={formik.handleChange}
          value={formik.values.label}
          inputProps={{
            id: label
          }}
        >
          <option value="" />
          {Object.entries(data).map(([key, item]: any) => {
            return (
              <option key={key} value={key}>
                {item}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
}
interface dateprops {
  field: any;
  form: any;
}

export function CustomDateInput({ formik, label }: props) {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    formik.setFieldValue(label, date);
  };

  return (
    <Grid item xs>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/* <Field name={label} component={DatePicker} /> */}
        <KeyboardDatePicker
          disableToolbar
          autoOk
          fullWidth
          margin="dense"
          variant="inline"
          format="MM/dd/yyyy"
          placeholder="mm/dd/yyyy"
          style={{ margin: 8 }}
          id={label}
          label={label}
          onChange={handleDateChange}
          value={selectedDate}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
