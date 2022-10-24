import http from "../utils/http";
import {API_ENDPOINTS} from '../config/endpoints';
import {environment} from '../config/environment';

export async function getTldPricing(variables){
    const {data} = await  http.get(`${environment.apiurl}${API_ENDPOINTS.TLDPRICING}`, {params: variables});
    return data
}

export async function createtldPricing(variables){
    const {data} = await  http.post(`${environment.apiurl}${API_ENDPOINTS.TLDPRICING}`,variables, {timeout:5000000} );
    return data
}
export async function updatetldPricing(variables){
    const {data} = await  http.put(`${environment.apiurl}${API_ENDPOINTS.TLDPRICING}`,variables, {timeout:5000000});
    return data
}

export async function deletetldPricing(variables){
    const {data} = await  http.delete(`${environment.apiurl}${API_ENDPOINTS.TLDPRICING}`, {data:variables});
    return data
}
