# mapbox-gl-webpack-test
使用webpack打包mapbox-gl和mapbox-gl-draw的最小例子，使用es6语法

## 安装webpack
* 安装webpack
* 安装json-loader，css-loader，style-loader
* 安装babel-core，babel-loader，babel-preset-es2015
为了简单，并没有安装webpack-dev-server

## 使用webpack打包mapbox-gl需要注意几点：
* 安装mapbox-gl
* 安装browserify
* 安装transform-loader
* 安装webworkify-webpack@1.0.6，注意必须安装1.0.6版本，其他版本打包运行时报错

## 添加webpack配置文件
* 由于mapbox-gl用到了fs模块读取shaders文件，所以需要用transform-loader翻译fs模块
~
{
    test: /\.js$/,
    include: [
        path.resolve('node_modules/mapbox-gl')
    ],
    loader: 'transform/cacheable?brfs'
}
~
上面这段配置中让transform-loader使用brfs来翻译来自mapbox-gl的.js代码，这样只要是mapbox-gl中用到的fs都会被brfs翻译成
浏览器端可执行的代码

* 由于mapbox-gl使用了webworkify模块，为了支持webpack，需要给webworkify取一个别名webworkify-webpack
~
resolve: {
    alias: {
        'webworkify': 'webworkify-webpack'
    }
}
~

* 由于依赖项mapbox-gl-draw->geojsonhint->jsonlint-lines中的代码也用到了fs模块，
但是却不能和mapbox-gl一样通过transform-loader处理，那样打包会报错，这时候，只能
通过申明fs为空模块的方式来欺骗打包器工作，不过好在用到fs的代码是为node控制台程序
准备的，在浏览器端不会执行到，所以不会出问题
~
node: {
    fs: 'empty'
}
~

## 使用mapbox-gl和mapbox-gl-draw
~
import mapboxgl from 'mapbox-gl';
import Draw from 'mapbox-gl-draw';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css'
import '../node_modules/mapbox-gl-draw/dist/mapbox-gl-draw.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFuZ2xhbmsiLCJhIjoiY2lpcjc1YzQxMDA5NHZra3NpaDAyODB4eSJ9.z6uZHccXvtyVqA5zmalfGg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
});

const drawControl = Draw({position:"top-left"});

map.on('load', ()=> {
    map.addControl(drawControl);
});
~
除了导入mapbox-gl库和mapbox-gl-draw库意外，还应该导入对应的css文件，否则mapbox-gl-draw可能会显示不出来

## 安装运行
* 克隆代码
* npm install
* npm start
* 用浏览器打开index.html文件


