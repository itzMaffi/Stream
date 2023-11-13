import Sidenav from '../ui/sidenav';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen">
        <nav>
          <Sidenav></Sidenav>
        </nav>
        <main className="h-full grow overflow-y-scroll">{children}</main>
      </div>
    </>
  );
}
