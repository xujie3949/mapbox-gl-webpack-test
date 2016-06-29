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
* 安装webworkify
* 安装webworkify-webpack@1.0.6

注意：webworkify-webpack必须安装1.0.6版本，最新版本打包运行时会报错

## 添加webpack配置文件
* 首先添加transform-loader
    ```js
    {
        test: /\.js$/,
        include: [
            path.resolve('node_modules/mapbox-gl')
        ],
        loader: 'transform/cacheable?brfs'
    }
    ```
    上面这段配置中让transform-loader使用brfs来翻译来自mapbox-gl的.js代码，这样只要是mapbox-gl中用到的fs都会被brfs翻译成
浏览器端可执行的代码

* 由于mapbox-gl使用了webworkify模块，为了支持webpack，需要给webworkify取一个别名webworkify-webpack
    ```js
    resolve: {
        alias: {
            'webworkify': 'webworkify-webpack'
        }
    }
    ```

* 由于依赖项mapbox-gl-draw->geojsonhint->jsonlint-lines中的代码也用到了fs模块，但是却不能和mapbox-gl一样
通过transform-loader处理，那样打包会报错。这时候，只能通过申明fs为空模块的方式来欺骗打包器工作，不过好在
用到fs的代码是为node控制台程序准备的，在浏览器端不会执行到，所以不会出问题
    ```js
    node: {
        fs: 'empty'
    }
    ```
* 为了更方便的调试代码，source-map需要支持两点：
    * 能够显示打包前的代码，能够打断点并命中
    * 刷新页面以后，js加载过程中的断点能命中

    经过尝试使用inline-source-map能符合以上要求，也能配合webpack-dev-server使用,inline-source-map会将.map文件一起打包
    进bundle.js，适合开发使用，生产环境适合使用source-map
    ```js
    devtool: 'inline-source-map'
    ```


## 使用mapbox-gl和mapbox-gl-draw
以下代码段演示使用mapbox-gl和mapbox-gl-draw
```js
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
```
注意：除了导入mapbox-gl库和mapbox-gl-draw库以外，还应该导入其对应的css文件，否则mapbox-gl-draw会因为样式不对而显示不出来

## 安装运行
* 克隆代码
* npm install
* npm start
* 用浏览器打开index.html文件


