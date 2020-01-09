import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignIn } from '../components/SignIn';
import { Home } from '../components/Home';
import { SignUp } from '../components/SignUp';
import { PersistentDrawerLeft } from '../components/PersisstentDrawerLeft';
import { Projects } from '../views/Projects';
import { SingleProject } from '../views/SingleProject';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { getAccessToken } from '../auth/accessToke';

export const Routes: React.FC = () => {
  const token = getAccessToken();

  return (
    <BrowserRouter>
      <div>
        <PersistentDrawerLeft>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <ProtectedRoute
              isAuthenticated={!!token}
              isAllowed={!!token}
              restrictedPath={'/signin'}
              authenticationPath={'/signin'}
              exact
              path="/projects"
              component={Projects}
            />
            <ProtectedRoute
              isAuthenticated={!!token}
              isAllowed={!!token}
              restrictedPath={'/signin'}
              authenticationPath={'/signin'}
              exact
              path="/projects/:projectId"
              component={SingleProject}
            />
          </Switch>
        </PersistentDrawerLeft>
      </div>
    </BrowserRouter>
  );
};
