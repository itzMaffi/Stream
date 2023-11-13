import NavLinks from './nav-links';
export default function Sidenav() {
  return (
    <div className='w-48 h-full p-4 flex flex-col gap-2'>
      <div>FANCY SIDENAV</div>
      <NavLinks />
      <div className='grow rounded-xl bg-slate-50'></div>
    </div>
  );
}
