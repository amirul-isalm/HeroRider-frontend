import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useAuth from "../Context/useAuth";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({});
  const history = useHistory();
  const location = useLocation();
  const { loginUsingEmailPass, error, loginSuccess } =useAuth();
  const handelBlure = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newData = { ...loginData };
    newData[name] = value;
    setLoginData(newData);
  };
  const [loading, setLoading] = React.useState(false);
 

  const handelSubmit = (e) => {
    e.preventDefault();
    loginUsingEmailPass(loginData.email, loginData.password, history, location);
  };

  return (
    <Container>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        
        <Grid
          style={{
            margin: "50px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={12}
          md={6}
        >
          <Box>
           
            <Typography
              style={{
                
                margin: "10px",
                fontWeight: 600,
              }}
              variant="h3"
            >
              Please Login..
              <hr />
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {loginSuccess && (
              <Alert severity="success">Login Successfully..</Alert>
            )}
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <form onSubmit={handelSubmit}>
                <TextField
                  required
                  style={{ width: "95%" }}
                  label="Your Email"
                  type="email"
                  variant="standard"
                  name="email"
                  onBlur={handelBlure}
                />
                <TextField
                  required
                  style={{ width: "95%" }}
                  label="Password"
                  type="Password"
                  variant="standard"
                  name="password"
                  onBlur={handelBlure}
                />
                <Button sx={{ my: 2 }} type="submit" variant="outlined">
                  Login
                </Button>
                <Button
                  style={{ display: "block" }}
                  sx={{ mx: "auto" }}
                  veriant="outlined"
                >
                  <Link style={{ textDecoration: "none" }} to="/joinType">
                    New user? Please Join.
                  </Link>
                </Button>
              </form>
            </Box>
           
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
