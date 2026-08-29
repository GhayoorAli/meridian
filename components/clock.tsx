"use client";

import { useEffect, useState } from "react";

export function CityClock({
  timeZone,
  label,
}: {
  timeZone: string;
  label?: string;
}) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span className="tabular-nums">
      {label ? `${label} ` : ""}
      {time}
    </span>
  );
}
