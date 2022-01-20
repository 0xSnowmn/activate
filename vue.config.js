module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true
        }
    },
    configureWebpack: {
        module:{
            rules:[{
                test: /\.(png|jpe?g|gif|svg|webp|tiff)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                    limit: 8192,
                    name: '[hash:8].[name].[ext]',
                    outputPath: 'images/'
                    }
                }]
                }
            ]
        }
    }
}