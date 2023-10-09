let data=[
// {id:1,name:"item1",price:250 ,src:"./assets/oneplus-nord.png",description:"Product Descripyion 1"},
// {id:2,name:"OnePlus Nord 2 5G",price:30000 ,src:"./assets/oneplus-nord.png",description:"( GrayShimmer, 8GB-128GB )"},
// {id:3,name:"item3",price:350 ,src:"./assets/oneplus-nord.png",description:"Product Descripyion 3"},
 ];

 async function card_data()
 {
  console.log("card started");
  const response = await fetch("http://localhost:5090/auth/getcard", {
    method: "POST",
  
  });
  if(response.status===200)
  {
    console.log("Sucessfully fetched");
  }
  return response.json();
 };

async function item_Card()
{
   data= await card_data();
   console.log("hi");
   console.log(data); 
   return (data
   .map((item)=>{
    return(
    `<div class="item">
    <img class="Mobile" src="${item.image}" alt="${item.product_name}"/>
    <img class="Delete" id="delete-${item.itemId}" src="./assets/delete.png" />
    <p>${item.product_name}</p>
    <p >${item.product_description}</p>
    <p class="Flexingprice">
      <img class="price" src="./assets/best-price.png" />
      &nbsp <span class="final-price">₹ ${item.product_price}</span>
    </p>
    <button class="Cartbutton" onclick="purchase(${item.itemId})">Add to Cart</button>
  </div>`
    );
   }).join("")
   );
}
const basket=[];
async function item_Cart()
{
  data= await card_data();
   console.log("hi");
   console.log(data); 
  const Summary=[
  // {id:1,name:"OnePlus Nord CE 3 5G ",Price:200,src:"./assets/oneplus-nord.png",description:"( GrayShimmer, 8GB-128GB )"},
  // {id:3,name:"OnePlus Nord CE 3 5G ",Price:200,src:"./assets/oneplus-nord.png",description:"( GrayShimmer, 8GB-128GB )"},
  
  ];
    const Mybasket =JSON.parse(localStorage.getItem("data"))||[];
    if(Mybasket.length!==0)
    {
      Mybasket.map((k)=>
      {
        
          let find =data.find((z)=>{return(z.itemId===k.id);});
          console.log(find);
            find.quantity=k.quantity;
          Summary.push(find);
          
    });
    
    // localStorage.setItem("cartItem", JSON.stringify(Summary));
    // console.log(Summary);
    }
    return(Summary
        .map((x)=>{
            return(`
                <div class="Card">
                 <div class="cart-item">
                 <img class="Mobile"src=${x.image} />
                 <img id="remove-${x.itemId}" class="Minus" src="./assets/delete-button.png">
                 <div class="Description">
                 <p>${x.product_name}</p>
                 <p>${x.product_description}</p>
                 <br /><span class="final-price"> ${x.product_price}</span>
                  </div>
                <div class="Footer">
                  <button onclick="decrement(${x.itemId})">-</button
                  ><input
                   class="QuantityBill"
                    id="${x.itemId}"
                    style="text-align: center"
                    type="text "
                    size="2"
                    value="${x.quantity}"
                    readonly
                  />
                  <button onclick="increment(${x.itemId})">+</button>
                 </div>
                 </div>
                 </div>
           ` );
        }).join("")
    );
}
async function bill_item()
{
  data= await card_data();
  const order_item=[];
  const Mybasket =JSON.parse(localStorage.getItem("data"))||[];
    if(Mybasket.length!==0)
    {
      Mybasket.map((k)=>
      {
        
          let find =data.find((z)=>{return(z.itemId===k.id);});
          console.log(find);
          find.quantity=k.quantity;
          order_item.push(find);
          
    });
  }
  return(
    order_item.map((x)=>
    {
      return(`
        <div class="purchase_item" >
          <img class="item_image" src=${x.image} alt="phone" />
          <div class="item_description">
            <p>${x.product_name}</p>
            <p>${x.product_description}</p>
            <p>${x.product_price}</p>
            <p>Quantity:${x.quantity}</p>
          </div>
        </div>`
      );
    }).join("")
  );
}
export {item_Card,item_Cart,bill_item,basket};
