const express= require("express")
const router= express.Router()
const Contact=require("../models/contacts")

router.post("/contacts",async(req,res)=>{
    try {
        let {email,phone,firstName,lastName}=req.body
        if(!email || !phone || !firstName || !lastName){
            let arr=[]
            if(email===undefined){
                arr.push("email")
            }
            if(phone===undefined){
                arr.push("phone number")
            }
            if(firstName===undefined){
                arr.push("firstName")
            }
            if(lastName===undefined){
                arr.push("lastName")
            }
            res.json({
                "error": "Missing required field(s): "+` ${[...arr]}`
            })
            arr=[]
            return
        }
        let contact=await Contact.findOne({email})
        if(contact!==null){
            return res.json({Error: "email already exists"})
        }
        contact=await Contact.findOne({phone})
        if(contact!==null){
           return res.json({Error: "phone number already exists"})
        }
        contact =await Contact.create(req.body)
        res.status(201).json(contact)
    } catch (error) {
        console.log(error)
    }
})

router.get("/contacts",async (req,res)=>{
    try {
        let contacts= await Contact.find({})
        res.status(200).json(contacts)
    } catch (error) {
        console.log(error)
    }
})

router.get("/contacts/:id", async(req,res)=>{
    try {
        let contact= await Contact.findOne({_id:req.params.id})
        if(contact===null){
            return res.status(404).json({
                "error": "There is no contact with that id"
            })
        }
        res.status(200).json(contact)
    } catch (error) {
        console.log(error)
    }
})

router.delete("/contacts/:id", async(req,res)=>{
    try {
        let contact= await Contact.deleteOne({_id:req.params.id})
        if(contact===null){
           return res.status(204).send("")
        }
        res.status(204).send("")
    } catch (error) {
        console.log(error)
    }
})

router.put("/contacts/:id", async(req,res)=>{
    try {
        let  contact= await Contact.findOne({_id:req.params.id})
        if(contact===null){
            return res.status(404).json({
                "error": "There is no contact with that id"
            })
        }
         contact= await Contact.updateOne({_id:req.params.id},req.body)
         res.status(204).send("")
    } catch (error) {
           console.log(error.message) 
    }
})


router.patch("/contacts/:id", async(req,res)=>{
    try {
        let contact= await Contact.findOne({_id:req.params.id})
        if(contact===null){
            return res.status(404).json({
                "error": "There is no contact with that id"
            })
        }
         contact= await Contact.updateOne({_id:req.params.id},req.body)
         res.status(204).send("")
    } catch (error) {
           console.log(error.message) 
    }
})

module.exports=router