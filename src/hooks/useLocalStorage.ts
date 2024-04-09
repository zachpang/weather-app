import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useLocalStorage<S>(
  key: string,
  fallbackState: S,
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(() => {
    const item = localStorage.getItem(key);

    if (!item) return fallbackState;

    return JSON.parse(item) as S;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
