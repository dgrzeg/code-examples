export const stripHtmlTags = (html: string) => html.replace(/<[^>]*>?/gm, '');

/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <T extends (...args: any) => any>(func: T, timeout = 300) => {
  let timer: string | number | NodeJS.Timeout | undefined;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const generateNewses = (
  pinnedNewses: NewsItem[],
  newses: NewsItemNode[],
  length: number = 3,
) => {
  if (pinnedNewses.length >= length) return [...pinnedNewses].slice(0, length);

  const allNewses: NewsItem[] = [...newses]
    .reduce((prev: NewsItem[], curr: NewsItemNode) => [...prev, curr.node], [...pinnedNewses])
    .slice(0, length);

  return allNewses;
};