import type { Metadata } from 'next';
import './globals.css';
import { poppins } from './ui/fonts';
import { PlacesProvider } from './context/placesContext';

export const metadata: Metadata = {
  title: 'Places near me',
  description: 'Show places near my location',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <PlacesProvider>{children}</PlacesProvider>
      </body>
    </html>
  );
}
