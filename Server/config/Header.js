import '../style/Header.css';
import React from 'react';
import { Grid, Button } from '@material-ui/core';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Grid container>
          <Grid item xs={8}>
            <p id="logo-text">
              Stock Market
            </p>
          </Grid>
          <Grid item xs={2}>
            <div className="header-right-btns">
              <Button variant="contained" color="primary">
                My Wishlist
              </Button>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className="header-right-btns">
              <Button variant="contained" color="secondary">
                Logout
              </Button>
            </div>
          </Grid>
        </Grid>
      </header>
    );
  }
}

export default Header;