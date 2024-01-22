import { HttpLink, InMemoryCache, ApolloClient } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

const baseUrl = (process.env.API_BASE_URL || '').replace(/\/$/, '');

if (process.env.NODE_ENV === 'development') {
  loadDevMessages();
  loadErrorMessages();
}

const link = new HttpLink({
  uri: (operation) => {
    const { site } = operation.getContext();

    const sitePart = site ? `/${site}` : '';

    const l = `${baseUrl}${sitePart}/graphql`;
    return l;
  },
});

const { getClient } = registerApolloClient(() => new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      ItemGroupContent: {
        keyFields: [],
      },
    },
  }),
  link,
}));

export default getClient;
