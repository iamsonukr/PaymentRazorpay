import 'dotenv/config'
import express from 'express'
// install razorpay and import 
import Razorpay from 'razorpay'
// import orders from 'razorpay/dist/types/orders';
import cors from 'cors'
import crypto from 'crypto'

const PORT=process.env.PORT;
const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Your payment gateway is ready")
})

// api to place order
app.post("/api/order",async(req,res)=>{
    try {
        // new instance of Razorpay 
        const razorpay=new Razorpay({
            key_id:process.env.RPAY_KEY_ID,
            key_secret:process.env.RPAY_SECRET
        })
        const options=req.body;
        const order=await razorpay.orders.create(options)

        if(!order){
            return res.status(500).send("No Order")
        }
        res.json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
})

//api to validate order
app.post("/api/order/validate",async(req,res)=>{
    // Destructureing is based on names of the object not the order of them
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body 
    const sha=crypto.createHmac("sha256",process.env.RPAY_SECRET)
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest=sha.digest("hex")
    if(digest!==razorpay_signature){
        return res.status(400).json({msg:"Transaction is not legit !"})
    }
    res.json({msg:"success",orderId:razorpay_order_id,paymentId:razorpay_payment_id})
})

app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
    
})