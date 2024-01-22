import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { FC } from 'react';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) => (typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str));

type ImageProps = NextImageProps & {
  noplaceholder?: boolean
};

const Image: FC<ImageProps> = ({ noplaceholder = false, ...rest }) => {
  const width = Number(rest.width || 700);
  const height = Number(rest.height || 475);
  const validSrc = typeof rest.src === 'string' && typeof window === 'undefined'
    ? `${process.env.API_BASE_URL}${encodeURI(rest.src)}`
    : `https://...........${encodeURI(rest.src as string)}`;
  const imageProps = { ...rest, src: typeof rest.src === 'string' ? validSrc : rest.src };

  if (noplaceholder) return <NextImage {...imageProps} />;

  return (
    <NextImage
      {...imageProps}
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
    />
  );
};

export default Image;
