import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!key) return defaultValue;
    if (typeof window === "undefined") return defaultValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};

const useSyncedLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useLocalStorage<T>(key, initialValue);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = event.newValue
          ? JSON.parse(event.newValue)
          : initialValue;
        setStoredValue(newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue, setStoredValue]);

  return [storedValue, setStoredValue] as const;
};

export { useSyncedLocalStorage, useLocalStorage };
