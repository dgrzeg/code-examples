import './globals.css';
import { cookies } from 'next/headers';
import FacebookPixel from '@/components/FacebookPixel/FacebookPixel';
import GoogleAnalitics from '@/components/GoogleAnalitics/GoogleAnalitics';
import GoogleTagManager from '@/components/GoogleTagManager/GoogleTagManager';
import { defineSiteAccessCss } from '@/helpers/siteAccess';
import useSiteConfig from '@/hooks/useSiteConfig';

export const metadata = {
  // TODO metadata
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const theme = cookies().get('theme')?.value ?? 'auto';

  const { siteAccess } = useSiteConfig();

  return (
    <html lang="pl" data-theme={theme} data-site={defineSiteAccessCss(siteAccess)}>
      <body>
        <GoogleTagManager />
        <GoogleAnalitics />
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
};
export default RootLayout;
