import "../styles/globals.css";

export const metadata = {
  title: "ShipCru",
  description: "Coming Soon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-white antialiased">{children}</body>
    </html>
  );
}
