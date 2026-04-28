import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <h1 className={`${dmSans.className} text-6xl font-bold tracking-widest text-yellow-400 uppercase`}>
        Hervey Specter
      </h1>
    </div>
  );
}
