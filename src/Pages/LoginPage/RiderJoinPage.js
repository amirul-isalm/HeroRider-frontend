import { PhotoCamera } from "@mui/icons-material";
import {
  Alert,
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useAuth from "../Context/useAuth";

const RiderJoinPage = () => {
  const [registerData, setRegisterData] = useState({});
  const [vicleType, setvicleType] = useState("");
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [drivingFront, setDrivingFront] = useState(null);
  const [drivingBack, setDrivingBack] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const { createAccountUsingEmailPass, error, loginSuccess, setError } =
    useAuth();

  const handelChange = (e) => {
    setvicleType(e.target.value);
  };
  const handelBlure = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newData = { ...registerData };
    newData[name] = value;
    setRegisterData(newData);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (vicleType === "") {
      setError("Select a vichle type");
      return;
    }
    if (!nidFront && !nidBack && !drivingFront && !drivingBack && !profilePic) {
      setError("Please Select photo");
      return;
    }

    if (registerData.password !== registerData.repassword) {
      return setError("password Doesnot Match");
    }

    // make form data
    const formData = new FormData();
    formData.append("nidFront", nidFront);
    formData.append("nidBack", nidBack);
    formData.append("drivingFront", drivingFront);
    formData.append("drivingBack", drivingBack);
    formData.append("profilePic", profilePic);
    formData.append("vichaleType", vicleType);
    formData.append("accountType","Rider")
    for (const name in registerData) {
      formData.append(name, registerData[name]);
    }

    createAccountUsingEmailPass(
      registerData.email,
      registerData.password,
      registerData.userName,
      history,
      formData,
      "rider"
    );
  };
  return (
    <Container>
      <Typography
        style={{
          fontFamily: ` 'EB Garamond, serif`,
          margin: "10px",
          fontWeight: 600,
        }}
        variant="h3"
      >
        Join as a Rider
        {error && <Alert severity="error">{error}</Alert>}
        {loginSuccess && (
          <Alert severity="success">Registrasion Successfully..</Alert>
        )}
        <hr style={{ width: "80%" }} />
      </Typography>
      <form onSubmit={handelSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            item
            xs={12}
            md={6}
          >
            <Box>
              <Box
                style={{ width: "80%", margin: "auto" }}
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
              >
                <TextField
                  required
                  style={{ width: "95%" }}
                  onBlur={handelBlure}
                  label="Your FullName"
                  type="text"
                  variant="standard"
                  name="userName"
                />
                <TextField
                  required
                  style={{ width: "95%" }}
                  onBlur={handelBlure}
                  label="Your Email"
                  type="email"
                  variant="standard"
                  name="email"
                />
                <TextField
                  required
                  style={{ width: "95%" }}
                  onBlur={handelBlure}
                  label="Your age"
                  type="number"
                  variant="standard"
                  name="age"
                />
                <TextField
                  required
                  style={{ width: "95%" }}
                  onBlur={handelBlure}
                  label="Address"
                  type="text"
                  variant="standard"
                  name="address"
                />
                <TextField
                  required
                  style={{ width: "95%" }}
                  onBlur={handelBlure}
                  label="Valid phone"
                  type="number"
                  variant="standard"
                  name="phone"
                />
                <TextField
                  required
                  style={{ width: "95%" }}
                  onBlur={handelBlure}
                  label="Area"
                  type="text"
                  variant="standard"
                  name="area"
                />
                <Box style={{ textAlign: "left", marginLeft: "15px" }}>
                  {" "}
                  <InputLabel id="demo-simple-select-label">
                    Vichle Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    required
                    id="demo-simple-select"
                    value={vicleType}
                    label="Vichle Type"
                    onChange={handelChange}
                  >
                    <MenuItem value={"Car"}>Car</MenuItem>
                    <MenuItem value={"Bike"}>Bike</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              style={{ width: "80%", margin: "auto" }}
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                textAlign={"left"}
                spacing={2}
              >
                <label>
                  <Input
                    required
                    accept="image/*"
                    type="file"
                    onChange={(e) => setNidFront(e.target.files[0])}
                  />
                  <Button component="span">NID FRONT PART</Button>
                </label>
                <label>
                  <Input
                    required
                    accept="image/*"
                    type="file"
                    onChange={(e) => setNidBack(e.target.files[0])}
                  />
                  <Button component="span">NID BACK PART</Button>
                </label>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                textAlign={"left"}
                spacing={2}
              >
                <label>
                  <Input
                    required
                    accept="image/*"
                    type="file"
                    onChange={(e) => setDrivingFront(e.target.files[0])}
                  />
                  <Button component="span">DRIVING LICENSE FRONT PART</Button>
                </label>
                <label>
                  <Input
                    required
                    accept="image/*"
                    type="file"
                    onChange={(e) => setDrivingBack(e.target.files[0])}
                  />
                  <Button component="span">DRIVING LICENSE BACK PART</Button>
                </label>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                textAlign={"left"}
                spacing={2}
              >
                <label>
                  <Input
                    required
                    accept="image/*"
                    type="file"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                  />
                  <br />
                  <Button component="span">Profile Picture</Button>
                </label>
              </Stack>

              <TextField
                required
                style={{ width: "95%" }}
                onBlur={handelBlure}
                label="car information
(name, model, name palate)"
                type="text"
                variant="standard"
                name="carinformation"
              />
              <TextField
                required
                style={{ width: "95%" }}
                onBlur={handelBlure}
                label="Password"
                type="Password"
                variant="standard"
                name="password"
              />
              <TextField
                required
                style={{ width: "95%" }}
                onBlur={handelBlure}
                label="Re-Type Password"
                type="Password"
                variant="standard"
                name="repassword"
              />
            </Box>
          </Grid>
        </Grid>
        <Button sx={{ mt: 3 }} type="submit" variant="outlined">
          Join
        </Button>
        <Button
          style={{ display: "block" }}
          sx={{ mx: "auto" }}
          veriant="outlined"
        >
          <Link style={{ textDecoration: "none" }} to="/login">
            Already Join? Please login
          </Link>
        </Button>
      </form>
    </Container>
  );
};

export default RiderJoinPage;
