import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CT Appliance Repair | Same-Day Service Across Connecticut",
  description: "Connecticut's most trusted appliance repair company. We fix washers, dryers, refrigerators, dishwashers & ovens across all 169 CT towns. Licensed, insured, 90-day warranty. Call (800) 555-0123.",
  keywords: "appliance repair Connecticut, washer repair CT, dryer repair CT, refrigerator repair Connecticut, same day appliance repair",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-blue-50">{children}</body>
    </html>
  );
}
