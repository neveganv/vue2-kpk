const { Schema } = require("mongoose");

module.exports = mongoose =>{
    const newsCategory = mongoose.model(
        "newsCategory",
        mongoose.Schema({
            name:{
                type:String,
                require:true
            },
        })
    )
return newsCategory;
}