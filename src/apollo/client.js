import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const gql_url = 'https://gql.riverdb.org/graphql';

const httpLink = new HttpLink({
  uri: gql_url
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
