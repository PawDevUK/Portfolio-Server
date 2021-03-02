const fs = require("fs")

const StoreData = (data,path)=>{
    try{
      fs.writeFileSync(path,JSON.stringify(data))
    }
    catch(err){
      console.log(err)
    }
  }
  


  
exports.StoreData = StoreData