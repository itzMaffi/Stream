import NavLinks from './nav-links';

export default function Sidenav() {
  return (
    <div className="flex flex-col gap-2 p-4 md:h-full md:w-48">
      <div className="flex rounded-2xl bg-dawn-pattern p-4 md:h-40">
        <h1 className="leading self-end text-4xl font-semibold text-white">
          stream
        </h1>
      </div>
      <div className="flex flex-row gap-2 md:flex-col">
        <NavLinks />
      </div>
      <div className={`hidden grow rounded-2xl bg-stream-50 md:block`}></div>
    </div>
  );
}
