import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";
import cookie from "cookie";
import * as React from "react";
import { useState} from "react";
import AuthContext from "../utils/auth-context";
import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = process.env.NEXT_PUBLIC_ANALYTICS_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID;

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps, cookies }) {

  React.useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }, []);
  


  const Layout = (Component).Layout || Noop;
  const [user, setUser] = useState({});
  const value = { user, setUser };

  const keycloakCfg = {
    url: process.env.NEXT_PUBLIC_AUTH_URL,
    realm: process.env.NEXT_PUBLIC_AUTH_REALM,
    clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
  };
  return (
    <>
        <AuthContext.Provider value={value}>
          <SSRKeycloakProvider
            keycloakConfig={keycloakCfg}
            persistor={SSRCookies(cookies)}
          >
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </SSRKeycloakProvider>
        </AuthContext.Provider>
    </>
  );
}
function parseCookies(req) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
}

export async function getStaticProps(context) {
  return {
    props: {
      cookies: parseCookies(context?.ctx?.req),
    },
  };
}
export default MyApp;
