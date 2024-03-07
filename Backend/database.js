const mongoose=require("mongoose");

module.exports=()=>{
    const connectionParams={
        // useNewUrlParser:true,
        // useUnifiedTopology:true
    };
    try {
        mongoose.connect(process.env.MOOGO_DB_URL,connectionParams)
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
        console.log("Error in Connecting with database");
    }
}