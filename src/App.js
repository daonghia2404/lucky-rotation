import React from 'react';
import { Redirect, Router } from '@reach/router';

import { AuthRoute, LayoutPaths, Pages, Paths, ProtectedRoute, PublicRoute } from '@/pages/routers';
import Guest from '@/layouts/Guest';
import Admin from '@/layouts/Admin';
import Auth from '@/layouts/Auth';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Router primary={false}>
        <Guest path={LayoutPaths.Guest}>
          <PublicRoute path={Paths.Home} component={Pages.Home} />
          <Redirect noThrow from={Paths.Rest} to={`${LayoutPaths.Guest}${Paths.Home}`} />
        </Guest>

        <Auth path={LayoutPaths.Auth}>
          <AuthRoute path={Paths.Login} component={Pages.Login} />
          <Redirect noThrow from={Paths.Rest} to={`${LayoutPaths.Auth}${Paths.Login}`} />
        </Auth>

        <Admin path={LayoutPaths.Admin}>
          <ProtectedRoute path={Paths.Users} component={Pages.Users} />
          <ProtectedRoute path={Paths.ListWallet} component={Pages.ListWallet} />
          <ProtectedRoute path={Paths.ListRotation} component={Pages.ListRotation} />
          <ProtectedRoute path={Paths.HistoryRotation} component={Pages.HistoryRotation} />
          <ProtectedRoute path={Paths.Setting} component={Pages.Setting} />
          <Redirect noThrow from={Paths.Rest} to={`${Paths.Admin}${Paths.Users}`} />
        </Admin>
      </Router>
    </div>
  );
};

export default App;
