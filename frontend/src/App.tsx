import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo/apollo.client';
import { setAccessToken } from './auth/accessToke';
import { Routes } from './routes/Routes';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/auth/refresh_token', {
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
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};

export default App;
