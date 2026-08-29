"use client";

import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { RouteProgress } from "@/components/route-progress";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteProgress />
      <Cursor />
      <Nav />
      {children}
    </>
  );
}
