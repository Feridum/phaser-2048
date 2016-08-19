/**
 * Created by Olek on 18.08.2016.
 */
module.exports = {
    entry: './src/app.ts',
    output: {
        filename: './public/app.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}