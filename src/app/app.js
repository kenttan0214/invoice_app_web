import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider as ReduxProvider } from 'react-redux';

import routes from './routes';
import { configureStore } from './store';
import { withStyles } from '@material-ui/core/styles';

const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

const styles = (theme)=> {
  return {
    '@global': {
      body: {
        'background-color': theme.palette.grey['200'],
        'margin': 0
      }
    }
  };
};

const ColdRouter = () => (
  <Router history={history} routes={routes()}/>
);

const HotRouter = hot(module)(ColdRouter);

const App = (props) => { // eslint-disable-line react/no-multi-comp
  const { hotReload } = props;
  return (
    <div>
      <ReduxProvider store={store}>
        { hotReload ? <HotRouter /> : <ColdRouter/>}
      </ReduxProvider>
    </div>
  );
};

App.propTypes = {
  hotReload: PropTypes.bool,
};

export default withStyles(styles)(App);
