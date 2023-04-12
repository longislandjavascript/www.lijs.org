import { useEffect, useState } from "react";

export function useLocalStorage<T>(storageKey: string, fallbackState: any) {
  const valueInLocalStorage =
    typeof window !== "undefined" ? localStorage?.getItem(storageKey) : null;
  const [value, setValue] = useState(
    valueInLocalStorage ? JSON.parse(valueInLocalStorage) : fallbackState
  );

  useEffect(() => {
    if (!localStorage) return;
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue] as [T, (args: Partial<T>) => T];
}
