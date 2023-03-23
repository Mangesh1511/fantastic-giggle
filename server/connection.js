const mongoose=require('mongoose');

mongoose.set('strictQuery',true);
mongoose.connect("mongodb+srv://admin:mangesh1230@cluster0.bqcgc78.mongodb.net/AppData",(err)=>
{
    if(!err)
        console.log("Mongodb Connection Succeeded...");
    else
        console.log("Connection Error: "+(err));
    
});

module.exports=mongoose;

