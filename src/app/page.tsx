import Container from "@/components/container";
import Hero from "@/components/hero";
import Search from "@/components/search";
import TypeWriter from "@/components/type-write";

export default function Home() {
  return (
    <div>
      <div className="container">
        <TypeWriter text="Full Quran" />

        <Search />

        <Hero />
      </div>
    </div>
  );
}
