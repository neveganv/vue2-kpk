module.exports = mongoose =>{
    const optionsList = mongoose.model(
        "optionsList",
        mongoose.Schema({
            title:{
                type:String,
                require:true
            },
            icon:{
                type:String
            },

        })
    )
return optionsList;
}