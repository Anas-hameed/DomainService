import http from "../utils/http";
import {API_ENDPOINTS} from '../config/endpoints'
import {environment} from '../config/environment'

export async function searchDomain(variables){
    const {data} = await  http.get(`${environment.apiurl}${API_ENDPOINTS.SEARCH}`,{params: variables});
    console.log(data);
    return data
}

