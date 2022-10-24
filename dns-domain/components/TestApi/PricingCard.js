import React  from "react";
import {getTldPricing, createtldPricing, updatetldPricing, deletetldPricing} from '../../data/tldPricing';

const PricingCard = () => {
    const [priority, setPriority] = React.useState(0);
    const [errMessage, setErrorMessage]= React.useState("");
    const [tldPricing, setTldPricing] = React.useState([]);
    const [posttildResponse, setPosttldResponse]= React.useState("");
    const [updateResponse, setUpdateResponse]= React.useState("");
    const [deletePricingResponse, setDeletePricingResponse]= React.useState("");

    const clearOutput= ()=>{
        setErrorMessage("");
        setTldPricing([]);
        setPosttldResponse("");
        setUpdateResponse("");
        setDeletePricingResponse("");
    }


    const gettldPricing= async ()=>{
        try{
            console.log("Get called");
            const res= await getTldPricing({priority});
            let data=[];
            if(res.length>5){
                for(let i=0; i<5; i++){
                    data.push(res[i]);
                }
            }else{
                data=res;
            }
            clearOutput();
            if(res.length==0){
                setPosttldResponse(`No Pricing Record found for ${priority} tld`);
                return;
            }
            setTldPricing(data);
        }catch(e){
            clearOutput();
            setErrorMessage(e.message);
        }
    }

    const postPrice= async ()=>{
        try{
            console.log("post called");
            const res= await createtldPricing({priority: priority});
            console.log(res);
            clearOutput();
            setPosttldResponse(res);
        }catch(e){
            clearOutput();
            setErrorMessage(e.message);
        }
    }


    const updatePricing= async()=>{
        try{
            const res = await updatetldPricing({priority: priority});
            console.log(res);
            clearOutput();
            setUpdateResponse(res);
        }catch(e){
            clearOutput();
            setErrorMessage(e.message);
        }
    }

    const deletePricing= async()=>{
        console.log("delete called");
        try{
            const res = await deletetldPricing({priority: priority});
            console.log(res);
            clearOutput();
            setDeletePricingResponse("Deletion was sucessfull");
        }catch(e){
            clearOutput();
            setErrorMessage(e.message);
        }
    }

    return (
        <div className="w-full center py-10 flex items-center justify-center">
            <div className="w-3/4 rounded-lg p-10 shadow-2xl bg-white">
                <h1 className="text-5xl font-bold text-dark-blue text-center py-8">TldPricing</h1>
                <div className="mb-4 w-1/3 m-auto">
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the Priority" 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center gap-x-4">
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={gettldPricing}>Get Pricing</button>
                    <button type="button" className="text-white bg-blue-content hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={postPrice}>Add Pricing</button>
                    <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900" onClick={updatePricing}>Update Pricing</button>
                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={deletePricing}>delete Pricing</button>
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={clearOutput}>Clear Output</button>
                </div>
                {
                    !errMessage?
                    (tldPricing.length!=0?
                        (tldPricing.map((item, index)=>{
                        return <div key={index} className="flex bg-white rounded-lg m-4 p-4 justify-between">
                            <div>
                                <h3 className="text-2xl">{item.tldName}</h3>
                                <p>year: {item.duration}</p>
                            </div>
                            <div>
                                <p className="text-3xl text-dark-blue">{item.Price}</p>
                                <p>{item.ActionType}</p>
                            </div>
                        </div>
                    })):(
                        posttildResponse?
                        (<div className="text-light-blue text-2xl py-4 m-4">{posttildResponse}</div>):
                        (updateResponse?
                        (<div className="text-light-blue text-2xl py-4 m-4">{updateResponse}</div>):(
                            (<div className="text-light-blue text-2xl py-4 m-4">{deletePricingResponse}</div>)
                        ))
                    )
                    ):<div className="text-red-700 text-2xl py-4 m-4">{errMessage}</div>
                }
            </div>
        </div>
    )
}

export default PricingCard;