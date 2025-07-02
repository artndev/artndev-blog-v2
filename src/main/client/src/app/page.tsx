import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-[max-content]">
        <h1 className="text-5xl font-semibold leading-none hanken-grotesk transition-[letter-spacing_.25s] hover:tracking-wide">
          <Link href="#">
            Diary of my mind
          </Link>
        </h1>
      </div>
    </div>
  );
}
