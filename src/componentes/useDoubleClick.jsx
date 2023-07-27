import { useState, useRef, useEffect } from 'react';

const useDoubleClick = (callback, delay = 300) => {
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef(null);

  const handleSingleClick = () => {
    setClickCount((prev) => prev + 1);
    clickTimer.current = setTimeout(() => {
      if (clickCount === 1) {
        callback();
      }
      setClickCount(0);
    }, delay);
  };

  useEffect(() => {
    return () => {
      clearTimeout(clickTimer.current);
    };
  }, []);

  return handleSingleClick;
};

export default useDoubleClick;