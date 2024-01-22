type ContentTypeCacheConfig = {
  revalidate: number;
  tags: string[];
};

type CacheConfig = {
  article: ContentTypeCacheConfig;
  department: ContentTypeCacheConfig;
  departmentHomepage: ContentTypeCacheConfig;
  event: ContentTypeCacheConfig;
  eventsContainer: ContentTypeCacheConfig;
  gallery: ContentTypeCacheConfig;
  homepage: ContentTypeCacheConfig;
  jobOffer: ContentTypeCacheConfig;
  jobOffersContainer: ContentTypeCacheConfig;
  menu: ContentTypeCacheConfig;
  news: ContentTypeCacheConfig;
  newsContainer: ContentTypeCacheConfig;
  pageType: ContentTypeCacheConfig;
  search: ContentTypeCacheConfig;
  section: ContentTypeCacheConfig;
  sitemap: ContentTypeCacheConfig;
  technicalArticle: ContentTypeCacheConfig;
};

const cacheConfig: CacheConfig = {
  article: { revalidate: 60, tags: ['site', 'department', 'articles'] },
  department: { revalidate: 3600, tags: ['department'] },
  departmentHomepage: { revalidate: 3600, tags: ['department'] },
  event: { revalidate: 60, tags: ['site', 'department', 'events'] },
  eventsContainer: { revalidate: 600, tags: ['site', 'department', 'events'] },
  gallery: { revalidate: 60, tags: ['site', 'department', 'gallery'] },
  homepage: { revalidate: 3600, tags: ['site', 'news', 'events', 'homepage'] },
  jobOffer: { revalidate: 60, tags: ['site', 'department', 'jobs'] },
  jobOffersContainer: { revalidate: 600, tags: ['site', 'department', 'jobs'] },
  menu: { revalidate: 86400, tags: ['site', 'department', 'menu'] },
  news: { revalidate: 60, tags: ['site', 'department', 'news'] },
  newsContainer: { revalidate: 600, tags: ['site', 'department', 'news'] },
  pageType: { revalidate: 60, tags: ['site', 'department'] },
  search: { revalidate: 60, tags: ['site', 'department', 'search'] },
  section: {
    revalidate: 600,
    tags: ['site', 'department', 'section', 'article'],
  },
  sitemap: { revalidate: 3600, tags: ['site', 'department', 'sitemap'] },
  technicalArticle: {
    revalidate: 60,
    tags: ['site', 'department', 'articles'],
  },
};

export default cacheConfig;
