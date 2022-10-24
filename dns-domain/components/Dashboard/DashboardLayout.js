import React,{useEffect,useCallback} from "react";
import Header from "./Header";
import DashboardNav from "./Dashboard/DashboardNav";
import { useKeycloak } from "@react-keycloak/ssr";
import Footer  from "../Footer"
import { setToken } from "../../utils/auth";

export default function DashboardLayout({ children }) {
  const { keycloak } = useKeycloak();
  const refreshToken=useCallback(()=> {
    var token=keycloak?.token;
    setToken(token)
  },[keycloak])

  useEffect(() => {
    setInterval(() => {
      refreshToken()
    }, 3000);
  }, [refreshToken]);

  

  return (
    <>
      <div className="bg-[#FAFAFA]">
        <Header />
        <DashboardNav />
        {children}
        <Footer />
      </div>
    </>
  );
}
