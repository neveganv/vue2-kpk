module.exports = mongoose => {
    const { Schema } = mongoose;
    const page = mongoose.model(
        "page",
        mongoose.Schema({
            name: {
                type: String,
                require: true
            },
            folder: {
                type: Schema.Types.ObjectId,
                ref: 'folder'
            },
            html: {
                type: String,
                default: null
            }
        })
    )
    return page;
}