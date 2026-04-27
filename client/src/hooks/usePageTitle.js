import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title
      ? `${title} — प्राण.AI`
      : 'प्राण.AI — Intelligent Health Assessment';
  }, [title]);
};

export default usePageTitle;