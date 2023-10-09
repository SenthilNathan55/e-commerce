const express = require("express");
const auth=require("./routes/auth");
const app=express();
const cors=require('cors');
require('dotenv').config();
const connection=require("./dbconnection");

app.use(cors());
app.use(express.json());

app.use("/auth",auth);
const start=()=>
{
    console.log("Connecting...");
    connection.connect((err)=>{
        if(err){
            console.log("DB Connection Error",err);
        }else{
            console.log("Connected to Db Sucessfully");
            app.listen(5090,()=>{
                console.log("Server started in port 5090.");
            })
        }
    })
}
 app.delete("/remove-card/:id",async(req,res)=>
 {
   const ItemId = parseInt(req.params.id);
   const sql="delete from carditems where itemId=?";
   connection.query(sql,[ItemId],(error, results) => {
     if (error) {
         console.error('Error:', error);
       } else {
         console.log("victory");
         console.log('Query results:', results);
         res.status(200).json(results);
       }
     });
 
 
 });
start();