import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Collapse,
  List
} from "@material-ui/core";
import { RouteChildrenProps, useHistory } from "react-router";
import { deleteAccess, getAccess } from "../utils";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import TableChartRoundedIcon from "@material-ui/icons/TableChartRounded";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link, LinkProps } from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: "#f5f5f5"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    title: {
      flexGrow: 1
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

interface IProps {
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
}

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link innerRef={ref as any} {...props} />
));

export default function DrawerNavigation({ children }: IProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const [openAdminList, setopenAdminList] = React.useState(false);

  const handleClick = () => {
    setopenAdminList(!openAdminList);
    setOpen(true);
  };

  const drawerHandler = () => {
    setOpen(!open);
    if (open) {
      setopenAdminList(false);
    }
  };

  const logOutHandler = () => {
    deleteAccess();
    history.push("/");
  };

  const sideDrawerList = [
    {
      key: "inventory",
      icon: <TableChartRoundedIcon />,
      text: "Inventory",
      link: "/"
    },
    {
      key: "summary",
      icon: <AssessmentRoundedIcon />,
      text: "Summary",
      link: "/summary"
    }
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={drawerHandler}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Mini variant drawer
          </Typography>
          <Button color="inherit" onClick={logOutHandler}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={drawerHandler}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        {/* console.log(getAccess()); */}

        {getAccess().isAdmin === "true" ? (
          <div>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <PersonRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
              {openAdminList ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openAdminList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} component={AdapterLink} to={"/admin/user"}>
                  <ListItemIcon>
                    <GroupRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </List>
            </Collapse>
          </div>
        ) : null}
        <Divider />
        {sideDrawerList.map(item => {
          return (
            <ListItem button key={item.key} component={AdapterLink} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
