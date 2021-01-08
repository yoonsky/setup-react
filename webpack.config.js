const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  // mode : 현재 개발모드에서 작업중
  mode: isDev ? 'development' : 'production',
  devServer: {
    //히스토리 API를 사용하는 SPA 개발 시 설정, 404Error시 index.html로 리다이렉트!
    historyApiFallback: true,
    inline: true,
    port: 3000,
    // hot : webpack의 HMR기능 활성화
    hot: true,
    publicPath: '/',
  },
  // entry : 어플리케이션의 시작점을 정함
  entry: [
    // typescript로 js파일을 tsx로 바꿔주는 경우에는 .js를 생략해주어야한다.
    './src/index',
  ],
  // output : 번들링 한 결과물의 이름과 저장할 장소를 정함
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  // module : export 한 js모듈이 변환되는 방법을 rules에 정의함
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  // resolve : 웹팩이 해석할 확장자를 지정함.
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  // plugins : 플러그인 옵션 설정
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
