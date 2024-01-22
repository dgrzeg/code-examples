import React from 'react';
import Partner from '../Partner/Partner';
import ArticleFull from '@/components/Article/ArticleFull';
import TechnicalArticleFull from '@/components/Article/TechnicalArticleFull';
import EventFull from '@/components/Event/EventFull';
import EventsContainer from '@/components/Event/EventsContainer';
import Folder from '@/components/Folder/Folder';
import GalleryFull from '@/components/Gallery/GalleryFull';
import JobOfferFull from '@/components/JobOffer/JobOfferFull';
import JobOffersContainer from '@/components/JobOffer/JobOffersContainer';
import Loading from '@/components/Loading/Loading';
import NewsContainer from '@/components/News/NewsContainer';
import NewsFull from '@/components/News/NewsFull';
import NotFound from '@/components/NotFound/NotFound';
import Section from '@/components/Section/Section';
import Sitemap from '@/components/Sitemap/Sitemap';
import useSiteConfig from '@/hooks/useSiteConfig';
import { SearchParamsType } from '@/types/SiteTypes';

type ContentMapperProps = {
  locationId: number;
  searchParams?: SearchParamsType;
  pageType?: string;
};

const ContentMapper: React.FC<ContentMapperProps> = ({ locationId, searchParams, pageType }) => {
  const { siteAccess } = useSiteConfig();

  switch (pageType) {
    case 'ArticleFull':
      return <ArticleFull locationId={locationId} site={siteAccess} />;
    case 'NewsFull':
      return <NewsFull locationId={locationId} site={siteAccess} />;
    case 'NewsContainer':
      return (
        <React.Suspense key={`search=${searchParams?.page}`} fallback={<Loading />}>
          <NewsContainer locationId={locationId} site={siteAccess} searchParams={searchParams} />
        </React.Suspense>
      );
    case 'TechnicalArticleFull':
      return <TechnicalArticleFull locationId={locationId} site={siteAccess} />;
    case 'EventFull':
      return <EventFull locationId={locationId} site={siteAccess} />;
    case 'EventsContainer':
      return <EventsContainer locationId={locationId} site={siteAccess} searchParams={searchParams} />;
    case 'GalleryFull':
      return <GalleryFull locationId={locationId} site={siteAccess} />;
    case 'Sitemap':
      return <Sitemap locationId={locationId} site={siteAccess} />;
    case 'JobOfferFull':
      return <JobOfferFull locationId={locationId} site={siteAccess} />;
    case 'JobOffersContainer':
      return (
        <React.Suspense key={`search=${searchParams?.page}`} fallback={<Loading />}>
          <JobOffersContainer locationId={locationId} site={siteAccess} searchParams={searchParams} />
        </React.Suspense>
      );
    case 'Partner':
      return <Partner locationId={locationId} site={siteAccess} />;
    case 'Section':
      return (
        <React.Suspense key={`search=${searchParams?.page}`} fallback={<Loading />}>
          <Section locationId={locationId} site={siteAccess} searchParams={searchParams} />
        </React.Suspense>
      );
    case 'Folder':
      return (
        <React.Suspense key={`search=${searchParams?.page}`} fallback={<Loading />}>
          <Folder locationId={locationId} site={siteAccess} searchParams={searchParams} />
        </React.Suspense>
      );
    default:
      return <NotFound />;
  }
};

export default ContentMapper;
