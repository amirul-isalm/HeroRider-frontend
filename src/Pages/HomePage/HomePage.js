import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import "./HomePage.css"
const HomePage = () => {
    return (
      <div className="HomePage">
        <div>
          <h1>Wellcome To Hero Rider</h1>
          <Link to="/joinType">
            <Button
              style={{ color: "white", marginTop: "10px" }}
              variant="outlined"
            >
              Login/Join Hero Rider
            </Button>
          </Link>
        </div>
      </div>
    );
};

export default HomePage;