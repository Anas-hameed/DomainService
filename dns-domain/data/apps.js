import http from "../utils/http";
import {API_ENDPOINTS} from '../config/endpoints'
import {faPlay,faPause,faTrash,faRepeat} from '@fortawesome/free-solid-svg-icons'
import useSWR from 'swr'
import {checkResponseCode} from '../utils/auth'

async function getApps(...args){
    try{
        const {data}  = await http.get(...args)
    
        return data
    }catch(e){
        checkResponseCode(e)
    }
}

export function useAppsQuery(options){
    return useSWR(API_ENDPOINTS.APPS,getApps)
}

async function getAppsByName(...args){
    const url=args[0]+"/"+args[1]
    try{
        const {data}  = await http.get(url)
    
        return data
    }catch(e){
        checkResponseCode(e)
    }
}

export function useAppsByNameQuery(options){
    return useSWR([API_ENDPOINTS.APPS,options],getAppsByName)
}

async function getEndpoints(...args){
    try{
        const {data}  = await http.get(...args)

        return data
    }catch(e){
        checkResponseCode(e)
    }
}

export function useEndpointsQuery({id}){
    return useSWR(`${API_ENDPOINTS.ENDPOINTS}/${id}/stacks`,getEndpoints)
}

export async function addEndpoint(variables){
    const {id}=variables
    return http.post(`${API_ENDPOINTS.ENDPOINTS}/${id}/stacks`, variables)
}

export function getEndpointKey({id}){
    return `${API_ENDPOINTS.ENDPOINTS}/${id}/stacks`
}


export function useEndpointActionMutation(){
    return useMutation(endpointAction)
}
export async function endpointAction({id,type,stack_id,domain}){
    console.log(id,type,stack_id,domain,'id,type,stack_id,domain')
    if(type==='DELETE'){
        return http.delete(`${API_ENDPOINTS.ENDPOINTS}/${stack_id}/stacks/${id}`)
    }else if(type==="REDEPLOY"){
        var inputs={
            app:"testapp2",
            env:[{
                name:"DOMAIN",
                value:domain,
            }]
        }
        return http.post(`${API_ENDPOINTS.ENDPOINTS}/${stack_id}/stacks/${id}/redeploy`,inputs)
    }else if(type==="STOP"){
        return http.post(`${API_ENDPOINTS.ENDPOINTS}/${stack_id}/stacks/${id}/stop`)
    }else if(type==="START"){
        return http.post(`${API_ENDPOINTS.ENDPOINTS}/${stack_id}/stacks/${id}/start`)
    }
}

export const btnAction=[
    {
        name:'start',
        key:'START',
        icon:faPlay,
        class:'text-dark-blue-2'
    },
    {
        name:'stop',
        key:'STOP',
        icon:faPause,
        class:'text-dark-blue-2'
    },
    {
        name:'redeploy',
        key:'REDEPLOY',
        icon:faRepeat,
        class:'text-dark-blue-2'
    },
    {
        name:'delete',
        key:'DELETE',
        icon:faTrash,
        class:'text-red-500'
    },
]
