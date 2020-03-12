import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface props {
  severity?: "error" | "warning" | "info" | "success";
  message: string;
  status: any;
  isShow: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function CustomizedSnackbars({ severity, message, isShow, status }: props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  severity = status === 200 ? "success" : "error";

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  console.log(open + "  " + isShow);

  useEffect(() => {
    /* componentDidUpdate code */
    setOpen(isShow);
  }, [isShow]);

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
