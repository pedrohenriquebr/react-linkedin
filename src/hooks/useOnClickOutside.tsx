import { RefObject, useEffect } from "react";

export function useOnClickOutside<T extends HTMLElement>(modalRef:RefObject<T>, handler:(event: Event)=> void , buttonRef?:RefObject<T>) {    
    useEffect(
      () => {
        const listener = (event: Event) => {
          // Do nothing if clicking ref's element or descendent elements
          if(!modalRef.current ) {
              return 
          }


          if (!modalRef.current || ( modalRef.current?.contains(event.target as Node))) {
            return;
          }

          if(buttonRef?.current?.contains(event.target as Node)){
            return
          }

          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [modalRef, handler]
    );

}

