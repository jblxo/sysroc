import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignIn } from '../components/SignIn';
import { Home } from '../components/Home';
import { SignUp } from '../components/SignUp';
import { PersistentDrawerLeft } from '../components/PersisstentDrawerLeft';
import { Projects } from '../views/Projects';
import { SingleProject } from '../views/SingleProject';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useMeQuery } from '../generated/graphql';
import { NotAllowed } from '../views/NotAllowed';
import { Users } from '../views/Users';

export const Routes: React.FC = () => {
  const { data, loading } = useMeQuery();

  const hasPermissions = (permissions: any[], neededPermissions: any[]) => {
    for (const requiredPerm of neededPermissions) {
      const found = permissions.find((perm: any) => perm.slug === requiredPerm);
      if (!found || !found.permitted) return false;
    }
    return true;
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
              isAllowed={hasPermissions(data?.me?.permissions ?? [], [
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
              isAllowed={hasPermissions(data?.me?.permissions ?? [], [
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
              isAllowed={hasPermissions(data?.me?.permissions ?? [], [
                'users.students.manage',
                'users.teachers.manage'
              ])}
              restrictedPath={'/notallowed'}
              authenticationPath={'/signin'}
              exact
              path="/users"
              component={Users}
            />
          </Switch>
        </PersistentDrawerLeft>
      </div>
    </BrowserRouter>
  );
};
