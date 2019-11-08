import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SignIn } from '../components/SignIn';
import { Home } from '../components/Home';
import { Header } from '../components/Header';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
