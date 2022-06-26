module.exports = {
        devServer: {
            proxy: {
                "/api/*": {
                    target: 'http://localhost:8888',
                    changeOrigin: true,
                }
            }
        }
    }
    // module.exports = {
    //     "transpileDependencies": [
    //       "vuetify"
    //     ],
    //     "devServer": {
    //       "public": "swimmerway.com",
    //        disableHostCheck: true,

//     }
//   }