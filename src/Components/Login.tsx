import React, { useState } from "react";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import LoginApiRepository from "../Library/LoginApiRepository";
import { ResponseCodes } from "../Constatnt";
import { red } from "@material-ui/core/colors";
import { useHistory } from "react-router";
import { setAccess } from "../utils";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.rfc.com.ph/">
        Radio Wealth Finance
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  username: {
    marginTop: 8
  },
  invalidEror: {
    color: red.A700
  }
}));

export default function Login() {
  const classes = useStyles();
  let history = useHistory();

  const [state, setstate] = useState({
    isErrorShow: false,
    isErrorMessage: ""
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: values => {
      //   alert(JSON.stringify(values, null, 2));
      LoginApiRepository.login(values, (data: any) => {
        if (data.status === ResponseCodes.Unauthorized) {
          setstate({
            isErrorShow: true,
            isErrorMessage: data.data.message
          });
          return;
        }

        setAccess(data.data);
        history.push("/");
      });
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} action={""} onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item>
              <Typography className={classes.invalidEror} variant="caption" display="block">
                {state.isErrorShow ? `* ${state.isErrorMessage}` : null}
              </Typography>
            </Grid>
          </Grid>
          <TextField
            className={classes.username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            autoFocus
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
