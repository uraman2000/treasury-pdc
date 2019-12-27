import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Icon, Button, IconButton, Grid } from "@material-ui/core";
import RolesApiRepository from "../Library/RolesApiRepository";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { Link } from "react-router-dom";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { ResponseCodes } from "../Constatnt";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2)
    }
  })
);
export default function AdminRoles() {
  const classes = useStyles();
  const [state, setstate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await setstate(await RolesApiRepository.getRoles());
    };
    fetchData();
  }, []);

  const handleRemove = async (id: any) => {
    if ((await RolesApiRepository.deleteRoles(id)) === ResponseCodes.Successful) {
      let newstate = state.filter((e: any) => e.id !== id);

      setstate(newstate);
    }
  };
  if (!state) return null;

  return (
    <Container>
      <Paper className={classes.paper}>
        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
          <Button
            component={Link}
            to={{
              pathname: "/admin/roles/edit",
              state: null
            }}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddCircleRoundedIcon />}
          >
            Add
          </Button>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((item: any, key: any) => (
              <TableRow key={key}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <IconButton
                    component={Link}
                    to={{
                      pathname: "/admin/roles/edit",
                      state: item
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>

                  <IconButton onClick={(e: any) => handleRemove(item.id)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
