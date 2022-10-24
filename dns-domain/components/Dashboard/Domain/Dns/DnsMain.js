import React, { useState, Fragment } from "react";
// import TopSection from './TopSecton'
import data from "./dns.json";
import { nanoid } from "nanoid";
import ReadDnsRow from "./ReadDnsRow";
import EditDnsRow from "./EditDnsRow";
import useTranslation from "next-translate/useTranslation";

export default function DnsMain() {
  const { t } = useTranslation("common");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [dns, setDns] = useState(data);
  const [addDns, setAddDns] = useState({
    hostname: "",
    record: "",
    address: "",
    mx: "",
    ttl: "300sec",
  });
  const [editDnsId, setEditDnsId] = useState(null);
  const [editDnsData, setEditDnsData] = useState({
    hostname: "",
    record: "",
    address: "",
    mx: "",
    ttl: "300sec",
  });

  // add dns change
  const handleAddDnsChange = (event) => {
    event.preventDefault();

    const dnsName = event.target.getAttribute("name");
    const dnsValue = event.target.value;

    const newDnsData = { ...addDns };
    newDnsData[dnsName] = dnsValue;

    setAddDns(newDnsData);
  };

  // edit dns change
  const handleEditDnsChange = (event) => {
    event.preventDefault();

    const dnsName = event.target.getAttribute("name");
    const dnsValue = event.target.value;

    const newDnsData = { ...editDnsData };
    newDnsData[dnsName] = dnsValue;

    setEditDnsData(newDnsData);
  };

  // submit add dns
  const handleAddDnsSubmit = (event) => {
    event.preventDefault();

    const newDomain = {
      id: nanoid(),
      hostname: addDns.hostname,
      record: addDns.record,
      address: addDns.address,
      mx: addDns.mx,
      ttl: addDns.ttl,
    };

    const newDomains = [...dns, newDomain];
    setDns(newDomains);
  };

  // submit edit dns
  const handleEditDnsSubmit = (event) => {
    event.preventDefault();

    const editedDns = {
      id: editDnsId,
      hostname: editDnsData.hostname,
      record: editDnsData.record,
      address: editDnsData.address,
      mx: editDnsData.mx,
      ttl: editDnsData.ttl,
    };

    const newDomains = [...dns];

    const index = dns.findIndex((dnsTd) => dnsTd.id === editDnsId);

    newDomains[index] = editedDns;

    setDns(newDomains);
    setEditDnsId(null);
  };

  // edit dns id
  const handleEditClick = (event, dnsTd) => {
    event.preventDefault();
    setEditDnsId(dnsTd.id);

    const dnsFormValues = {
      hostname: dnsTd.hostname,
      record: dnsTd.record,
      address: dnsTd.address,
      mx: dnsTd.mx,
      ttl: dnsTd.ttl,
    };

    setEditDnsData(dnsFormValues);
  };

  // cancel
  const handleCancelClick = () => {
    setEditDnsId(null);
  };

  // delete dns row
  const handleDeleteClick = (dnsId) => {
    const newDomains = [...dns];

    const index = dns.findIndex((dnsTd) => dnsTd.id === dnsId);

    newDomains.splice(index, 1);

    setDns(newDomains);
  };

  // function handleAddCloseModal() {
  //   handleAddDnsSubmit();

  // }

  const modalAdd = (
    <>
      <div className="fixed bg-[#01010166] z-[1200] top-0 left-0 right-0 bottom-0" />
      <div className="bg-white w-[24rem] fixed top-[50%] left-[50%] z-[2200] translate-x-[-50%] shadow-xl rounded-md translate-y-[-50%]">
        <div className="pt-5">
          <div>
            <h1 className="text-dark-blue-2 text-[1.3rem] font-medium text-center mb-5 px-5">
              {t("Add Domain")}
            </h1>
          </div>
          <form className="flex flex-col gap-3" onSubmit={handleAddDnsSubmit}>
            <input
              className="py-2 focus:outline-gray-300 text-[0.9rem] border px-3 mx-5 rounded-md"
              type={"text"}
              name="hostname"
              required
              placeholder={t("Enter hostname")}
              onChange={handleAddDnsChange}
            />
            <input
              className="py-2 focus:outline-gray-300 text-[0.9rem] border px-3 mx-5 rounded-md"
              type={"text"}
              name="record"
              required
              placeholder={t("Enter record")}
              onChange={handleAddDnsChange}
            />
            <input
              className="py-2 focus:outline-gray-300 text-[0.9rem] border px-3 mx-5 rounded-md"
              type={"text"}
              name="address"
              required
              placeholder={t("Enter address")}
              onChange={handleAddDnsChange}
            />
            <input
              className="py-2 focus:outline-gray-300 text-[0.9rem] border px-3 mx-5 rounded-md"
              type={"number"}
              name="mx"
              required
              placeholder={t("Enter mx pref")}
              onChange={handleAddDnsChange}
            />
            <div className="flex justify-end gap-3 py-4 px-4 mt-6  border-t border-gray-300">
              <button
                className="text-blue-content py-1.5 px-6 rounded-md bg-white border-blue-content border-2"
                type="sumbit"
                onClick={() => {
                  setOpenAddModal(false);
                }}
              >
                {t("Close")}
              </button>
              <button
                className="bg-blue-content py-1.5 px-6 rounded-md text-white border-blue-content border-2"
                type="sumbit"
              >
                {t("Add")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

  const modalTransfer = (
    <>
      <div className="fixed bg-[#01010166] z-[1200] top-0 left-0 right-0 bottom-0" />
      <div className="bg-white w-[24rem] fixed top-[50%] left-[50%] z-[2200] translate-x-[-50%] shadow-xl rounded-md translate-y-[-50%]">
        <div className="pt-5">
          <div>
            <h1 className="text-dark-blue-2 text-[1.3rem] font-medium text-center mb-5 px-5">
              {t("Transfer In Domain")}
            </h1>
          </div>
          <form className="flex flex-col gap-3">
            <p className="text-gray-600 text-[0.95rem] px-5 py-2">
              {t("Enter the domain you want to transfer in")}{":"}
            </p>
            <input
              className="py-2 focus:outline-gray-300 text-[0.9rem] border px-3 mx-5 rounded-md"
              type={"text"}
              name="my-domain"
              placeholder="my-domain"
            />
            <input
              className="py-2 focus:outline-gray-300 text-[0.9rem] border px-3 mx-5 rounded-md"
              type={"text"}
              name="my-external-domain"
              placeholder="my-external-domain"
            />

            <div className="flex justify-end gap-3 py-4 px-4 mt-6  border-t border-gray-300">
              <button
                className="text-blue-content py-1.5 px-6 rounded-md bg-white border-blue-content border-2"
                type="sumbit"
                onClick={() => {
                  setOpenTransferModal(false);
                }}
              >
                {t("Close")}
              </button>
              <button
                className="bg-blue-content py-1.5 px-6 rounded-md text-white border-blue-content border-2"
                type="get"
                onClick={() => {
                  setOpenTransferModal(false);
                }}
              >
                {t("Transfer")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative">
      {/* <TopSection /> */}
      <div className="flex flex-wrap relative justify-between sm:!w-[88%] w-[98%] mx-auto py-6 align-middle items-center">
        <div>
          <h1 className="text-[1.8rem] font-semibold text-blue-content">
            {t("DNS ZONES")}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 sm:pt-0 pt-3">
          <button className=" border-2 border-blue-content py-1.5 px-7 rounded-md text-blue-content">
            {t("Buy")}
          </button>
          <button
            className=" border-2 border-blue-content py-1.5 px-7 rounded-md text-blue-content"
            onClick={() => {
              setOpenAddModal(true);
            }}
          >
            {t("Add")}
          </button>
          <button
            className=" border-2 border-blue-content py-1.5 px-7 rounded-md text-blue-content"
            onClick={() => {
              setOpenTransferModal(true);
            }}
          >
            {t("Transfer")}
          </button>
        </div>
      </div>
      {/* Table */}
      <form
        className="sm:!w-[88%] w-[98%] mx-auto overflow-x-auto shadow-md rounded-lg mb-5"
        onSubmit={handleEditDnsSubmit}
      >
        <table className=" w-full text-sm text-left text-gray-500">
          <thead className="text-[0.95rem] text-gray-700 uppercase bg-gray-200">
            <tr className=" relative align-middle">
              <th scope="col" className="py-3 px-4">
                HOSTNAME
              </th>
              <th scope="col" className="py-3 px-4">
                {t("RECORD TYPE")}
              </th>
              <th scope="col" className="py-3 px-4">
                {t("ADDRESS")}
              </th>
              <th scope="col" className="py-3 px-4">
                MX PREF
              </th>
              <th scope="col" className="py-3 px-4">
                TLL
              </th>
              <th scope="col" className="py-3 px-4">
                {t("ACTIONS")}
              </th>
            </tr>
          </thead>
          <tbody>
            {dns.map((dnsTd) => (
              <Fragment key={dnsTd.id}>
                {editDnsId === dnsTd.id ? (
                  <EditDnsRow
                    editDnsData={editDnsData}
                    handleEditDnsChange={handleEditDnsChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadDnsRow
                    dnsTd={dnsTd}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      {/* Add form modal */}

      {openAddModal && modalAdd}
      {openTransferModal && modalTransfer}
    </div>
  );
}
