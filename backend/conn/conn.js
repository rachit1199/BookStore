const mongoose = require("mongoose");

const conn = async () => {
    try{
        await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
});

        console.log("Connected to Database");
    }catch(error){
        console.log(error);
    }
};
conn();
