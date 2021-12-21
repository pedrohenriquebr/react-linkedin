import { useRef, useEffect } from "react";
import { WindowEventHook } from "./props";

export const useWindowEvent: WindowEventHook  = (eventName , handler)  => {
    // optimization: using useRef here helps us guarantee that this function is
    // is only mutated during effect lifecycles, adding some assurance that the
    // function invoked by the event listener is the same function passed to the
    // hook.
    const handlerRef = useRef<typeof handler>();
  
    useEffect(() => {
      handlerRef.current = handler;
    }, [handler]);
  
    useEffect(() => {
        
      const eventListener: typeof handler = event => handlerRef?.current ? handlerRef?.current(event) : null;
      window.addEventListener(eventName, eventListener);
  
      return () => {
        window.removeEventListener(eventName, eventListener);
      };
    }, [eventName]);
};
  