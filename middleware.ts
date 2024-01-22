import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { findSiteAccessByHost, HEADER_NAME_SITE_ACCESS } from '@/helpers/siteAccess';

type Middlewares = (middleware: NextMiddleware) => NextMiddleware;

const chain = (functions: Middlewares[], index = 0): NextMiddleware => {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
};

const setRequestSiteAccessIfRequired = (headers: Headers): void => {
  const siteAccess = process.env?.SITE_ACCESS
    || headers.get(HEADER_NAME_SITE_ACCESS)
    || findSiteAccessByHost(headers.get('host'));

  if (siteAccess) {
    headers.set(HEADER_NAME_SITE_ACCESS, siteAccess);
  }
};

const headersMiddleware = () => (request: NextRequest, _event: NextFetchEvent) => {
  const headers = new Headers(request.headers);

  setRequestSiteAccessIfRequired(headers);

  if (!headers.has(HEADER_NAME_SITE_ACCESS)) {
    // eslint-disable-next-line no-console
    console.warn('Could not determine site access from headers');
    return NextResponse.error();
  }

  return NextResponse.next({ request: { headers } });
};

const domainRedirectMiddleware = (middleware: NextMiddleware) => (request: NextRequest, _event: NextFetchEvent) => {
  const headers = new Headers(request.headers);
  const site = process.env.SITE_URL || 'SITE_TO_ENTER';

  if (!findSiteAccessByHost(headers.get('host'))) return NextResponse.redirect(site);

  return middleware(request, _event);
};

const middlewareFunctions = [domainRedirectMiddleware, headersMiddleware];

export default chain(middlewareFunctions);

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};
