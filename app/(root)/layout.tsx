import GlobalProviders from "@/providers/GlobalProviders";
import React from "react";

export default function Layout({ children }: { children: any }) {
  return <GlobalProviders>{children}</GlobalProviders>;
}
