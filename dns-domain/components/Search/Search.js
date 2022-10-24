import React from 'react'
import Seo from '../Common/Seo'

import SearchHeroSection from '../Checkout/Checkout/SearchHeroSection';
import SearchResults from '../Checkout/Checkout/SearchResults';
import {searchDomain} from '../../data/search';


export default function Search() {

  const [search, setSearchResults]= React.useState([]);
  const [domain, setDomain]= React.useState("");
  const fetchDomainData= async(domain)=>{
      const data1 ={
        "domain": domain,
        "priority": "0",
        "duration": 1,
        "ActionType": "REGISTER"
      };
      try{
        const response= await searchDomain(data1);
        console.log("Search called");
        setSearchResults(response);
      }catch(err){
        console.log("search error");
        console.log(err);
      }
  };



  return (
    <>
      <Seo title="Hostinza - Home" description="Hostinza, Share processes and data securely on a need to know basis without the need for reconciliation it combines a permissione." />
      <SearchHeroSection Domain={domain} setDomain={setDomain} fetchDomainData={fetchDomainData} />
      <SearchResults Domain={domain} SearchResults= {search}/>
    </>
  )
}