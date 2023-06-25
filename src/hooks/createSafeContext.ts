import { createContext, useContext } from "react";

function createSafeContext<TValue>() {
  const context = createContext<TValue | undefined>(undefined);

  function useContextRes() {
    const value = useContext(context);
    if (value === undefined) {
      throw new Error("useContext must be inside a Provider with a value");
    }
    return value;
  }

  return [useContextRes, context.Provider] as const;
}

export default createSafeContext;
