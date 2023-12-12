import Sidenav from '../ui/sidenav';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen flex-col md:flex-row">
        <nav>
          <Sidenav></Sidenav>
        </nav>
        <main className="h-full grow overflow-y-scroll p-4">{children}</main>
      </div>
    </>
  );
}
