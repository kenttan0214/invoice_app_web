import connect from 'connect';
import serveStatic from 'serve-static';
import handleRender from './ssr';
import { IS_PRODUCTION, PORT } from './constant';
const app = connect();

if (!IS_PRODUCTION) {
  (require('./server.webpack').default)(app);
}

app.use('/dist/', serveStatic(process.cwd() + '/dist/'));
app.use(handleRender.bind(this, PORT));
app.listen(PORT, '0.0.0.0', () => {
  console.log('server running on ',PORT); // eslint-disable-line no-console
});
