import { Suspense } from 'react';
import Navbar from './components/Navbar'
import Provider from './components/Provider'
import './globals.css'
import { Poppins } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Loading from './loading';

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata = {
  title: 'ORU Phones | Assignement',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextTopLoader
          showSpinner={false}
          color="currentColor"
          height={4}
          crawl={true}
          shadow="0 0 10px currentColor,0 0 5px currentColor"
        />
        <Provider>
          <Navbar />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </Provider>
      </body>
    </html>
  )
}
