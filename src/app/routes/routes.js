import React from 'react';
import { Redirect } from 'react-router';
import Login from 'Login/Login';
import Main from 'Main/Main';
import CreateInvoice from 'CreateInvoice/CreateInvoice';

const routes = [{
  component: Main,
  routes: [{
    path: '/',
    component: Login,
    exact: true
  }, {
    path: '/invoice',
    component: CreateInvoice,
    exact: true
  }, {
    component: () => <Redirect to="/" />
  }]
}];

export { routes };
