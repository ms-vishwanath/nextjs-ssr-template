import React from "react";
import { Toaster } from "sonner";
export default function GlobalProviders({ children }: { children: any }) {
  return (
    <>
      {children}
      <Toaster richColors className=""/>
    </>
  );
}
