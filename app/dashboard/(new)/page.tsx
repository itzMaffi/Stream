import ThoughtInput from '../../ui/thought-input';

export default function New() {
  return (
    <div className="flex h-full flex-col">
      <h1 className="sticky top-0 z-10 hidden rounded-xl bg-stream-50 px-4 py-8 text-2xl text-stream-800 md:block">
        New
      </h1>
      <div className="flex grow items-center justify-center">
        <ThoughtInput></ThoughtInput>
      </div>
    </div>
  );
}
