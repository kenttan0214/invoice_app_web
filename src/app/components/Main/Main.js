import React from 'react';
import PropTypes from 'prop-types';
import Header from 'Header/Header';
import { matchRoutes } from 'react-router-config';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

const Main = ({
  classes,
  history,
  location,
  route
}) => {
  const matchedRoute = matchRoutes(route.routes, location.pathname);
  const routeMatch = matchedRoute[matchedRoute.length - 1].match;
  const activatedRoute = matchedRoute[matchedRoute.length - 1].route;

  const activatedComponent = <activatedRoute.component history={history} match={routeMatch} />;

  return (
    <div ref={() => {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }}>
      <Header/>
      <div className={classes.container}>
        {activatedComponent}
      </div>
    </div>
  );
};

Main.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

export default withStyles(({ spacing, palette } ) => ({
  '@global': {
    body: {
      'background-color': palette.grey['200'],
      'margin': 0
    }
  },
  container: {
    maxWidth: 980,
    margin:' 0 auto',
    padding: spacing.unit * 2
  }
}))(withRouter(Main));
