"use client";

import { ReactLenis } from "lenis/react";
import { Nav } from "@/components/nav";
import { RouteProgress } from "@/components/route-progress";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <RouteProgress />
      <Nav />
      {children}
    </ReactLenis>
  );
}
