import React from "react";
import {getdnsRecords, createDnsRecord, updateDnsRecord, deleteDnsRecord} from '../../data/dns';


const DnsRoute = () => {
    const [domainName, setDomainName] = React.useState("codeblinkkk.net");
    const [recordType, setRecordtype] = React.useState("CNAME");
    const [recordValue, setRecordValue] = React.useState("olde1.com");
    const [HostName, setHostName] = React.useState("www");

    const [hostId, setHostId] = React.useState(0);

    const [errMessage, setErrorMessage] = React.useState("");
    const [dnsRecord, setDnsRecord] = React.useState([]);


    const [postResponse, setPostResponse]= React.useState("");
    const [updateResponse, setUpdateResponse]= React.useState("");
    const [deleteResponse, setdeleteResponse]= React.useState("");

    const clearOutput = () => {
        setErrorMessage("");
        setDnsRecord([]);
        setPostResponse("");
        setUpdateResponse("");
        setdeleteResponse("");
    }


    const getRecord = async () => {
        try {
            const res = await getdnsRecords( { params: { domainName: domainName } });
            clearOutput();
            setDnsRecord(res);
        } catch (e) {
            clearOutput();
            console.log(e);
            setErrorMessage(e.message);
        }
    }

    const postRecord = async () => {
        console.log("Post Data");
        try {
            const data = {
                "domainName": domainName,
                "RecordType": recordType,
                "HostName": HostName,
                "Address": recordValue,
                "MXpref": "10",
                "TTL": 1800
            };
            const res = await createDnsRecord(data);
            clearOutput();
            console.log(res);
            setPostResponse("Sucessfully Added the record");
        } catch (e) {
            clearOutput();
            setErrorMessage(e.message);
        }
    }



    const updateRecord= async()=>{
        console.log("update called");
        try{
            const data = {
                "domainName": domainName,
                "RecordType": recordType,
                "HostName": HostName,
                "Address": recordValue,
                "MXpref": "10",
                "TTL": 1800
            };
            const res = await updateDnsRecord(hostId,data);
            console.log(res);
            clearOutput();
            setUpdateResponse("Update was sucessful");
            setHostId('');
        }catch(e){
            clearOutput();
            setErrorMessage(e.message);
        }
    }

    const deleteRecord= async(hostId)=>{
        try{
            const data = {
                "domainName": domainName,
                "RecordType": recordType,
                "HostName": HostName,
                "Address": recordValue,
                "MXpref": "10",
                "TTL": 1800
            };
            const res = await deleteDnsRecord(hostId, {data:data} );
            console.log(res);
            clearOutput();
            setdeleteResponse("Deletion was sucessfull");
            setHostId('');
        }catch(e){
            clearOutput();
            console.log(e);
            setErrorMessage(e.message);
        }
    }

    return (
        <div className="w-full center py-10 flex items-center justify-center">
            <div className="w-3/4 rounded-lg p-10 shadow-2xl bg-white">
                <h1 className="text-5xl font-bold text-dark-blue text-center py-8">Dns Routes</h1>
                <div className="mb-4 w-4/5 gap-x-4 m-auto flex">
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the domainName"
                        value={domainName}
                        onChange={(e) => {
                            setDomainName("codeblinkkk.net");
                            // setDomainName(e.target.value)
                        }
                        }
                    />
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Record type"
                        value={recordType}
                        onChange={(e) => {
                            setRecordtype(e.target.value)
                        }
                        }
                    />
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Record Address"
                        value={recordValue}
                        onChange={(e) => {
                            setRecordValue(e.target.value)
                        }
                        }
                    />
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Record HostName"
                        value={HostName}
                        onChange={(e) => {
                            setHostName(e.target.value)
                        }
                        }
                    />
                </div>
                <div className="flex items-center justify-center gap-x-4">
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={getRecord}>Get dnsRecords</button>
                    <button type="button" className="text-white bg-blue-content hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={postRecord}>Add dnsRecord</button>
                    <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900" onClick={updateRecord}>Update dnsRecord</button>
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={clearOutput}>Clear Output</button>
                </div>
                {
                    !errMessage ?
                        (dnsRecord.length !== 0 ?
                            (dnsRecord.map((item, index) => {
                                return <div key={index} className="flex bg-white rounded-lg m-4 p-4 justify-between shadow-lg border-2">
                                    <div className="p-4">
                                        <h3 className="text-2xl">RecordType: {item._attributes.Name}</h3>
                                        <p>Address: {item?._attributes.Address}</p>
                                    </div>
                                    <div>
                                        <div className="p-4">
                                            <p className="text-3xl text-dark-blue">{item._attributes.Type}</p>
                                            <p>TTL: {item?._attributes.TTL}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-poppins rounded-lg text-sm p-3 dark:focus:ring-yellow-900" 
                                            onClick={()=>{
                                                setRecordtype(item?._attributes.Type);
                                                setRecordValue(item?._attributes.Address);
                                                setHostName(item?._attributes.Name);
                                                setHostId(item?._attributes.HostId);
                                            }}>Update</button>
                                            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>deleteRecord(item?._attributes.HostId)}>delete</button>
                                        </div>
                                    </div>
                                </div>
                            })) : (
                                postResponse?
                                (<div className="text-light-blue text-2xl py-4 m-4">{postResponse}</div>):
                                (updateResponse?
                                (<div className="text-light-blue text-2xl py-4 m-4">{updateResponse}</div>):(
                                    (<div className="text-light-blue text-2xl py-4 m-4">{deleteResponse}</div>)
                                ))
                            )
                        ) : <div className="text-red-700 text-2xl py-4 m-4">{errMessage}</div>
                }
            </div>
        </div>
    )
}

export default DnsRoute;