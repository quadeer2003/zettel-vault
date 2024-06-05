import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Timeline } from "./_components/timeline";
import { TypingEffect } from "./_components/type-writer";


export default function LandingPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col items-center justify-center 
      md:justify-start  gap-y-2 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
        <TypingEffect />
        <Timeline />
      </div>
    </div>
  );
}
