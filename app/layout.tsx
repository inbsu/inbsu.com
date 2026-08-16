import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og-yuhang.png`;

  return {
    title: "与航 — 生活、旅行与未来计划",
    description: "与航的个人生活志，记录日常、旅行见闻和那些正在慢慢靠近的计划。",
    openGraph: {
      title: "与航 — 生活、旅行与未来计划",
      description: "记录走过的路，和正在发生的日子。",
      type: "website",
      locale: "zh_CN",
      images: [{ url: socialImage, width: 1672, height: 941, alt: "与航的个人生活志" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "与航 — 生活、旅行与未来计划",
      description: "记录走过的路，和正在发生的日子。",
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
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
