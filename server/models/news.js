module.exports = mongoose =>{
    const { Schema } = mongoose;
    const news = mongoose.model(
        "news",
        mongoose.Schema({
            category:{
                type: Schema.Types.ObjectId,
                ref: 'newsCategory'
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
            created_time:{
                type:String
            },
            views:{
                type:Number,
                default: 0
            },

        })
    )
return news;
}