import NavLinks from './nav-links';

export default function Sidenav() {
  return (
    <div className="w-48 h-full p-4 flex flex-col gap-2">
      <div className="h-40 p-4 rounded-2xl bg-stream-200">STREAM</div>
      <NavLinks />
      <div className={`grow rounded-2xl bg-stream-200`}></div>
    </div>
  );
}
