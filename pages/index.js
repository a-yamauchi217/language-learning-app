import Head from "next/head";
import React, { useState } from "react";

import { Inter } from 'next/font/google'
import Words from './Words'
import Genders from './Genders'

const inter = Inter({ subsets: ['latin'],  variable: '--inter-font', })

export default function Home() {

  const [page, setPage] = useState('words');

  return (
    <div className={inter.className}>
     <Head>
        <title>German words</title>
        <meta
          name="description"
          content="learn 2000 German words"
        />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {page === "words" &&  <Words onChangePage={(value) => setPage(value)} /> }
      {page === "genders" &&  <Genders onChangePage={(value) => setPage(value)} />}
    </div>
  );
}
