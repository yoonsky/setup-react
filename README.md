## create-react-app 없이 개발환경 설정하기!

### 1. package.json 생성

- [x] _yarn init -y_

### 2. webpack 설치 및 설정

- [x] _yarn add -D webpack webpack-cli webpack-dev-server_
- [x] script 명령어 추가 _"start": "webpack-dev-server --config ./webpack.config.js --mode development"_
- [x] 추가적으로 유용한 플러그인 설치하기 _yarn add html-webpack-plugin clean-webpack-plugin_

* => html-webpack-plugin : html에 번들링한 js파일을 삽입하고, html파일을 번들링 된 결과물이 저장될 폴더에 옮겨준다!

* => clean-webpack-plugin : 번들링 할 때마다 이전 번들링 결과를 제거해준다!

- [x] root 경로에 webpack.config.js 파일 설정하기 (+ 이후에 더 추가)

<pre>
<code>
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  const isDev = process.env.NODE_ENV === 'development';

  module.exports = {
    // mode : 현재 개발모드에서 작업중
    mode: isDev ? 'development' : 'production',
    devServer: {
      // 히스토리 API를 사용하는 SPA 개발 시 설정, 404Error시 index.html로 리다이렉트!
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
</code>
</pre>

### 3. root/ src/ index.js , index.html 파일 생성

- [x] _yarn start로 서버 실행 확인하기!_

### 4. babel 설치 및 설정

- [x] _yarn add -D babel-loader @babel/core @babel/preset-env @babel/preset-react babel-preset-es2015_
- [x] root 경로에 .babelrc 파일 생성 후 아래 코드 추가
<pre>
<code>
  {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }
</code>
</pre>

### 5. 리액트 환경 만들기

- [x] _yarn add react @types/react react-dom @types/react-dom_
- [x] index.js파일과 index.html을 연결한다
- [x] App.js파일을 만들어 index.js와 연결한다.
- [x] yarn start로 확인!

### 6. 타입스크립트로 변환하기

- [x] _yarn add -D typescript_
- [x] root 경로에 tsconfig.json 파일 생성 후 아래 코드 추가
<pre>
<code>
  {
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "Commonjs",
    "target": "ES5",
    "jsx": "react"
  },
  "include": [
    "./src/**/*"
  ]
}
</code>
</pre>
- [x] index.js => index.tsx
- [x] _yarn add @babel/preset-typescript_
