const path=require('path')
const HtmlWebpackPlugin  = require("html-webpack-plugin")
module.exports={
    target: 'node',
    mode:"development",
    devtool:"eval",
    entry:{
        app:"./src/views/app.tsx"
    },
    output:{
        filename:"app.js",
        publicPath:"/",
        path:path.resolve(__dirname,'./public/views/')
    },
    resolve:{
        extensions:['.ts','.js','.tsx','.jsx'],
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                loader:"ts-loader"
            },{
                test: /\.(css|less)$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'less-loader'}
                ]
                
            }
        ]
    },
    devServer:{
        open:true,
        contentBase:path.join(__dirname,'public/views'),
        compress: true,
        port: 9012,
        hot: true,
        historyApiFallback: true,
        inline: true,
        progress:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            inject:true,
            template:"./src/views/assets/dev.html"
        })
    ]
}