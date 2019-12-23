import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Icon, Button, IconButton } from "@material-ui/core";
import RolesApiRepository from "../Library/RolesApiRepository";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function AdminRoles() {
  const classes = useStyles();
  const [state, setstate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await setstate(await RolesApiRepository.getRoles());
    };
    fetchData();
  }, []);

  if (!state) return null;
  console.log(state);
  return (
    <Container>
      <Paper>
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
                      data: item.access // your data array of objects
                    }}
                  >
                    <EditRoundedIcon />
                    {console.log(item.access)}

                    {/* <Link
                      to={{
                        pathname: "/admin/roles/edit"
                        // data: item.access // your data array of objects
                      }}
                    /> */}
                  </IconButton>
                  <IconButton>
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
