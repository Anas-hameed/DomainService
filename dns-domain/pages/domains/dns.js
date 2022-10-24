import React from "react";
import DashboardLayout from "../../components/Dashboard/Dashboard/DashboardLayout";
import DnsMain from "../../components/Dashboard/Domain/Dns/DnsMain";

export default function index() {
  return (
    <>
    <DnsMain />
    {/* <DNSTable /> */}
    </>
  );
}
index.Layout = DashboardLayout;

