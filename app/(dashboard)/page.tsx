import ThoughtInput from "../ui/thought-input";

export default function New() {
  return (
    <div className="h-full flex flex-col">
      <div className="z-10 sticky top-0 bg-white pt-4">
        <h1 className="hidden md:block px-4 py-8 z-11  bg-stream-50 rounded-xl text-2xl text-stream-800">
          New
        </h1>
      </div>
      <div className="grow flex items-center justify-center">
        <ThoughtInput></ThoughtInput>
      </div>
    </div>
  );
}
