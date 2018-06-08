import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Login from './containers/Login/Login';
import Main from './containers/Main/Main';
import CreateInvoice from './containers/CreateInvoice/CreateInvoice';

function routes () {
    return (
        <Route component={Main} path="/">
            <IndexRoute component={Login} />
            <Route component={Login}
                path="/login"
            />
            <Route component={CreateInvoice}
                path="/invoice"
            />
        </Route>
    );
}

export default routes;
