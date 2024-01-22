import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { FC, PropsWithChildren } from 'react';

export type LinkProps = PropsWithChildren<
NextLinkProps & {
  external?: boolean
  withIcon?: boolean
  className?: string
  title?: string
  itemProp?: string
  id?: string
  role?: string
  rel?: string
  tabIndex?: number
  scroll?: boolean
}
>;

const Link: FC<LinkProps> = ({
  className = '',
  title = '',
  external = false,
  withIcon = false,
  scroll = true,
  prefetch = false,
  children,
  ...props
}) => {
  const externalProps = external
    ? {
      rel: 'noopener noreferer',
      target: '_blank',
      className: `${className} ${withIcon ? 'safe-link' : ''}`,
      title,
      scroll,
      prefetch,
    }
    : {
      className, title, scroll, prefetch,
    };

  return (
    <NextLink {...props} {...externalProps}>
      {children}
    </NextLink>
  );
};

export default Link;
