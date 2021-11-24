module.exports = mongoose => {
    const position = mongoose.model(
        "position",
        mongoose.Schema({
            title: {
                type: String,
                require: true,
            }
        })
    )
    return position;
}