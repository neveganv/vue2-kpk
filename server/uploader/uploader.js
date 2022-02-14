var fs = require('fs');
var path = require('path')

function uploadFile(name, image) {
    var data = image.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer.from(data, 'base64');
    let status = 200
    var dir = path.join(__dirname, "../public/uploads/");

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir + name, buf, err => {
        if (err) status = 500;
        else status = 200
    });
    return status
}

module.exports = { uploadFile }