import react, { component } from 'react';
import { appprops } from "next/app";
import head from "next/head";
import { apolloprovider } from "@apollo/client";
import { useapollo } from "src/apollo";
import { authprovider } from "src/auth/useauth";
import "../styles/index.css";

export default function myapp({ component, pageprops }: appprops) {
  const client = useapollo();

  return (
    <authprovider>
      <apolloprovider client={client}>
        <head>
          <title>home sweet home</title>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <component {...pageprops} />
      </apolloprovider>
    </authprovider>
  );
}