import React from 'react';
import styled from 'styled-components';
import { NoSsr } from '@material-ui/core';
import { ApolloError } from 'apollo-client';

interface Props {
  error: ApolloError | any;
}

const ErrorStyles = styled.div`
  font-size: 1.2rem;
  padding: 1.5rem 2.5rem;
  width: 100%;
  margin: 2rem auto;
  color: #8e0404;
  strong {
    margin-right: 1.5rem;
  }
  p {
    margin: 0;
    font-weight: 100;
  }
`;

export const Error: React.FC<Props> = ({ error }) => {
  if (!error && !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error: any, i: number) => (
      <NoSsr>
        <ErrorStyles key={i}>
          <p data-test="graphql-error">
            <strong>Whooops!</strong>
            {error.message.replace('GraphQL error: ', '')}
          </p>
        </ErrorStyles>
      </NoSsr>
    ));
  }
  return (
    <NoSsr>
      <ErrorStyles>
        <p data-test="graphql-error">
          <strong>Whooops!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    </NoSsr>
  );
};
