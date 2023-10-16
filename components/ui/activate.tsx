"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { Slot } from "@radix-ui/react-slot";

const activateContext = createContext({
  activate: false,
  setActivate: (activate: boolean) => {},
});

const useActivate = () => {
  const context = useContext(activateContext);
  if (context === undefined) {
    throw new Error("useActivate must be used within a Activate");
  }
  return context;
};

export function Activate({ children }: { children: ReactNode }) {
  const [activate, setActivate] = useState(false);

  return (
    <activateContext.Provider
      value={{
        activate,
        setActivate,
      }}
    >
      {children}
    </activateContext.Provider>
  );
}

export function ActivateTrigger({ children }: { children: ReactNode }) {
  const { activate, setActivate } = useActivate();

  return <Slot onClick={() => setActivate(!activate)}>{children}</Slot>;
}

export function ActivateContent({ children }: { children: ReactNode }) {
  const { activate } = useActivate();

  return activate && children;
}
