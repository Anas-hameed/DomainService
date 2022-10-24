import { useState } from "react";
import useTranslation from "next-translate/useTranslation";

export default function MyModal({ deleteConfirm, closeModal, domainName }) {
  
  const { t } = useTranslation("common");
  function handleDeleteClose() {
    deleteConfirm();
    closeModal();
  }

  return (
    <>
      <div
        className={
          "fixed bg-[#01010166] z-[1200] top-0 left-0 right-0 bottom-0"
        }
      />
      <div
        className={
          "bg-white w-[24rem] fixed top-[50%] left-[50%] z-[2200] translate-x-[-50%] shadow-xl rounded-md translate-y-[-50%]"
        }
      >
        <div className="pt-5">
          <h1 className="text-dark-blue-2 text-[1.3rem] font-medium text-center mb-5 px-5">
            {t("Delete Domain")}
          </h1>
          <p className="text-gray-500 text-center mb-3 px-5">
            {t("The hostname")}{" "}({domainName}){" "}{t("will be permanently deleted along with related aliases")}
          </p>
          <p className="text-gray-500 text-center mb-5 px-5">
            {t("If you would like to use a domain on another project, consider moving it instead")}
          </p>
          {/* <span className="text-gray-600 text-[0.8rem] px-7">
            *No aliases will be deleted
          </span> */}
          <div className="flex sm:!justify-end justify-center mt-5 py-3 px-3 border-t border-gray-300 gap-3">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md text-white border-2 border-red-500 hover:!border-red-600"
              onClick={handleDeleteClose}
            >
              {t("Delete")}
            </button>
            <button
              type="button"
              className="bg-white px-6 py-2 rounded-md text-gray-700 border-2 "
              onClick={closeModal}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
