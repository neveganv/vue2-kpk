module.exports = mongoose => {
    const { Schema } = mongoose;
    const shedule = mongoose.model(
        "shedule",
        mongoose.Schema({
            group: {
                type: String,
                require: true
            }
        })
    )
    return shedule;
}