/**
 * Apollo Client etc
 */
import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

console.log("NODE_ENV", process.env.NODE_ENV);

// let gql_url = process.env.NODE_ENV === 'development' ? 'http://localhost:8989/graphql' : 'https://gql.riverdb.org/graphql';

const gql_url = process.env.NODE_ENV === 'development' ? 'http://' + window.location.hostname + ':8989/graphql' : 'https://gql.riverdb.org/graphql';
console.log("gql_url", gql_url);

const httpLink = new HttpLink({
  uri: gql_url
  //uri: "https://gql.riverdb.org/graphql"
  // uri: "https://graphql.riverdb.org/graphql"
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

// Install the vue plugin
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default apolloProvider;
