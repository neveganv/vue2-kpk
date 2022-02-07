module.exports = mongoose => {
    const collegeInfo = mongoose.model(
        "collegeInfo",
        mongoose.Schema({
            info: {
                type: String,
            },
            images: {
                type: Array
            },
        })
    )
    return collegeInfo;
}