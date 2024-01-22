import React from 'react';
import ContentMapper from '@/components/ContentMapper/ContentMapper';
import Department from '@/components/Department/Department';
import Homepage from '@/components/Homepage/Homepage';
import HomepageLoading from '@/components/Homepage/HomepageLoading';
import DepartmentSoa from '@/components/Soa/DepartmentSoa';
import PageTypes from '@/configs/pageTypes';
import { SiteAccess } from '@/configs/siteaccess';
import getPageType from '@/graphql/queries/getPageType';
import clearUrl from '@/helpers/clearUrl';
import useSiteConfig from '@/hooks/useSiteConfig';
import { PageTypeResponse } from '@/types/ResponseTypes';
import { SearchParamsType } from '@/types/SiteTypes';

const UrlCatcher = async ({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: SearchParamsType;
}) => {
  const { siteAccess } = useSiteConfig();

  if (!params.slug) {
    switch (siteAccess) {
      case SiteAccess.Default:
        return (
          <React.Suspense fallback={<HomepageLoading />}>
            <Homepage />
          </React.Suspense>
        );
      case SiteAccess.SOA:
        return <DepartmentSoa site={siteAccess} />;
      default:
        return <Department site={siteAccess} />;
    }
  }

  const urlSlug = `/${params.slug.join('/')}`;

  const {
    data: {
      item: {
        _contentInfo: {
          contentType: { identifier: pageId },
        },
        _location: { id: locationId },
      },
    },
  }: PageTypeResponse = await getPageType(urlSlug, siteAccess);

  return <ContentMapper locationId={locationId} searchParams={searchParams} pageType={PageTypes.get(pageId)} />;
};

export default UrlCatcher;

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const metaData = {};

  if (!params.slug) {
    return metaData;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { siteAccess, hosts } = useSiteConfig();

  const urlSlug = slug ? `/${slug.join('/')}` : '/';

  const {
    data: {
      item: { _url: url, _name: name },
    },
  }: PageTypeResponse = await getPageType(urlSlug, siteAccess);

  metaData.title = `${metaData.title} - ${name}`;

  const currentUrl = clearUrl(url);

  if (currentUrl !== urlSlug) {
    const siteURL = hosts[0];

    return {
      ...metaData,
      alternates: {
        canonical: `https://${siteURL}${currentUrl}`,
      },
    };
  }

  return metaData;
}
