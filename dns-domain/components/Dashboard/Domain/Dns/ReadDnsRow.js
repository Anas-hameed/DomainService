import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import DeleteDnsModal from "./DeleteDnsModal";
import {
  faTrashAlt,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTranslation from "next-translate/useTranslation";

export default function ReadDnsRow({
  dnsTd,
  handleEditClick,
  handleDeleteClick,
}) {
  const [openDelModal, setOpenDelModal] = useState(false);
  const [openMoveModal, setOpenMoveModal] = useState(false);
  const { t } = useTranslation("common");

  const modalMove = (
    <>
      <div className="fixed bg-[#01010166] z-[1200] top-0 left-0 right-0 bottom-0" />
      <div className="bg-white w-[26rem] fixed top-[50%] left-[50%] z-[2200] translate-x-[-50%] shadow-xl rounded-md translate-y-[-50%]">
        <div className="pt-5">
          <div>
            <h1 className="text-dark-blue-2 text-[1.4rem] font-medium text-center mb-5 px-5">
              {t("Move Domain")}
            </h1>
          </div>
          <form className="flex flex-col gap-3">
            <p className="text-gray-600 text-[0.9rem] px-5 py-2 text-center">
              {t("When moving the following Domain, it will be removed from all of the projects it is currently used in")}
            </p>
            <input
              className="py-2 focus:outline-gray-300 text-[0.9rem] border px-3 mx-5 rounded-md"
              type={"text"}
              name="move-domain"
              placeholder={t("Move to")}
            />

            <p className="text-gray-600 text-[0.9rem] px-5 py-2 text-center">
              {t("The Hostname")}{" "}({dnsTd.hostname}){" "}{t("will be moved and any aliases that are not associated with a project domain will be removed immediately")}
            </p>

            <div className="flex justify-end gap-3 py-4 px-4 mt-6  border-t border-gray-300">
              <button
                className="text-blue-content py-1.5 px-6 rounded-md bg-white border-blue-content border-2"
                type="sumbit"
                onClick={() => {
                  setOpenMoveModal(false);
                }}
              >
                {t("Close")}
              </button>
              <button
                className="bg-blue-content py-1.5 px-6 rounded-md text-white border-blue-content border-2"
                type="get"
                onClick={() => {
                  setOpenMoveModal(false);
                }}
              >
                {t("Move")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <>
      {openDelModal && (
        <DeleteDnsModal
          domainName={dnsTd.hostname}
          closeModal={() => {
            setOpenDelModal(false);
          }}
          deleteConfirm={() => handleDeleteClick(dnsTd.id)}
        />
      )}
      {openMoveModal && modalMove}
      <tr className="bg-white border-b hover:!bg-gray-50 !overflow-hidden">
        <td className=" py-4 px-4 w-[20%]  text-gray-800 whitespace-nowrap">
          {dnsTd.hostname}
        </td>
        <td className=" py-4 px-4 w-[15%] ">{dnsTd.record}</td>
        <td className=" py-4 px-4 w-[30%] ">{dnsTd.address}</td>
        <td className=" py-4 px-4 w-[10%] ">{dnsTd.mx}</td>
        <td className=" py-4 px-4 w-[15%] ">{dnsTd.ttl}</td>
        <td className="py-4 px-4 w-[10%] flex items-center gap-5">
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => {
              setOpenDelModal(true);
            }}
            className="text-red-600 mb-0.5 cursor-pointer"
          />
          {/* <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => { setOpenDropdown(true) }} className="text-gray-600 relative mb-0.5 cursor-pointer" /> */}
          <Popover className="relative mt-0.5">
            <Popover.Button className="focus:!outline-none">
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="text-gray-600 relative mb-0.5 cursor-pointer"
              />
            </Popover.Button>

            <Popover.Panel className="absolute bottom-0 !z-[2000] w-[15rem] right-0 drop-shadow-lg ">
              <div className="flex p-2 relative rounded-md !z-[12000] bg-white flex-col">
                <a className="text-[0.9rem] hover:bg-gray-100 !z-[1000] cursor-pointer py-2 px-3 rounded-md">
                  {t("View DNS Records & more")}
                </a>
                <a
                  onClick={() => {
                    setOpenMoveModal(true);
                  }}
                  className="text-[0.9rem] hover:bg-gray-100 !z-[1000] cursor-pointer py-2 px-3 rounded-md"
                >
                  {t("Move")}
                </a>
              </div>
            </Popover.Panel>
          </Popover>
          <button
            type="button"
            onClick={(event) => handleEditClick(event, dnsTd)}
          >
            {t("Edit")}
          </button>
          {/* <MenuSelect tablehead={false} clickone={() => setstate(true)} clicktwo={() => setstatetwo(true)}/> */}
          {/* <button type='button' onClick={() => handleDeleteClick(dnsTd.id)}>Delete</button> */}
        </td>
      </tr>
    </>
  );
}
