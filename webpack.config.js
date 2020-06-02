let HtmlPluginWebpack = require('html-webpack-plugin')
let {CleanWebpackPlugin} = require('clean-webpack-plugin')
let path = require('path')
let VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = (env,argv)=>({
  mode:env,
  entry:path.resolve(__dirname,'src/index'),
  output:{
    filename:'[name].[hash].js',
    library:'vue_c',
    libraryTarget:'umd'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env'],
            plugins:[
              ["@babel/plugin-proposal-decorators",{legacy:true}],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              ["@babel/plugin-transform-runtime"]
            ]
          }
        },
        include: path.join(__dirname,'src'),
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        use:['vue-style-loader','css-loader']
      },
      {
        test:/\.scss$/,
        use:['vue-style-loader',{loader:'css-loader',options: { modules: true }},'sass-loader']
      },
      {
        test:/\.vue$/,
        use:['vue-loader']
      }
    ]
  },
  resolve:{ 
    extensions:['.js','.vue','.jsx','.json','.css'],
    alias:{
      'vue': 'vue/dist/vue.esm.js',
      'components': path.join(__dirname,'src'),// import rs from 'components/data.js' ==>定位到path.join(__dirname,'src','data.js')
    },
    modules:['node_modules'],
  },
  plugins:[
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlPluginWebpack({
      template:path.relative(__dirname,'src/index.html'),
      filename:'index.html'
    })
  ]
})