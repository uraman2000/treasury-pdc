import React, { useState, useEffect } from "react";
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
  List,
  Badge,
  Popover,
  Paper,
  Box,
  Container,
  ListItemAvatar,
  Avatar,
  ListSubheader
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
import NotificationsIcon from "@material-ui/icons/Notifications";
import UserApiRespository from "../Library/UserApiRespository";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ShowChartRoundedIcon from "@material-ui/icons/ShowChartRounded";
import TimeAgo from "react-timeago";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";

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
    },
    notificationListRoot: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: "inline"
    }
  })
);

interface IProps {
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
}

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link innerRef={ref as any} {...props} />
));

const sideDrawerList = {
  public: [
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
    },
    {
      key: "summary-per-branch",
      icon: <AssessmentRoundedIcon />,
      text: "Summary Per Branch",
      link: "/summary-per-branch"
    },
    {
      key: "report",
      icon: <ListAltRoundedIcon />,
      text: "Report",
      link: "/report"
    }
  ],
  private: [
    {
      key: "users",
      icon: <GroupRoundedIcon />,
      text: "Users",
      link: "/admin/user"
    },
    {
      key: "status",
      icon: <ShowChartRoundedIcon />,
      text: "Status",
      link: "/admin/status"
    }
  ]
};

export default function DrawerNavigation({ children }: IProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [state, setstate] = useState([]);
  const history = useHistory();

  const [title, settitle] = useState("RFC");
  // getAllPending;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const peding = await UserApiRespository.getAllPending();
      setstate(peding);
    };

    fetchData();
  }, []);

  const [openAdminList, setopenAdminList] = React.useState(false);

  const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationItemClick = () => {
    history.push("/admin/user");
  };
  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const openNotification = Boolean(anchorEl);
  const id = openNotification ? "simple-popover" : undefined;

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
            {title}
          </Typography>
          {getAccess().role === "ADMIN" ? (
            <>
              <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handleNotificationClick}>
                <Badge badgeContent={state.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Popover
                id={id}
                open={openNotification}
                anchorEl={anchorEl}
                onClose={handleNotificationClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
              >
                <Paper>
                  <List
                    className={classes.notificationListRoot}
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Pending Users
                      </ListSubheader>
                    }
                  >
                    {state.map((item: any, key: any) => (
                      <>
                        <ListItem key={key} alignItems="flex-start" button onClick={handleNotificationItemClick}>
                          <ListItemAvatar>
                            <Avatar>
                              <AccountCircleRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={item.username} secondary={<TimeAgo date={item.createdAt} />} />
                        </ListItem>

                        {key < state.length - 1 ? <Divider component="li" /> : null}
                      </>
                    ))}
                  </List>
                </Paper>
              </Popover>
            </>
          ) : null}

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

        {getAccess().role === "ADMIN" ? (
          <div>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <PersonRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
              {openAdminList ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openAdminList} timeout="auto" unmountOnExit>
              {sideDrawerList.private.map((item: any, key: any) => (
                <List component="div" disablePadding key={key}>
                  <ListItem
                    button
                    className={classes.nested}
                    component={AdapterLink}
                    to={item.link}
                    onClick={(e: any) => {
                      settitle(item.text);
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </List>
              ))}
            </Collapse>
          </div>
        ) : null}
        <Divider />
        {sideDrawerList.public.map((item: any, key: any) => {
          return (
            <ListItem
              button
              key={key}
              component={AdapterLink}
              to={item.link}
              onClick={(e: any) => {
                settitle(item.text);
              }}
            >
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
