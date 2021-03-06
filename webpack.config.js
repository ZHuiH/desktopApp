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
        filename:"[name].js",
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
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            inject:true,
            template:"./src/views/assets/app.html"
        })
    ]
}