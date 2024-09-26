import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@styles/globals.css';
import ToasterContext from '@contexts/ToasterContext';
import AuthContext from '@contexts/AuthContext';
import ActiveStatus from '@components/ActiveStatus';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Messenger",
  description: "Created by Hung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
