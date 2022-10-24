import React from "react";
import useTranslation from "next-translate/useTranslation";

import DomainCardBig from "./DomainCardBig";

const Recommendation = ({props}) => {
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col align-middle w-full gap-7 p-5 mt-5">
      <h3 className="text-black text-xl font-semibold mt-5">
        {t("Your Recommendations")}
      </h3>
      {props.map((item, index) =>{
        return <DomainCardBig CTA={true} available={item.Available=="true"?true:false} domainName={item.Domain} domainPrice={item.Price} key={index} />
      })}
    </div>
  );
};

export default Recommendation;
