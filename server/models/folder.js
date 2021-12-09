module.exports = mongoose => {
    const { Schema } = mongoose;
    const folder = mongoose.model(
        "folder",
        mongoose.Schema({
            name: {
                type: String,
                require: true
            },
            positions: [{
                type: Schema.Types.ObjectId,
                ref: 'position'
            }]
        })
    )
    return folder;
}