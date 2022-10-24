import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import Seo from '../../components/Common/Seo';
import CardContainer from "../../components/Dashboard/Dashboard/CardContainer"
import {parseContextCookie} from '../../utils/parse-cookie'
import TopSection from "../../components/Dashboard/Dashboard/TopSection"

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

export default function Index({ fallback }){

    return(
        <>
        <Seo title="Hostinza - Home" description="Hostinza, Share processes and data securely on a need to know basis without the need for reconciliation it combines a permissione."/>
        <div className="min-h-[80vh]">
          <TopSection />
          <CardContainer />
        </div>
        </>
    )
}

Index.Layout =DashboardLayout;