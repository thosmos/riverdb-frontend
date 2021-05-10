/**
 * Apollo Client etc
 */
import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

console.log("NODE_ENV", process.env.NODE_ENV, "VUE_APP_USE_REMOTE_GQL", process.env.VUE_APP_USE_REMOTE_GQL)
// Allows using remote server in development by setting VUE_APP_USE_REMOTE_SERVER=true
const gql_url = (process.env.NODE_ENV === 'development' && process.env.VUE_APP_USE_REMOTE_GQL !== 'true') ? 'http://' + window.location.hostname + ':8989/graphql' : 'https://gql.riverdb.org/graphql';

const httpLink = new HttpLink({
  uri: gql_url
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
