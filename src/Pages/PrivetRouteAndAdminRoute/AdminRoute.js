import { CircularProgress } from "@mui/material";
import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../Context/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { user, isLoading,admin } = useAuth();
  if (isLoading) {
    return <CircularProgress />;
  }
  if (!admin) {

   return <CircularProgress />;
    
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user.email && admin) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
