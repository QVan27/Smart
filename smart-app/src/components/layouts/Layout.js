import React from "react";
import Header from '@components/Header'
import Footer from '@components/Footer'


export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

