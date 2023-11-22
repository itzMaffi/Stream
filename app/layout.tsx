import type { Metadata } from "next";
import { comfortaa } from "./ui/fonts";
import "./ui/globals.css";

export const metadata: Metadata = {
  title: "Stream",
};

// TODO: Change it to: export default function RootLayout(props: IRootLayoutProps)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // TODO: Remove any "anytype" from the code
    <html lang="en">
      <body className={`${comfortaa.className}`}>{children}</body>
    </html>
  );
}
