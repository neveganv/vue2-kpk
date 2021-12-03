module.exports = mongoose => {
    const { Schema } = mongoose;
    const specialty = mongoose.model(
        "specialty",
        mongoose.Schema({
            name: {
                type: String,
                require: true
            },
            img: {
                type: String,
                require: true
            },
            content: {
                type: String,
                require: true
            },
            courses: {
                type: Object,
                require: false
            },
            number: {
                type: String,
                require: false
            },
        })
    )
    return specialty;
}