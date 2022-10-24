import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { useKeycloak } from "@react-keycloak/ssr";
import useTranslation from "next-translate/useTranslation";
import Cookies from "js-cookie";

const Redirect = () => {

    const router= useRouter()
    const { keycloak } = useKeycloak();
    const { t ,lang} = useTranslation("common");

    useEffect(() => {
        loginUser()
    });
    function loginUser(){
        router.query.url
        if (keycloak) {
            if(router.query?.url){
                Cookies.set('redirect_url',router.query?.url)
            }
            Cookies.set('lang',lang)
            
            window.location.href = keycloak.createLoginUrl({
                redirectUri:window.location.origin+'/'+lang+'/dashboard/redirect?url='+(router.query.url?router.query.url:''),
                locale:lang?lang:'en'
            });
        }
    }

    return (
        <div className='center-out'>
            <Image src="/images/loading.gif" alt="loading page" width="200" height="200" />
      </div>
    );
}

export default Redirect;
