const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: {
        //需要编译的入口文件
        app: './src/index.js'
    },
    output: {
        path: path.join(__dirname, '/dest'),
        // 输出文件名称规则，
        filename: '[name].js'
    },

    //引用但是不打包的文件
    externals: { 'react': 'React', 'react-dom': 'ReactDOM' },
    
    plugins: [
        // webpack 需要设置loaderOptionPlugin 开启代码压缩
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        //uglify配置
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true
            }
        })
    ],

    resolve: {
        // 给src定义一个路径，可以避免出现大串的 ../../这样的字符
        alias: {_: path.resolve(__dirname, 'src')}
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    // 可以在这里配置babelrc，也可以在项目的根目录加.babelrc文件
                    options: {
                        //false是不使用.babelrc文件
                        babelrc: false,

                        //webapck2 需要设置modules为false
                        presets: [
                            ['es2015', {'modules': false}],
                            'react'
                        ],

                        //babel的插件
                        plugins: [
                            'react-require',
                            'transform-object-rest-spread'
                        ]
                    }
                }
            },

            // 这是sass的配置，less配置和sass一样，把sass-loader换成less-loader即可
            // webpack2 使用use来配置loader，并且不支持字符串形式的参数，x需要使用options
            // loader的加载顺序是从后向前的，这里是 sass -> postcss -> css -> style
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},

                    {
                        loader: 'css-loader',
                        
                        //开启CSS 模块化功能，避免类名冲突
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]'
                        }
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function(){
                                return autoprefixer
                            }
                        }
                    },

                    {
                        loader: 'sass-loader'
                    }
                ]
            },

            //当图片大于10KB时，复制文件目录，小于的时候直接转码
            {
                test: /\.(png|jpg|jpeg|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: './images/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}