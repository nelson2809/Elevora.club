import { Hero } from "@/components/home/Hero";
import { Prologue } from "@/components/home/Prologue";
import { Sanctuary } from "@/components/home/Sanctuary";
import { RitualGrid } from "@/components/home/RitualGrid";
import { Chapters } from "@/components/home/Chapters";

export default function Home() {
  return (
    <main className="relative z-0 bg-white">
      <Hero />
      <Prologue />
      <Sanctuary />
      <RitualGrid />
      <Chapters />
    </main>
  );
}
