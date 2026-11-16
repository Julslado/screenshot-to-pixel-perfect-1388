import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * Session-only access state. Nothing is persisted: a reload resets it.
 * `ndaRequested` flips after the simulated NDA form succeeds.
 */
type AccessState = {
  ndaOpen: boolean;
  setNdaOpen: (open: boolean) => void;
  openNda: () => void;
  ndaRequested: boolean;
  markNdaRequested: () => void;
};

const AccessContext = createContext<AccessState | null>(null);

export function AccessProvider({ children }: { children: ReactNode }) {
  const [ndaOpen, setNdaOpen] = useState(false);
  const [ndaRequested, setNdaRequested] = useState(false);
  const openNda = useCallback(() => setNdaOpen(true), []);
  const markNdaRequested = useCallback(() => setNdaRequested(true), []);

  const value = useMemo(
    () => ({ ndaOpen, setNdaOpen, openNda, ndaRequested, markNdaRequested }),
    [ndaOpen, openNda, ndaRequested, markNdaRequested],
  );
  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccess must be used inside <AccessProvider>");
  return ctx;
}
