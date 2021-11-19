const path = require("path");

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000'
            }
        }
    },
    // css: {
    //     loaderOptions: {
    //         scss: {
    //             prependData: '@import "@/assets/scss/style.scss";'
    //         }
    //     }
    // },
    lintOnSave: false,

    outputDir: path.resolve(__dirname, "../server/public"),
    productionSourceMap: false,
};