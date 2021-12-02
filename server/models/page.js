module.exports = mongoose => {
    const { Schema } = mongoose;
    const page = mongoose.model(
        "page",
        mongoose.Schema({
            type: {
                type: String,
                require: true
            },
            name: {
                type: String,
                require: true
            },
            accessRights: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        })
    )
    return page;
}