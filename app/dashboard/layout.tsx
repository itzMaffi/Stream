import Sidenav from '../ui/sidenav';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Sidenav></Sidenav>
      </nav>
      <main className="h-full">{children}</main>
    </>
  );
}
