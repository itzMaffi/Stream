import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <h1 className="mx-2 bg-dawn-pattern bg-clip-text text-8xl font-bold text-transparent">
        stream
      </h1>
      <h3 className="mx-2 text-center text-xl text-slate-500">
        The journaling app where every edit tells a story
      </h3>
      <Link
        href={'/dashboard'}
        className="my-16 rounded-lg bg-dawn-pattern px-4 py-2 text-xl font-semibold text-white"
      >
        Start writing
      </Link>
    </div>
  );
}
