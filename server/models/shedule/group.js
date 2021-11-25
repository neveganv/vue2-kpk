module.exports = mongoose => {
    const { Schema } = mongoose;
    const group = mongoose.model(
        "group",
        mongoose.Schema({
            name: {
                type: String,
                require: true
            }
        })
    )
    return group;
}