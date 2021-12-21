import { useState, useEffect } from "react"
import { useWindowEvent } from "./useWindowEvent";

export const useLocalStorage = (key: string) => {
    // initialize the value from localStorage
    const [currentValue, setCurrentValue] = useState<string | null>(() =>
      localStorage.getItem(key)
    );
  
    const handler = (e: StorageEvent) => {
      if (
        e.storageArea === localStorage &&
        e.key === key &&
        e.newValue !== currentValue
      ) {
        setCurrentValue(e.newValue);
      }
    };
  
    // set up the event listener
    useWindowEvent('storage', handler);
  
    // update localStorage when the currentValue changes via setCurrentValue
    useEffect(() => {
      localStorage.setItem(key, currentValue || '');
    }, [key, currentValue]);
  
    // use as const to tell TypeScript this is a tuple
    return [currentValue, setCurrentValue] as const;
}