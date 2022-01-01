import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../Context/useAuth";

const LearnerProfile = () => {
  const [rider, setRider] = useState([]);
  const { user, logOut } = useAuth();
  const [courses,setCourses]=useState([])
    const history=useHistory()
  useEffect(() => {
    fetch(`https://nameless-plains-00975.herokuapp.com/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  },[])

  console.log(courses)
  useEffect(() => {
    const url = `https://nameless-plains-00975.herokuapp.com/learner?email=${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setRider(data));
  }, [user]);

  if (rider.length < 1) {
    return (
      <div
        style={{ maxWidth: "100vw", overflowX: "hidden", marginTop: "50px" }}
      >
        <CircularProgress style={{ margin: "100px" }} />
      </div>
    );
  }
  const {
    userName,
    email,
    age,
    address,
    phone,

    vichle,

    status,
    nidFront,
    nidBack,

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
  ];

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h2">Learner Profile</Typography>
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
                vichle: {vichle}
              </Typography>

              <Typography variant="h6" color="text.secondary">
                Account status: {status}
              </Typography>
            </CardContent>
          </Card>
          <ImageList sx={{ width: "100%", height: 350 }}>
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
          <Button
            onClick={logOut}
            style={{
              marginLeft: "50%",
              marginTop: "20px",
              padding: "5px 15px",
            }}
            variant="contained"
          >
            Log Out
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <div style={{ marginLeft: "2px solid black" }}>
            <Typography variant="h4">Available course for you</Typography>
            <hr />

            {courses.map((course) => (
              <div
                key={course.id}
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={course.photo}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {course.name}{" "}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Course Fee: ${course.price}{" "}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                                onClick={() => history.push(`/payment/${course._id}`)}
                                
                      variant="contained"
                      size="small"
                    >
                      Purcess
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LearnerProfile;
