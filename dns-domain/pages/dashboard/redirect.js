import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setUser,setToken } from '../../utils/auth';
import Image from 'next/image'
import { useKeycloak } from "@react-keycloak/ssr";
import useTranslation from "next-translate/useTranslation";
import Cookies from "js-cookie";

const Redirect = () => {

    const router= useRouter()
    const { t ,lang} = useTranslation("common");

    const { keycloak } = useKeycloak();

    useEffect(() => {
        if (keycloak) {
          keycloak.loadUserProfile().then(() => {
            setToken(keycloak?.token)
            setUser(keycloak?.profile)
            var redirect_url=Cookies.get('redirect_url')
            var lan=Cookies.get('lang')
            console.log(redirect_url,lan)
            if(router.query.url){
              router.push('/'+lang+router.query.url)
            }else{
              router.push('/'+lang+'/dashboard')
            }
          })
        }
      });
    return (
        <div className='center-out'>
            <Image src="/images/loading.gif" alt="loading page" width="200" height="200" />
      </div>
    );
}

export default Redirect;
