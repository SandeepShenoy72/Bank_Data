import express from "express"
import axios from "axios"
import { log } from "console";

const app=express();

app.use(express.urlencoded({ extended: true }));

const PORT=3000

app.use(express.static('public'))

var ifsc_code;

app.get("/",async (req,res)=>{
  res.render("index.ejs")
})

app.post("/",async (req,res)=>{
    ifsc_code = req.body.code;
    try{
        const response = await axios.get(`https://ifsc.razorpay.com/${ifsc_code}`)
        console.log(response.data.BRANCH);
        res.render("details.ejs",{
            bank_name:response.data.BANK,
            branch_name:response.data.BRANCH,
            state:response.data.STATE,
            city:response.data.CITY,
            address:response.data.ADDRESS,
            district:response.data.DISTRICT
        })
       }catch(error){
        console.log(error)
       }
})

app.listen(PORT,(req,res)=>{
    console.log(`Listening on ${PORT}`)
})