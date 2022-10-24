import React from "react";
import DashboardLayout from "../../components/Dashboard/Dashboard/DashboardLayout";
import DomainMain from "../../components/Dashboard/Domain/DomainMain";

export default function index() {
  return (
    <>
      <DomainMain />
    </>
  );
}
index.Layout = DashboardLayout;
