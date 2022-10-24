import dynamic from "next/dynamic";
import React from "react";
import Layout from "../components/Landing/Layout";
import Seo from "../components/Common/Seo";

const SearchDomain = dynamic(() => import("../components/Landing/Home/SearchDomain"))
import { getBlogs, getBlogsKey } from '../data/blogs';
// import { getPlans, getPlansKey } from '../data/plans';

// import HostinzaNetworkMap from "../components/Landing/Home/HostinzaNetworkMap"
import { SWRConfig } from "swr";


export const getStaticProps = async () => {
  const blogs = await getBlogs()
  return {
    props: {
      fallback: {
        [getBlogsKey]: blogs,
      },
    },
  };
};

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Seo title="Hostinza - Home" description="Hostinza, Home" />
      <SearchDomain />
    </SWRConfig>
  );
}
Home.Layout = Layout;
