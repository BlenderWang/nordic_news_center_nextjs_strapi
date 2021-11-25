import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_API}`,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      }
    }
});
