import{Heading} from "./_components/heading";
import { Heroes } from "./_components/heroes";


export default function LandingPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col items-center justify-center 
      md:justify-start text-center gap-y-6 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
    </div>
  );
}
