import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import Seo from '../../components/Common/Seo';
import Footer from '../../components/Footer'
import DomainTable from "../../components/Dashboard/Dashboard/domains/DNSTable";
import TopSection from "../../components/Dashboard/Dashboard/domains/TopSecton";
// import CardContainer from "../../components/Dashboard/Dashboard/CardContainer";
// import SearchBar from "../../components/Dashboard/Dashboard/domains/SearchBar";
import {parseContextCookie} from '../../utils/parse-cookie'

export const getServerSideProps = async (context) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.kcToken) {
    return { redirect: { destination: '/'+context.locale+"/login-redirect?url="+context.resolvedUrl, permanent: false } };
  }
  return {
    props: {
      cookies: parseContextCookie(context?.ctx?.req),
    },
  };
};

export default function index({ fallback }){
    return(
        <>
          <Seo title="Hostinza - Home" description="Hostinza, Share processes and data securely on a need to know basis without the need for reconciliation it combines a permissione."/>
          <div className="min-h-[60vh] bg-white">

            <TopSection />
            <DomainTable />
            {/* <SearchBar /> */}
          </div>
        </>
    )
}
index.Layout = DashboardLayout;
