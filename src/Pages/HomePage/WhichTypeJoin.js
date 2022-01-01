import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const WhichTypeJoin = () => {
    return (
      <div className="HomePage">
        <div>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 3, md: 3 }}
          >
            <Grid item xs={12} md={6}>
              <Card sx={{ width: 360 }}>
                <CardMedia
                  component="img"
                  height="240"
                  image="https://i.ibb.co/sy6DYYJ/car-vs-motorcycle.jpg"
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    <Link to="/riderjoin">
                      <Button variant="contained" size="small">
                        Join as a rider
                      </Button>
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ width: 360 }}>
                <CardMedia
                  component="img"
                  height="240"
                  image="https://i.ibb.co/KD5DWnP/learning-how-to-dri.jpg"
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    <Link to="/learnerjoin">
                      <Button variant="contained" size="small">
                        Join as a Driving Learner
                      </Button>
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
};

export default WhichTypeJoin;