import NavLinks from './nav-links';

export default function Sidenav() {
  return (
    <div className="md:w-48 md:h-full p-4 flex flex-col gap-2">
      <div className="md:h-40 p-4 rounded-2xl bg-dawn-pattern flex">
        <h1 className="text-white self-end text-4xl leading font-semibold">
          stream
        </h1>
      </div>
      <div className="flex gap-2 addmd:flex-col flex-row">
        <NavLinks />
      </div>
      <div className={`hidden md:block grow rounded-2xl bg-stream-50`}></div>
    </div>
  );
}
