import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'namashukei',
  description: 'Realtime Response Gathering System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
