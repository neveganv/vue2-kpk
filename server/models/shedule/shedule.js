module.exports = mongoose => {
    const { Schema } = mongoose;
    const shedule = mongoose.model(
        "shedule",
        mongoose.Schema({
            name: {
                type: String,
                require: true
            },
            group: {
                type: Schema.Types.ObjectId,
                ref: 'group'
            },
            link:{
                type:String,
                require: true
            },
            color:{
                type:String,
                require: true
            },
            start: {
                type: String,
                require: true
            },
            end: {
                type: String,
                require: true
            },
            content:{
                type:String,
                require: false
            }
        })
    )
    return shedule;
}