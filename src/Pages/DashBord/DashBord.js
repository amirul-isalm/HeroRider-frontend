import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import useAuth from "../Context/useAuth";
import { Button, CircularProgress } from "@mui/material";
import AdminRoute from "../PrivetRouteAndAdminRoute/AdminRoute";
import AllUser from "./AllUser";
const drawerWidth = 260;

function Dashboard(props) {
  const { logOut, user, admin } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();
  const [riders, setRiders] = React.useState([]);
  const [learners, setlearners] = React.useState([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    fetch("https://nameless-plains-00975.herokuapp.com/riders")
      .then((res) => res.json())
      .then((data) => setRiders(data));
  }, []);
  React.useEffect(() => {
    fetch("https://nameless-plains-00975.herokuapp.com/learners")
      .then((res) => res.json())
      .then((data) => setlearners(data));
  }, []);

  if (!riders.length && !learners.length) {
    return (
      <div
        style={{ maxWidth: "100vw", overflowX: "hidden", marginTop: "50px" }}
      >
        <CircularProgress style={{ margin: "100px" }} />
      </div>
    );
  }
  const allUsers = [...riders, ...learners]
  console.log(allUsers)
  const drawer = (
    <div>
      <Divider />
      <List style={{ marginTop: "100px" }}>
        <ListItem>
          <Button>
            <Link style={{ textDecoration: "none", color: "purple" }} to="/">
              Home
            </Link>
          </Button>
        </ListItem>

        <ListItem>
          <Button>
            <Link
              style={{ textDecoration: "none", color: "purple" }}
              to={`${url}/allUser`}
            >
              All User
            </Link>
          </Button>
        </ListItem>

        <ListItem>
          <Button>
            <img
              style={{ width: "40px", borderRadius: "50%", marginRight: "5px" }}
              src={user.photoURL}
              alt=" "
            />

            {user.displayName}
          </Button>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Switch>
                  <AdminRoute  path={`${path}/allUser`}>
                      <AllUser allUsers={allUsers}/>

          </AdminRoute>
        </Switch>
      </Box>
    </Box>
  );
}

export default Dashboard;
