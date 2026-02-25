import "../styles/globals.css";

export const metadata = {
  title: "ShipCru",
  description: "Ship code with your cru.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark-mode">
      <body className="bg-bg-primary-solid text-white antialiased">
        {children}
      </body>
    </html>
  );
}
