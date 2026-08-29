import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Works } from "@/components/sections/works";
import { Capabilities } from "@/components/sections/capabilities";
import { Process } from "@/components/sections/process";
import { Stations } from "@/components/sections/stations";
import { JournalPreview } from "@/components/sections/journal-preview";
import { Recognition } from "@/components/sections/recognition";
import { Inquire } from "@/components/sections/inquire";
import { Marquee } from "@/components/marquee";
import { clients } from "@/data/site";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Works />
      <Capabilities />
      <Process />
      <Stations />
      <Marquee items={clients} />
      <JournalPreview />
      <Recognition />
      <Inquire />
    </main>
  );
}
