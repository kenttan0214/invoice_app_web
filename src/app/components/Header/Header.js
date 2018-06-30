import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const Header = (props) => {
  const { classes } = props;
  return (
    <div>
      <Helmet>
        <title>Invoice App</title>
      </Helmet>
      <AppBar position="static">
        <Toolbar className={classes.container}>
          <Typography color="inherit" variant="title"> EIGHT & EIGHT TELECOMMUNICATION </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles({
  container: {
    width: '100%',
    maxWidth: 980,
    margin: '0 auto',
  }
})(Header);
