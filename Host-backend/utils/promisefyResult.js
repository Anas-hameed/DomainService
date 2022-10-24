const resolveResponse= async(args, fn, options)=>{
    return await new Promise((resolve, reject)=>{
        if(options){
            fn(args, options,(err, data)=>{
                if(err){
                    return reject(err);
                }
                return resolve(data);
            });
        }else{
            fn(args, (err, data)=>{
                if(err){
                    return reject(err);
                }
                return resolve(data);
            });
        }
    });
}

module.exports= resolveResponse;