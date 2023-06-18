import Navbar from './navbar';
import Footer from './footer';
import '../../../app/globals.scss'
import { Container, Card, Row, Text , css ,Spacer } from "@nextui-org/react";
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Container
        fluid = {true}
        css={{ 
          borderRadius: '$xs', // radii.xs
          border: '$space$1 solid transparent',
          background: '#FFF', // colors.pink800
          padding: '0px',
          minHeight: '100vh',
          maxWidth: '1400px',
        }}
      >
        <Navbar />
        <Container>
        {children}
        </Container>
        {/* <div>{children}</div> */}
        <Spacer y={3} />
      </Container>
    </>
    
    
  );
}