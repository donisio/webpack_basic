const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  //파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js', // 애플리케이션 진입점
  // 결과물(번들)을 반환 하는 설정
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들된 파일 출력 경로
    filename: 'main.js',
    clean: true
  },
  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App', // HTML 페이지 제목
      template: './index.html' // 사용할 HTML 템플릿 파일
    }),
    new CopyWebpackPlugin({
        patterns : [
          { from: 'static' },
          //{ from: 'source/directory', to: 'destination/directory' },
          // 여기에 더 많은 복사 대상을 추가할 수 있습니다.
        ]
    }),
  ],

  module: {
    rules: [
      // 이미지 파일을 처리하는 로더
      {
        test: /\\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8KB 이하 이미지는 base64로 인라인화
              name: 'images/[name].[ext]' // 파일 이름 및 경로 설정
            }
          }
        ]
      },
      // CSS 파일을 처리하는 로더
      // CSS 로더 순서가 중요함
      {
        test: /\.s?css$/i,
        use: [
          'style-loader', 
          'css-loader',
          'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         autoprefixer()
          //       ]
          //     }
          //   }
          // },
          'sass-loader',
        ]
      },
      {
        test: /\.js$/i,
        use : [
          'babel-loader'
        ]
      }
    ]
  },

  devServer: {
    host: 'localhost',
    port: 8080, // 개발 서버 포트
    hot: true, // HMR 활성화
    open: true, // 브라우저 자동 열기
    // compress: true, // 압축 여부
    // proxy: {
    //   '/api': 'http://localhost:3000' // API 요청 프록시 설정
    // }
  },
};