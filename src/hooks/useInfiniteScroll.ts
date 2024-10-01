import { useEffect } from 'react';

const useInfiniteScroll = (callback: () => void, ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        if (scrollTop + clientHeight >= scrollHeight - 60) {
          callback();
        }
      }
    };

    const container = ref.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [callback, ref]);
};

export default useInfiniteScroll;
