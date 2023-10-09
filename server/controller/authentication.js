const connection=require("../dbconnection");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");


const signin=async(req,res)=>
{
   console.log("signin");
   let { username, number,password } = req.body;
   const mysql='SELECT pwd FROM signup WHERE username = ?'
   const name=[username];
   console.log("h1");
   connection.query(mysql,name,async(err,result)=>
   {
      if(err)
      {
        console.log('Error:',err);
      }
      else
      {
        if(result.length>0)
        {
          console.log("h2");
          return res.status(401).json({message:"Username already exists"});
        }
        console.log("h3");
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        password=hashpassword;
        const sql="insert into signup (username,phonenumber,pwd) values(?,?,?);"
        // console.log(username);
        const value=[username, number,password ];
        connection.query(sql,value, async(error, results) => {
          if (error) {
              console.error('Error:', error);
            } else {
              const payload=
                {
                  name:username,
                  phno:number
                };
                try {
                  const token=await generatetoken(payload);
                  console.log(token);
                  console.log("victory");
                  console.log('Query results:', results);
                  res.status(200).json({token});
                  } catch (error) {
                  console.log(error);
                  res.status(400).json({message:error});
                }
            }
          });
      }
   });
   
}

const login=async(req,res)=>
{
  try{
    console.log("login");
    const { username, password } = req.body;
  
    const sql='SELECT * FROM signup WHERE username = ?';
    value=[username];
      connection.query(sql,[value],(error,result)=>
      {
        if (error) {
          console.error('Error:', error);
        } else {
          if(result.length>0)
          { 
            bcrypt.compare(password,result[0].pwd,async(err,response)=>{
               
                if(err){
                  console.log(err);
                }
                if(!response){
                  return res.status(401).json({message:"Credentials doesn't match"});
                }
                const payload=
                {
                  userId:result[0].personID,
                  name:result[0].username,
                  phno:result[0].phonenumber
                };
                // generatetoken(payload).then(token=>res.status(200).json({token})).catch(error=>res.status(400).json({message:error}));
                try {
                  const token=await generatetoken(payload);
                  console.log(token);
                  res.status(200).json({token});
                  } catch (error) {
                  console.log(error);
                  res.status(400).json({message:error});
                }
              })
           }else{
            return res.status(401).json({message:"Credentials doesn't maatch"});
           }
         }
      }
      );
      
    }
    catch(error)
    {
       res.status(400).send(error);
    }
    }
    
    const generatetoken =(payload)=>
    {
      return new Promise((resolve,reject)=>
        {
          return jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {expiresIn:"1h"},
            (error,token)=>
            {
              if(error)
              {
                reject(error);
              }
              else
              {
                resolve(token);
              }
            })
          }
          );
        };

  const card=async(req,res)=>
  {
     console.log("New Card");
     const{proname,price,description,imagelink} =req.body;
     const sql="insert into carditems (product_name,product_price,product_description,image) values(?,?,?,?)";
     connection.query(sql,[proname,price,description,imagelink], (error, results) => {
      if (error) {
          console.error('Error:', error);
        } else {
          console.log("victory");
          console.log('Query results:', results);
          res.status(200).json("token");
        }
      });

  };
    
  const sendcard = async(req,res)=>
  {
    console.log("getting Cards");
    const sql="select itemId,product_name,product_price,image,product_description from carditems";
    connection.query(sql, (error, results) => {
      if (error) {
          console.error('Error:', error);
        } else {
          console.log("victory");
          console.log('Query results:', results);
          res.status(200).json(results);
        }
      });


  }
  const placeorder=async(req,res)=>
  {
    const{username,phno,address}=req.body;
    const sql="insert into orderlist (c_name,c_phno,c_address,order_date)values(?,?,?,CURRENT_DATE());"
    connection.query(sql, [username,phno,address],(error, results) => {
      if (error) {
          console.error('Error:', error);
        } else {
          console.log("inserted bill");
          const myquery="select orderid from orderlist where order_date=current_date() ORDER BY orderid DESC limit 1;"
          connection.query(myquery,(error,result)=>
          {
            if(error)
            {
              console.log("Error:",error);
            }
            else
            {
              console.log("result:",result);
              res.status(200).json(result);
            }
          })
        }
      });
  }
  const orderrecords=async(req,res)=>
  {
    const{order_id,item_id,item_quantity}=req.body;
    const sql="insert into billitems (orderid,itemId,quantity)values(?,?,?);"
    connection.query(sql,[order_id,item_id,item_quantity],(error,result)=>
    {
      if(error)
      {
        console.log("Error:",error);
      }
      else
      {
        console.log("inserted sucessfully");
      }
    })
  }
  // const trash=async(req,res)=>
  // {
  //   const ItemId = parseInt(req.params.id);
  //   const sql="delete from carditems where itemId=?";
  //   connection.query(sql,[ItemId],(error, results) => {
  //     if (error) {
  //         console.error('Error:', error);
  //       } else {
  //         console.log("victory");
  //         console.log('Query results:', results);
  //         res.status(200).json(results);
  //       }
  //     });


  // }
    
module.exports={signin,login,card,sendcard,placeorder,orderrecords};