const path = require("path");

module.exports = {
    transpileDependencies: [
        'vuetify',
      ],
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://3.17.162.70/'
    //         }
    //     }
    // },
    // css: {
    //     loaderOptions: {
    //         scss: {
    //             prependData: '@import "@/assets/scss/style.scss";'
    //         }
    //     }
    // },
    lintOnSave: false,
    publicPath: '/kpk.dev-ui/',
    outputDir: path.resolve("../dist"),
    productionSourceMap: false,
};