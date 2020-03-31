import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignIn } from '../components/SignIn';
import { Home } from '../components/Home';
import { SignUp } from '../components/SignUp';
import { PersistentDrawerLeft } from '../components/PersisstentDrawerLeft';
import { Projects } from '../views/Projects';
import { SingleProject } from '../views/SingleProject';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useMeQuery, UserAuthDto } from '../generated/graphql';
import { NotAllowed } from '../views/NotAllowed';
import { Users } from '../views/Users';
import { hasPermissions } from '../auth/hasPermissions';
import {Classification} from "../views/Classification";

export const Routes: React.FC = () => {
  const { data, loading } = useMeQuery();

  const verifyPermissions = (user: UserAuthDto | any, neededPermissions: any[]) => {
    return hasPermissions(user, ...neededPermissions);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <div>
        <PersistentDrawerLeft>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/notallowed" component={NotAllowed} />
            <ProtectedRoute
              isAuthenticated={!!data?.me}
              isAllowed={verifyPermissions(data?.me, [
                'projects.create',
                'projects.view',
                'projects.manage'
              ])}
              restrictedPath={'/notallowed'}
              authenticationPath={'/signin'}
              exact
              path="/projects"
              component={Projects}
            />
            <ProtectedRoute
              isAuthenticated={!!data?.me}
              isAllowed={verifyPermissions(data?.me, [
                'projects.create',
                'projects.view',
                'projects.manage'
              ])}
              restrictedPath={'/notallowed'}
              authenticationPath={'/signin'}
              exact
              path="/projects/:projectId"
              component={SingleProject}
            />
            <ProtectedRoute
              isAuthenticated={!!data?.me}
              isAllowed={verifyPermissions(data?.me, [
                'users.students.manage',
                'users.teachers.manage'
              ])}
              restrictedPath={'/notallowed'}
              authenticationPath={'/signin'}
              exact
              path="/users"
              component={Users}
            />
            <ProtectedRoute
                isAuthenticated={!!data?.me}
                isAllowed={verifyPermissions(data?.me, [
                    'projects.manage'
                ])}
                restrictedPath={'/notallowed'}
                authenticationPath={'/signin'}
                exact
                path="/classification"
                component={Classification}
            />
          </Switch>
        </PersistentDrawerLeft>
      </div>
    </BrowserRouter>
  );
};
