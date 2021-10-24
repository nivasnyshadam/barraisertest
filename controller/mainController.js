const dbService = require('../service');

module.exports={

    createUser: async(req,res)=>{
        req.body.role= 1;
        let insert = await dbService.addUser(req.body)
        console.log(insert)
        if(!insert){
            

                res.writeHead(400)
                res.end(JSON.stringify({message:"data insert failed"}))
            }
            else{
                res.writeHead(200)
                res.end(JSON.stringify({userId:insert[0].id}))
            }
        
    },
    addRecord: async(req,res)=>{
        console.log(req.body)
        let insert = dbService.addReport(req.body).then((data)=>{
            res.writeHead(200)
            res.end(JSON.stringify({"risk":data}))
        }).catch((error)=>{
            res.writeHead(400)
            res.end(JSON.stringify({message:"data insert failed"}))
        })
        
    },
    createAdmin :async(req,res)=>{
        req.body.role= 2;
        let insert = await dbService.addUser(req.body)
        console.log(insert)
        if(!insert){
            

                res.writeHead(400)
                res.end(JSON.stringify({message:"data insert failed"}))
            }
            else{
                res.writeHead(200)
                res.end(JSON.stringify({userId:insert[0].id}))
            }
        
    },
    updateResult:async(req,res)=>{
        
        let insert = await dbService.addResult(req.body)
        console.log(insert)
        if(!insert){
            

                res.writeHead(400)
                res.end(JSON.stringify({message:"data insert failed"}))
            }
            else{
                res.writeHead(200)
                res.end(JSON.stringify({updated:'true'}))
            }
        
    },
    zoneData: async(req,res)=>{
        console.log(req.body)
         dbService.getZone(req.body.pinCode).then((data)=>{
            let count=0;
            let zone ='Green';
            data.forEach(element => {
                count+=1;
            });
            if(count >0 && count <5){
                zone ='Orange;'
            }
            if(count>5){
                zone='Red'
            }
            res.writeHead(200)
            res.end(JSON.stringify({"risk":zone}))
        }).catch((error)=>{
            res.writeHead(400)
            res.end(JSON.stringify({message:"data insert failed"}))
        })
        
    }

}