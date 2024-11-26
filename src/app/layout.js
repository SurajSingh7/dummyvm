 'use client'
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Toaster />
          <Navbar/>
          {children}
          <Footer/>
        </Provider>
      </body>
    </html>
  );
}

