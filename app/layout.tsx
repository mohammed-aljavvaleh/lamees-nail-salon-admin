import "./globals.css";
import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { QueryProvider } from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: "Lamees Nail Salon — Admin",
  description: "Nail salon appointment management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex">
        <QueryProvider>
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}