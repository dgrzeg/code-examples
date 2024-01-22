import { RefObject, useLayoutEffect, useState } from 'react';

const useIsOverflow = (ref:RefObject<HTMLElement>, isDropdownVisible:boolean) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const [overflowHeight, setOverflowHeight] = useState(0);
  const [overflowWidth, setOverflowWidth] = useState(0);

  useLayoutEffect(() => {
    const { current } = ref;

    if (!current) return;

    setIsOverflow(
      current.getBoundingClientRect().right > window.innerWidth
      || current.getBoundingClientRect().bottom > window.innerHeight,
    );
    setOverflowWidth(Math.ceil(current.getBoundingClientRect().right - window.innerWidth + 15));
    setOverflowHeight(Math.ceil(current.getBoundingClientRect().bottom - window.innerHeight - 27));
  }, [ref, isDropdownVisible]);

  return {
    isOverflow, overflowHeight, overflowWidth,
  };
};

export default useIsOverflow;
