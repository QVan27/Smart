import React from "react";
import Head from "next/head";
import Layout from "@components/layouts/Layout";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import "@styles/reset.css";
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weights: [400, 700],
})

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/signup');
  }, []);

  const renderWithLayout = Component.getLayout || (() => <Layout>
    <Component {...pageProps} />
  </Layout>);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        {renderWithLayout(<Component {...pageProps} />)}
    </>
  );
}
