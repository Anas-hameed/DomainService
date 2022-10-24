import http from "../utils/http";
import {API_ENDPOINTS} from '../config/endpoints';
import {environment} from '../config/environment';

export async function getdnsRecords(variables){
    const {data} = await  http.get(`${environment.apiurl}${API_ENDPOINTS.DNSRECORD}`, variables);
    return data
}

export async function createDnsRecord(variables){
    const {data} = await  http.post(`${environment.apiurl}${API_ENDPOINTS.DNSRECORD}`,variables );
    return data
}
export async function updateDnsRecord(id, variables){
    const {data} = await  http.patch(`${environment.apiurl}${API_ENDPOINTS.DNSRECORD}/${id}`,variables);
    return data
}

export async function deleteDnsRecord(id, variables){
    const {data} = await  http.delete(`${environment.apiurl}${API_ENDPOINTS.DNSRECORD}/${id}`, variables);
    return data
}
