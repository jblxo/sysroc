import React from 'react';
import { RouteComponentProps } from 'react-router';
import { SignUpForm } from './SignUpForm';
import { getRegisterToken } from '../auth/registerToken';

export const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  if (!getRegisterToken()) {
    history.push('/signin');
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <SignUpForm
        onSubmit={async ({ name, changes }) => {

        }}
      />
    </div>
  );
};
