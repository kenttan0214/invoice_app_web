import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import { Provider as ReduxProvider } from 'react-redux';

import { routes } from './routes/routes';
import { configureStore } from './store';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';

const history = createHistory();
const store = configureStore(history, window.__INITIAL_STATE__);

const Routes = () => renderRoutes(routes);
const HotRoutes = hot(module)(Routes);
const useHotReload = true; //temporary hardcoded

export const App = (
  <ReduxProvider store={store}>
    <ConnectedRouter history={history}>
      { useHotReload ? <HotRoutes /> : renderRoutes(routes) }
    </ConnectedRouter>
  </ReduxProvider>
);

const el = document.querySelector('[data-role="app"]');
ReactDOM.render(App, el);
