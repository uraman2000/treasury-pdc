import React from "react";
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import LoginApiRepository from "../Library/LoginApiRepository";
import { useHistory } from "react-router";
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
  container: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    height: "100%"
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: ""
    },
    onSubmit: values => {
      LoginApiRepository.SignUp(values, (data: any) => {
        history.push("/");
      });
    }
  });

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form className={classes.form} action={""} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Grid>

              <Grid item xs={12}>
                {/* <TextField
                variant="outlined"
                required
                fullWidth
                name="role"
                label="Role"
                type="role"
                id="role"
                onChange={formik.handleChange}
                value={formik.values.role}
              /> */}
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
