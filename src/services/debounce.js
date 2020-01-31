import React, { useState, useEffect } from "react";

export default function useDebounce(val, wait) {
  const [debounceVal, setDebounceVal] = useState(val);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(val);
    }, wait);

    return () => {
      clearTimeout(handler);
    };
  }, [val]);
  return debounceVal;
}
