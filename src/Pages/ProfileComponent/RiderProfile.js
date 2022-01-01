import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../Context/useAuth";

const RiderProfile = () => {
  const [rider, setRider] = useState([]);
  const { user, logOut } = useAuth();

  useEffect(() => {
    const url = `https://nameless-plains-00975.herokuapp.com/rider?email=${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setRider(data));
  }, [user]);

  if (rider.length < 1) {
    return (
      <div style={{ maxWidth: "100vw",overflowX:"hidden",marginTop:"50px" }}>
        <CircularProgress style={{margin:"100px"}} />
      </div>
    );
  }
  const {
    userName,
    email,
    age,
    address,
    phone,
    area,
    vichle,
    carinformation,
    passsword,
    status,
    nidFront,
    nidBack,
    drivingFront,
    drivingBack,
    profilePic,
    } = rider[0];
    

const itemData = [
  {
    img: nidFront,
    title: "NID Front Part",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: nidBack,
    title: "NID Back Part",
  },
  {
    img: drivingFront,
    title: "Driving License Front",
  },
  {
    img: drivingBack,
    title: "Driving License Back",
  },
  
];




  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h2">Rider Profile</Typography>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Card
            sx={{
              maxWidth: "100%",
            }}
          >
            <img
              style={{ borderRadius: "50%" }}
              height="200"
              width="200"
              src={`data:image/png;base64,${profilePic}`}
              alt="green iguana"
            />
            <CardContent style={{ textAlign: "left", marginLeft: "30px" }}>
              <Typography gutterBottom variant="h4" component="div">
                {userName}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Email: {email}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                address: {address}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Age: {age}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Phone: {phone}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                area: {area}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                vichle: {vichle}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                carinformation: {carinformation}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Account status: {status}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <ImageList sx={{ width: "100%", height: 550 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">Photos and media</ListSubheader>
            </ImageListItem>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`data:image/png;base64,${item.img}`}
                        srcSet={`data:image/png;base64,${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.author}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.title}`}
                    ></IconButton>
                  }
                />
              </ImageListItem>
            ))}
                  </ImageList>

        </Grid>
                  <Button onClick={logOut} style={{marginLeft:"50%",padding:"5px 15px"}} variant="contained">
                      Log Out
                  </Button>
      </Grid>
    </div>
  );
};

export default RiderProfile;
