import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

let link = new HttpLink({
    uri: process.env.REACT_APP_RICKNOMRTY_URL
})

let cache = new InMemoryCache();
let client = new ApolloClient({
    link,
    cache
});


export default client;