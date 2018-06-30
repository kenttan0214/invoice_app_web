import React from 'react';
import ejs from 'ejs';
import fs from 'fs';
import zlib from 'zlib';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import createHistory from 'history/createMemoryHistory';
import JssProvider from 'react-jss/lib/JssProvider';
import { SheetsRegistry } from 'react-jss/lib/jss';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles';
import {
  DIST_PUBLIC_PATH as urlRoot,
  IS_PRODUCTION as isProduction
} from './constant';
import { configureStore } from '../app/store';
import { routes } from '../app/routes/routes';

const fileReader = (path) => (
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data.toString());
    });
  })
);

const getWebpackAsset = async () => {
  let webpackAsset = { client: { js: 'client.js' } };

  if (isProduction) {
    const webpackAssetPath = 'webpack-assets.json';
    const webpackAssetContent = await fileReader(webpackAssetPath);
    webpackAsset = JSON.parse(webpackAssetContent);
  }

  return webpackAsset;
};

const renderFullPage = async (html, initialState, css) => {
  const template = await fileReader('src/server/templates/index.ejs');
  const {
    client: {
      js: clientJs = '',
    } = {},
  } = await getWebpackAsset();

  const head = Helmet.rewind();

  return ejs.render(template , {
    head,
    clientJs,
    staticFilesPath: urlRoot,
    initialState: serialize(initialState, { isJSON: true, space: 0 }),
    html,
    css
  });
};

const renderContent = (req, res, renderedHtml) => {
  if (!req.headers['x-no-compression']
          && req.headers['accept-encoding']
          && req.headers['accept-encoding'].indexOf('gzip') >= 0) {
    zlib.gzip(new Buffer(renderedHtml, 'utf-8'), { level: 9 }, (_, gzippedHtml) => {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Encoding': 'gzip',
      });
      res.end(gzippedHtml);
    });
    return;
  }
  // No gzipping
  res.statusCode = 200;
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
  });
  res.end(renderedHtml);
};

const renderRoute = async ({
  App,
  store,
  sheetsRegistry,
  req,
  res
}) => {
  const renderedApp = renderToString(App);
  const css = sheetsRegistry.toString();
  const renderedHtml = await renderFullPage(
    renderedApp,
    store.getState(),
    css
  );
  renderContent(req, res, renderedHtml);
};

const handleRender = (port, req, res) => {
  const history = createHistory({ initialEntries: [req.url] });
  const store = configureStore(history);
  const sheetsRegistry = new SheetsRegistry();
  // Create a theme instance.
  const theme = createMuiTheme();
  const generateClassName = createGenerateClassName();


  const App = (
    <ReduxProvider store={store}>
      <ConnectedRouter history={history} isSSR>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            {renderRoutes(routes)}
          </MuiThemeProvider>
        </JssProvider>
      </ConnectedRouter>
    </ReduxProvider>
  );

  renderRoute({ App, sheetsRegistry, store, req, res });
};

export default handleRender;
