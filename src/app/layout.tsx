import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DataBox — Data Engineering Algorithms & Structures",
    template: "%s · DataBox",
  },
  description:
    "Interactive visualization platform for data engineering algorithms and data structures. Sorting, searching, graphs, hashing, MapReduce, Bloom filters and more.",
  keywords: [
    "algorithms",
    "data structures",
    "data engineering",
    "visualization",
    "sorting",
    "mapreduce",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans min-h-screen bg-dark-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
