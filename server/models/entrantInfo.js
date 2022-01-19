module.exports = mongoose => {
    const entrantInfo = mongoose.model(
        "entrantInfo",
        mongoose.Schema({
            title: {
                type: String,
                require: true
            },
            content: {
                type: String,
            },
            price: {
                type: Number,
                default: 0
            },

        })
    )
    return entrantInfo;
}