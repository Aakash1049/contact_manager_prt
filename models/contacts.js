const mongoose = require("mongoose")

let contactSchema= mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String
    },
    phone:{
        type:String
    }
})

const Contact= mongoose.model("contacts",contactSchema)
module.exports=Contact