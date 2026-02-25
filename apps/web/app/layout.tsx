import "../styles/globals.css";

const siteUrl = "https://shipcru.com";
const title = "ShipCru";
const description =
  "Where the finest crews ship product and launch careers of the highest distinction.";

export const metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ShipCru — Where the finest crews ship product and launch careers of the highest distinction.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark-mode">
      <head>
        <meta name="theme-color" content="#101218" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary-solid text-white antialiased">
        {children}
      </body>
    </html>
  );
}
