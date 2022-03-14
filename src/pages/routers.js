import React, { lazy, Suspense } from 'react';
import { Redirect } from '@reach/router';

import AuthHelpers from '@/services/auth-helpers';

const retryLoadComponent = (fn, retriesLeft = 5, interval = 1000) =>
  new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            return;
          }

          retryLoadComponent(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });

const Home = lazy(() => retryLoadComponent(() => import('@/pages/Home')));
const Login = lazy(() => retryLoadComponent(() => import('@/pages/Login')));
const Users = lazy(() => retryLoadComponent(() => import('@/pages/Users')));
const ListWallet = lazy(() => retryLoadComponent(() => import('@/pages/ListWallet')));
const HistoryRotation = lazy(() => retryLoadComponent(() => import('@/pages/HistoryRotation')));

export const LayoutPaths = {
  Auth: '/',
  Guest: '/guest',
  Admin: '/admin',
};

export const ModulePaths = {
  Rest: '*',
};

export const Paths = {
  Home: '/',
  Login: '/',
  Users: '/',
  ListWallet: '/list-wallet',
  HistoryRotation: '/history-rotation',
  Rest: '*',
};

export const Pages = {
  Home,
  Login,
  Users,
  ListWallet,
  HistoryRotation,
};

export const AuthRoute = ({ component: Component, ...rest }) => {
  const loggedIn = AuthHelpers.getAccessToken();

  return loggedIn ? (
    <Redirect noThrow from={Paths.Rest} to={LayoutPaths.Admin} />
  ) : (
    <Suspense fallback={<div className="DOM-Loading" />}>
      <Component {...rest} />
    </Suspense>
  );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = AuthHelpers.getAccessToken();

  return loggedIn ? (
    <Suspense fallback={<div className="DOM-Loading" />}>
      <Component {...rest} />
    </Suspense>
  ) : (
    <Redirect from="" to={LayoutPaths.Auth} noThrow />
  );
};

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Suspense fallback={<div className="DOM-Loading" />}>
    <Component {...rest} />
  </Suspense>
);
