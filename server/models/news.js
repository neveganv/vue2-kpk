module.exports = mongoose =>{
    const news = mongoose.model(
        "news",
        mongoose.Schema({
            categoryId:{
                type:String,
                require:true
            },
            title:{
                type:String,
                require:true
            },
            content:{
                type:String,
            },
            main_img:{
                type:String
            },

        })
    )
return news;
}