import { gql } from '@apollo/client';
import cacheConfig from '@/configs/cache';
import getClient from '@/graphql/client';
import { HomepageDataResponse } from '@/types/ResponseTypes';

const query = gql`
  query getHomepageData {
    content {
      website(urlAlias: "/") {
        id
        _url
        name
        banners {
          name
          imageSmall {
            uri
          }
          imageMedium {
            uri
          }
          imageLarge {
            uri
          }
          imageBig {
            uri
          }
          internalLink {
            _url
          }
          externalLink
        }
        pinnedNewses {
          _url
          title
          intro {
            html5
          }
          content {
            html5
          }
          image {
            fileName
            uri
          }
          imageNew {
            fileName
            uri
          }
          hideImage
          hideDate
          _contentInfo {
            publishedDate {
              timestamp
            }
            modificationDate {
              timestamp
            }
            owner {
              name
            }
          }
          _location {
            parentLocation {
              urlAliases {
                path
              }
            }
          }
        }
        shortcuts {
          name
          icon
          link {
            _url
          }
        }
        pinnedEvents {
          _url
          name
          intro
          eventStartDate {
            timestamp
          }
          eventEndDate {
            timestamp
          }
          _contentInfo {
            publishedDate {
              timestamp
            }
            modificationDate {
              timestamp
            }
            owner {
              name
            }
          }
          _location {
            parentLocation {
              urlAliases {
                path
              }
            }
          }
        }
        _contentInfo {
          publishedDate {
            timestamp
          }
          modificationDate {
            timestamp
          }
          owner {
            name
          }
        }
        metaTitle
        metaDescription
      }
      events(limit: 6, sortByField: [{ target: "event_start_date", direction: "desc" }]) {
        edges {
          node {
            _url
            name
            intro
            eventStartDate {
              timestamp
            }
            eventEndDate {
              timestamp
            }
            _contentInfo {
              publishedDate {
                timestamp
              }
              modificationDate {
                timestamp
              }
              owner {
                name
              }
            }
            _location {
              parentLocation {
                urlAliases {
                  path
                }
              }
            }
          }
        }
      }
      newses(query: { ParentLocationId: [49145] }, limit: 6, sortBy: [_datePublished, _desc]) {
        edges {
          node {
            _url
            title
            intro {
              html5
            }
            image {
              fileName
              uri
            }
            imageNew {
              fileName
              uri
            }
            _contentInfo {
              publishedDate {
                timestamp
              }
              modificationDate {
                timestamp
              }
              owner {
                name
              }
            }
            _location {
              parentLocation {
                urlAliases {
                  path
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getHomepageData = async (): Promise<HomepageDataResponse> => getClient().query({
  query,
  context: {
    fetchOptions: {
      next: cacheConfig.homepage,
    },
  },
});

export default getHomepageData;
