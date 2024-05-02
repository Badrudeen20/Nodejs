const url = "mongodb://localhost:27017/"
/* const { MongoClient } = require("mongodb")
const url = "mongodb://localhost:27017/"
MongoClient.connect(url,(err,db)=>{
      if(err) throw err
      let database = db.db("admin")
      database.creatCollection("product",function(err){})
})
module.exports = MongoClient */


/* 
const client = new MongoClient(url,{
      useNewUrlParser:true,
      useUnifiedTopology:true
})

async function run(){
   try {
      await client.connect()
      await client.db("admin");
      console.log("Connected successfully to server");
   }finally{
      await client.close();
   }
} 

module.exports = run().catch(console.dir); */


/*Connet Using mongoose */
const mongoose = require("mongoose")
mongoose.connect(url)

const con = mongoose.connection
con.on('connected',function(){
      console.log('DB Conneted Successfully')
})

con.on('error',function(err){
      console.log('Conneted Error')
})

module.exports = con
