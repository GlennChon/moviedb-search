import { useState, useEffect } from "react";

export default function useDebounce(val, wait = 200) {
  const [debounceVal, setDebounceVal] = useState(val);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(val);
    }, wait);

    return () => {
      clearTimeout(handler);
    };
  }, [val, wait]);
  return debounceVal;
}
