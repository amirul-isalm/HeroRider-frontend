import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const NotFoundCompo = () => {
    const history = useHistory()
    
  const goBack = () => {
   history.push("/")
 }
    return (
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={2} sm={2} md={3}></Grid>
          <Grid item xs={10} sm={10} md={9}>
            <Typography
              sx={{ mx: "auto" }}
              style={{
                fontFamily: ` 'EB Garamond, serif`,
                color: " rgb(6, 26, 58)",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "14vw",
              }}
            >
              404
            </Typography>
            <Typography
              sx={{ mx: "auto" }}
              style={{
                fontFamily: ` 'EB Garamond, serif`,
                color: " rgb(6, 26, 58)",
                textAlign: "left",
                fontWeight: "600",
                fontSize: "5vw",
              }}
            >
              Page Not Found..{" "}
              <Button>
                <Link
                  style={{
                    fontSize: "3vw",
                    fontFamily: ` 'EB Garamond, serif`,
                  }}
                  to="/"
                >
                  {" "}
                  Go Home
                </Link>
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
};

export default NotFoundCompo;