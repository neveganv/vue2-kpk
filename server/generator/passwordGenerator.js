var generator = require('generate-password');

function generate() {
    var password = generator.generate({
        length: 8,
        numbers: true
    });

    return password;
}

module.exports = { generate }