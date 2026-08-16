import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og-yuhang.png`;

  return {
    title: "与航 — 向前看",
    description: "Yu Hang’s personal journal about everyday life, travel, and the things still taking shape.",
    openGraph: {
      title: "与航 — 向前看",
      description: "Places I’ve been, and days as they unfold.",
      type: "website",
      locale: "en_US",
      images: [{ url: socialImage, width: 1672, height: 941, alt: "Yu Hang’s personal journal" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "与航 — 向前看",
      description: "Places I’ve been, and days as they unfold.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
