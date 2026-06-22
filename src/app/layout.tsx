import type { Metadata } from 'next';
import '@/shared/styles/global.scss';

export const metadata: Metadata = {
  title: 'rs-react-app',
  description: 'My App is dnd cards',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
