module.exports = mongoose =>{
    const news = mongoose.model(
        "news",
        mongoose.Schema({
            title:{
                type:String,
                require:true
            },
            content:{
                type:String,
                require:true
            },
            icon:{
                type:String
            },

        })
    )
return news;
}