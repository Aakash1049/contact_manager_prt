const express=require("express")
const app=express()
const mongoose=require("mongoose")
const mongodb=require("mongodb")
app.use(express.json())

mongoose.connect("mongodb+srv://Aaku1049:Aaku1049@cluster0.lw0hcia.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// mongoose.connect("mongodb://localhost:27017/contact_manager",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

const contacts=require("./routes/contacts")
app.use(contacts)


app.listen(5000,()=>{
    console.log("server runningg at 5000")
})