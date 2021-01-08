## create-react-app 없이 개발환경 설정하기!
  
### 1. package.json 생성
  - [x] _yarn init -y_
### 2. webpack 설치 및 설정
  - [x] _yarn add -D webpack webpack-cli webpack-dev-server_
  - [x] script 명령어 추가 _"start": "webpack-dev-server --config ./webpack.config.js --mode development"_
  - [x] root 경로에 webpack.config.js 파일 설정하기

    module.exports={
  entry:[
    './src/index'
  ],
  output:{
    filename:'bundle.js',
    path:__dirname+"/dist"
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx|ts|tsx)$/,
        exclude:/node_modules/,
        use:['babel-loader']
      }
    ]
  },
  resolve:{
    extensions:['*','.js','.jsx','.ts','.tsx']
  }
}
