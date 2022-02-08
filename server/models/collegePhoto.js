module.exports = mongoose => {
    const collegePhoto = mongoose.model(
        "collegePhoto",
        mongoose.Schema({
            img: {
                type: String
            },
        })
    )
    return collegePhoto;
}