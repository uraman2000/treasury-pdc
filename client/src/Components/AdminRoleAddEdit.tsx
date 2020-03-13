import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Switch from "@material-ui/core/Switch";
import {
  Container,
  Paper,
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Button,
  TextField,
  Divider,
  FormControlLabel
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import RolesApiRepository from "../Library/RolesApiRepository";
import CustomNotification from "./CustomNotification";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary
    }
  })
);
interface defaultState {
  role: string;
  access: any;
}

export default function AdminRoleAddEdit() {
  const classes = useStyles();
  const history = useHistory();
  const data = history.location.state;
  const keys: any = [];
  const [state, setState] = useState<defaultState>({ role: "", access: {} });

  useEffect(() => {
    const fetchData = async () => {
      const access = await RolesApiRepository.getAccessValues();
      setState({ ...state, access: access });
    };
    if (data === null) {
      fetchData();

      return;
    }

    setState(data);
  }, []);

  const [notification, setNotification] = useState(false);
  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // setState({ ...state, access: { [name]: event.target.checked } });
    setState({ ...state, access: { ...state.access, [name]: event.target.checked } });
  };

  const SelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newState = state.access;

    keys.forEach((item: any) => {
      newState[item] = event.target.checked;
    });

    setState({ ...state, access: newState });
  };
  const handleSave = async () => {
    if (await RolesApiRepository.saveRoles(state)) {
      setNotification(true);
      history.goBack();
    }
  };

  const handleTextField = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  if (!state) return null;

  for (const k in state.access) keys.push(k);
  return (
    <Container maxWidth="md" className={classes.root}>
      {notification ? <CustomNotification /> : null}
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid container item xs={6} alignItems="stretch" justify="flex-start" direction="row">
            <TextField
              id="standard-basic"
              label="Role"
              fullWidth
              variant="filled"
              value={state.role}
              name="role"
              onChange={(e: any) => handleTextField(e)}
            />
          </Grid>
          <Grid container item xs={6} alignItems="stretch" justify="flex-end" direction="row">
            <FormControlLabel
              value="start"
              control={<Switch color="primary" />}
              label="Select All"
              onChange={(e: any) => SelectAll(e)}
              labelPlacement="start"
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {keys.map((item: any) => (
            <>
              <Grid item xs={3}>
                {item}
              </Grid>
              <Grid item xs={3}>
                <Switch
                  color="primary"
                  value={state.access[item]}
                  checked={state.access[item]}
                  onChange={handleChange(`${item}`)}
                />
              </Grid>
            </>
          ))}
        </Grid>
        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
          <Button onClick={handleSave} variant="contained" color="primary" size="large" startIcon={<SaveIcon />}>
            Save
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}
