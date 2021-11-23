module.exports = mongoose =>{
    const user = mongoose.model(
        "user",
        mongoose.Schema({
            type:{
                type:String,
                require:true
            },
            name:{
                type:String,
                require:true
            },
            surname:{
                type:String,
                require:true
            },
            email:{
                type:String,
                require:true
            },
            phone:{
                type:String,
                require:true
            },

        })
    )
return user;
}