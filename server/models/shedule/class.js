module.exports = mongoose => {
    const { Schema } = mongoose;
    const classes = mongoose.model(
        "classes",
        mongoose.Schema({
            name: {
                type: String,
                require: true
            },
            color: {
                type: String,
                require: true
            }
        })
    )
    return classes;
}