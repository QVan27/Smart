import React from "react";
import Head from "next/head";
import Layout from "@components/layouts/Layout";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import "@styles/reset.css";
import "@styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) router.push('/');
    else router.push('/auth/signin');
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
