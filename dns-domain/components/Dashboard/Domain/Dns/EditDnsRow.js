import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function EditDnsRow({
  editDnsData,
  handleEditDnsChange,
  handleCancelClick,
}) {
  const { t } = useTranslation("common");
  return (
    <tr className="group !bg-gray-300 border-b hover:!bg-gray-300 ">
      <td className="py-2 px-2 text-gray-800 whitespace-nowrap">
        <input
          className="group-hover:!bg-gray-50 focus:!outline-offset-0 focus:outline-gray-200 w-full py-2 px-2 !bg-white"
          type={"text"}
          name="hostname"
          required
          placeholder="Enter hostname"
          value={editDnsData.hostname}
          onChange={handleEditDnsChange}
        />
      </td>
      <td className="py-2 px-2 !w-[2px]">
        <input
          className="group-hover:!bg-gray-50 focus:!outline-offset-0 focus:outline-gray-200 w-full py-2 px-2 !bg-white"
          type={"text"}
          name="record"
          required
          placeholder="Enter record"
          value={editDnsData.record}
          onChange={handleEditDnsChange}
        />
      </td>
      <td className="py-2 px-2 ">
        <input
          className="group-hover:!bg-gray-50 focus:!outline-offset-0 focus:outline-gray-200 w-full py-2 px-2 !bg-white"
          type={"text"}
          name="address"
          required
          placeholder="Enter address"
          value={editDnsData.address}
          onChange={handleEditDnsChange}
        />
      </td>
      <td className="py-2 px-2">
        <input
          className="group-hover:!bg-gray-50 focus:!outline-offset-0 focus:outline-gray-200 w-full py-2 px-2 !bg-white"
          type={"number"}
          name="mx"
          required
          placeholder="Enter mx pref"
          value={editDnsData.mx}
          onChange={handleEditDnsChange}
        />
      </td>
      <td className="py-2 px-2">300sec</td>
      <td className="py-4 px-4 flex gap-3">
        <button className="underline text-blue-content" type="submit">
          {t("Save")}
        </button>
        <button
          className="underline text-blue-content"
          type="button"
          onClick={handleCancelClick}
        >
          {t("Cancel")}
        </button>
      </td>
    </tr>
  );
}
