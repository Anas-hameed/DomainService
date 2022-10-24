const CustomError = require('../../utils/customErrorHandler');
const resolveResponse= require('../../utils/promisefyResult');
const namecheap= require('../../utils/nameCheapConfig');
const {validationResult}= require('express-validator');


const dns_get_host= async (req,res, next)=>{
    const {domainName}= req.query;
    if(!domainName){
        return next(new CustomError(400, 'Bad Request domainName is required'));
    }
    const result = await resolveResponse(domainName, namecheap.domains.dns.getHosts);
    if(!result){
        return next(new CustomError(500, 'Internal Server Error', result));
    }
    if(!result?.DomainDNSGetHostsResult?.host){
        return next(new CustomError(404, 'Not Found', result));
    }

    let dns_get_host= result.DomainDNSGetHostsResult.host;
    if(!(Array.isArray(dns_get_host))){
        dns_get_host=[dns_get_host];
    }



    res.status(200).json(dns_get_host);
}


const dns_post_host= async (req,res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new CustomError(400, 'Bad Request', errors));
    }
    const {domainName, ...rest}= req.body;
    if(!domainName){
        return next(new CustomError(400, 'Bad Request domainName is required'));
    }
    let list=[rest];
    let dns_get_host= await resolveResponse(domainName, namecheap.domains.dns.getHosts);
    if(dns_get_host?.DomainDNSGetHostsResult?.host){
        dns_get_host= dns_get_host.DomainDNSGetHostsResult.host;
        if(!(Array.isArray(dns_get_host))){
            dns_get_host=[dns_get_host];
        }        
        for(let i=0; i<dns_get_host.length; i++){ 
            const {Type,Name,Address,MXPref,TTL}= dns_get_host[i]._attributes;
            list.push({"RecordType":Type,"HostName":Name,"Address":Address,"MXpref":MXPref,"TTL":TTL?TTL:1800});
        }
    }else{
        list.push({"RecordType":rest.RecordType,"HostName":rest.HostName,"Address":rest.Address,"MXpref":rest.MXpref || MXPref,"TTL":rest.TTL|| "1800"});
    }

    const result = await resolveResponse(domainName, namecheap.domains.dns.setHosts, list);
    if(!result){
        return next(new CustomError(500, 'Internal Server Error', result));
    }
    if(!result?.DomainDNSSetHostsResult?._attributes){
        return next(new CustomError(400, 'Bad Request', result));
    }
    res.status(201).json(result?.DomainDNSSetHostsResult?._attributes);
}

const dns_update_host= async (req,res, next)=>{
    const {HostId}= req.params;
    const {domainName, ...rest}= req.body;
    if(!domainName){
        return next(new CustomError(400, 'Bad Request domainName is required'));
    }
    let list=[];
    let dns_get_host= await resolveResponse(domainName, namecheap.domains.dns.getHosts);
    
    if(dns_get_host?.DomainDNSGetHostsResult?.host){
        dns_get_host= dns_get_host.DomainDNSGetHostsResult.host;
        if(!(Array.isArray(dns_get_host))){
            dns_get_host=[dns_get_host];
        }        

        for(let i=0; i<dns_get_host.length; i++){ 
            if(dns_get_host[i]._attributes.HostId===HostId){
                const {Type,Name,Address,MXPref,TTL}= dns_get_host[i]._attributes;
                list.push({"RecordType":rest.RecordType || Type,"HostName":rest.HostName || Name,"Address":rest.Address || Address,"MXpref":rest.MXpref || MXPref,"TTL":rest.TTL|| TTL});
            }else{
                const {Type,Name,Address,MXPref,TTL}= dns_get_host[i]._attributes;
                list.push({"RecordType":Type,"HostName":Name,"Address":Address,"MXpref":MXPref,"TTL":TTL?TTL:1800});
            }
        }
    }else{
        return next(new CustomError(404, 'Not Found host record with this id', dns_get_host));
    }

    const result = await resolveResponse(domainName, namecheap.domains.dns.setHosts, list);
    if(!result){
        return next(new CustomError(500, 'Internal Server Error', result));
    }
    if(!result?.DomainDNSSetHostsResult?._attributes){
        return next(new CustomError(500, 'Bad Request', result));
    }
    res.status(200).json(result?.DomainDNSSetHostsResult?._attributes);
}



const delete_dns_host= async (req,res, next)=>{
    const {HostId}= req.params;
    const {domainName, ...rest}= req.body;
    if(!domainName){
        return next(new CustomError(400, 'Bad Request domainName is required'));
    }
    let list=[],con=false;
    let dns_get_host= await resolveResponse(domainName, namecheap.domains.dns.getHosts);
    
    if(dns_get_host?.DomainDNSGetHostsResult?.host){
        dns_get_host= dns_get_host.DomainDNSGetHostsResult.host;
        if(!(Array.isArray(dns_get_host))){
            dns_get_host=[dns_get_host];
        }        

        for(let i=0; i<dns_get_host.length; i++){ 
            if(dns_get_host[i]._attributes.HostId===HostId){
                con=true;
               continue;
            }else{
                const {Type,Name,Address,MXPref,TTL}= dns_get_host[i]._attributes;
                list.push({"RecordType":Type,"HostName":Name,"Address":Address,"MXpref":MXPref,"TTL":TTL?TTL:1800});
            }
        }
    }else{
        return next(new CustomError(404, 'Not Found host record with this id', dns_get_host));
    }


    if(!con){
        return next(new CustomError(404, 'Not Found host record with this id'));
    }

    const result = await resolveResponse(domainName, namecheap.domains.dns.setHosts, list);
    if(!result){
        return next(new CustomError(500, 'Internal Server Error', result));
    }
    if(!result?.DomainDNSSetHostsResult?._attributes){
        return next(new CustomError(500, 'Bad Request', result));
    }
    res.status(200).json("Record deleted successfully");
    
}





module.exports= {dns_get_host, dns_post_host, dns_update_host, delete_dns_host};