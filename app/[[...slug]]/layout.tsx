import { cookies } from 'next/headers';
import React, { PropsWithChildren } from 'react';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import SocialBar from '@/components/SocialBar/SocialBar';
import { SiteAccess } from '@/configs/siteaccess';
import getDepartmentMenu from '@/graphql/queries/getDepartmentMenu';
import getMenu from '@/graphql/queries/getMenu';
import useSiteConfig from '@/hooks/useSiteConfig';
import { MenuData } from '@/types/MenuTypes';

const getMenuForSiteAccess = async (siteAccess: SiteAccess): Promise<MenuData> => {
  if (siteAccess === SiteAccess.Default) {
    return getMenu(siteAccess);
  }

  return getDepartmentMenu(siteAccess);
};

const PageLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const { siteAccess } = useSiteConfig();
  const theme = cookies().get('theme')?.value ?? 'auto';

  const {
    topMenu, mainMenu, socialLinks, footerMenu,
  } = await getMenuForSiteAccess(siteAccess);

  return (
    <>
      <Header topMenuLinks={topMenu} mainMenuLinks={mainMenu} theme={theme} site={siteAccess}/>
      {children}
      <SocialBar links={socialLinks} />
      <Footer links={footerMenu} />
    </>
  );
};

export default PageLayout;
