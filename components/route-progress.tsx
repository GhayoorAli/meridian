"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#")) {
        return;
      }
      const nextPath = href.split("?")[0];
      if (nextPath === pathname) return;
      setActive(true);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 z-[100] h-[2px] w-full bg-line">
      <div className="h-full w-2/3 origin-left animate-pulse bg-signal" />
    </div>
  );
}
