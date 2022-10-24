import React from 'react'
import Head from "next/head";
import { siteSettings } from '../../config/site-setting';
export default function Seo({title,description}) {
  return (
    <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={siteSettings.logo.url} />
        {/* <meta property="og:url" content={siteSettings.logo.url} /> */}
        <meta name="twitter:site" content="@hostinza" />
        <meta name="twitter:handle" content="@hostinza" />
        <meta name="twitter:title" content={description} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={siteSettings.logo.url} />
    </Head>
  )
}
