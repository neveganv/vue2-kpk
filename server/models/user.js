module.exports = mongoose => {
    const { Schema } = mongoose;
    const user = mongoose.model(
        "user",
        mongoose.Schema({
            type: {
                type: String,
                require: true
            },
            name: {
                type: String,
                require: true
            },
            surname: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true
            },
            phone: {
                type: String,
                require: true
            },
            hash: {
                type: String,
                require: true,
            },
            salt: {
                type: String,
                require: true,
            },
            token: {
                type: String,
                default: null,
            },
            position: {
                type: Schema.Types.ObjectId,
                ref: 'position'
            }
        })
    )
    return user;
}