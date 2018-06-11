import React from 'react';
import PropTypes from 'prop-types';
import Header from 'Header/Header';
import { withStyles } from '@material-ui/core/styles';

const Main = (props) => {
  const { classes, children } = props;
  return (
    <div>
      <Header/>
      <div className={classes.container}>
        {children}
      </div>
    </div>
  );
};

Main.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node
};

export default withStyles(({ spacing } ) => ({
  container: {
    maxWidth: 980,
    margin:' 0 auto',
    padding: spacing.unit * 2
  }
}))(Main);
