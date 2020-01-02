import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo/apollo.client';
import { setAccessToken } from './auth/accessToke';
import { Routes } from './routes/Routes';
import { Config } from './config/config';
import { SnackbarProvider } from 'notistack';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${Config.backendApiUrl}/auth/refresh_token`, {
      method: 'POST',
      credentials: 'include'
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </SnackbarProvider>
  );
};

export default App;
