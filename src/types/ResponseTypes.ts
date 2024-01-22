export type BannerItem = {
  name: string;
  imageSmall: {
    uri: string;
  };
  imageMedium: {
    uri: string;
  };
  imageLarge: {
    uri: string;
  };
  imageBig: {
    uri: string;
  };
  internalLink: {
    _url: string;
  };
  externalLink: string;
};

export type EventItem = {
  _url: string;
  name: string;
  intro: string;
  eventStartDate: {
    timestamp: number;
  };
  eventEndDate: {
    timestamp: number;
  };
  _contentInfo: {
    publishedDate: {
      timestamp: number;
    };
    modificationDate: {
      timestamp: number;
    };
    owner: {
      name: string;
    };
  };
  _location: {
    parentLocation: {
      urlAliases: UrlAlias[];
    };
  };
};

export type EventItemNode = {
  node: EventItem;
};

export type HomepageDataResponse = {
  data: {
    content: {
      website: {
        _url: string;
        name: string;
        banners: BannerItem[];
        pinnedNewses: NewsItem[];
        shortcuts: Shortcut[];
        pinnedEvents: EventItem[];
        _contentInfo: {
          publishedDate: {
            timestamp: number;
          };
          modificationDate: {
            timestamp: number;
          };
          owner: {
            name: string;
          };
        };
        metaTitle: string;
        metaDescription: string;
      };
      newses: {
        edges: NewsItemNode[];
      };
      events: {
        edges: EventItemNode[];
      };
    };
  };
};

export type NewsItem = {
  _url: string;
  title: string;
  intro: {
    html5: string;
  };
  image: {
    fileName: string;
    uri: string;
  };
  imageNew: {
    fileName: string;
    uri: string;
  };
  _contentInfo: {
    publishedDate: {
      timestamp: number;
    };
    modificationDate: {
      timestamp: number;
    };
    owner: {
      name: string;
    };
  };
  _location: {
    parentLocation: {
      urlAliases: UrlAlias[];
    };
  };
};

export type NewsItemNode = {
  node: NewsItem;
};

export type Shortcut = {
  name: string;
  icon: string;
  link: {
    _url: string;
  };
};

export type UrlAlias = {
  path: string;
};