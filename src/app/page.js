'use client';
import React from 'react';

import TopBar from "./components/home/TopBar";
import Head from "./components/home/Head";
import Content1 from "./components/home/Content1";
import Content2 from "./components/home/Content2";
import Footer from "./components/home/Footer";


export default function Home() {
  return (
    <main>
      <TopBar />
      <Head />
      <Content1 />
      <Content2 />
      <Footer />
    </main>
  );
}
