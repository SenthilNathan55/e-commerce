const express=require("express");
const router=express.Router();
const {signin,login,card,sendcard,placeorder,orderrecords}=require("../controller/authentication");

router.route("/signin").post(signin);
router.route("/login").post(login);
router.route("/newcard").post(card);
router.route("/getcard").post(sendcard);
router.route("/order").post(placeorder);
router.route("/orderlist").post(orderrecords);

module.exports=router;