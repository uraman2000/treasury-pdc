import React, { useEffect, useState } from "react";
import {
  TextField,
  makeStyles,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress,
  Theme,
  createStyles
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import RegionRepository from "../Library/RegionRepository";
import BranchApiRespository from "../Library/BranchApiRespository";
import BankApiRespository from "../Library/BankApiRespository";
import StatusApiRespository from "../Library/StatusApiRespository";
import SaveIcon from "@material-ui/icons/Save";
import { Formik, Form, useField, FormikProps } from "formik";
import InventoryApiRespository from "../Library/InventoryApiRespository";
import CustomizedSnackbars from "./CustomizedSnackbars";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      position: "relative"
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    }
  })
);

interface Values {
  region: string;
  branch: string;
  client_bank_name: string;
  check_date: Date;
  check_number_from: string;
  check_number_to: string;
  check_amount: string;
  account_number: string;
  client_name: string;
  client_account_status: string;
  client_check_status: string;
  check_payee_name: string;
}

export default function InventoryBulk() {
  const classes = useStyles();
  const [state, setstate] = useState();
  const [resState, setResState] = useState({
    message: "",
    status: "",
    isShow: false
  });

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

  const initialValues: any = {
    region: "",
    branch: "",
    client_bank_name: "",
    check_date: new Date(),
    check_number_from: "",
    check_number_to: "",
    check_amount: "",
    account_number: "",
    client_name: "",
    client_account_status: "",
    client_check_status: "",
    check_payee_name: ""
  };
  if (!state) return null;

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          // alert(JSON.stringify(values, null, 2));
          // helpers.setValue(date!.toLocaleDateString());

          // alert(JSON.stringify(values, null, 2));
          const response = await InventoryApiRespository.saveInventoryBulk(values);

          actions.resetForm();
          setResState({
            message: response.data.message,
            status: response.status,
            isShow: true
          });
          setTimeout(() => {
            setResState({
              ...resState,
              isShow: false
            });
          }, 4000);
        }}
      >
        {(props: FormikProps<Values>) => (
          <Form>
            <CustomizedSnackbars message={resState.message} status={resState.status} isShow={resState.isShow} />

            <Grid container spacing={3}>
              <CustomTextField name={"check_number_from"} type="number" />
              <CustomTextField name={"check_number_to"} type="number" />
            </Grid>
            <Grid container spacing={3}>
              <CustomTextField name={"client_name"} type="text" />
            </Grid>
            <Grid container spacing={3}>
              <CustomSelect name={"region"} data={state.region} />
              <CustomSelect name={"branch"} data={state.branch} />
            </Grid>
            <Grid container spacing={3}>
              <CustomSelect name={"client_bank_name"} data={state.bank} />
              <CustomTextField name="account_number" type="number" />
              <CustomTextField name="check_amount" type="number" />
              <CustomDateInput name={"check_date"} />
              {/* <Field name="date" component={DatePickerField} /> */}
            </Grid>
            <Grid container spacing={3}>
              <CustomSelect name={"check_payee_name"} data={state.statuses.check_payee_name} />
              <CustomSelect name={"client_check_status"} data={state.statuses.client_check_status} />

              <CustomSelect name={"client_account_status"} data={state.statuses.client_account_status} />
              {/* <CustomSelect
             formik={formik}
             label={"check_deposit_status"}
             data={state.statuses.check_deposit_status}
           /> */}
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs>
                <div className={classes.button}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={props.isSubmitting}
                    size="large"
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                  {props.isSubmitting ? <CircularProgress size={24} className={classes.buttonProgress} /> : null}
                </div>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
interface props {
  formik?: any;
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  data?: any;
  props?: any;
}

export function CustomTextField({ ...props }: any) {
  const textLabel = props.name.replace(/_/g, " ").toUpperCase();

  const [field, meta, helpers] = useField(props);

  return (
    <Grid item xs>
      <TextField
        required
        label={textLabel}
        fullWidth
        {...field}
        {...props}
        margin="dense"
        variant="filled"
        style={{ margin: 8 }}
      />
    </Grid>
  );
}
export function CustomSelect({ data, ...props }: any) {
  const textLabel = props.name.replace(/_/g, " ").toUpperCase();
  const [field, meta, helpers] = useField(props);

  return (
    <Grid item xs>
      <FormControl required fullWidth style={{ margin: 8 }} variant="filled" margin="dense">
        <InputLabel ref={null} htmlFor="outlined-age-native-simple">
          {textLabel}
        </InputLabel>
        <Select native {...field}>
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
// interface dateprops {
//   field: any;
//   form: any;
// }

export function CustomDateInput({ ...props }: any) {
  const textLabel = props.name.replace(/_/g, " ").toUpperCase();
  const [field, meta, helpers] = useField(props);

  return (
    <Grid item xs>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/* <Field name={label} component={DatePicker} /> */}
        <KeyboardDatePicker
          disableToolbar
          required
          autoOk
          fullWidth
          margin="dense"
          variant="inline"
          format="MM/dd/yyyy"
          placeholder="mm/dd/yyyy"
          style={{ margin: 8 }}
          onChange={date => {
            helpers.setValue(date);
          }}
          value={field.value}
          label={textLabel}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          // {...field}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
