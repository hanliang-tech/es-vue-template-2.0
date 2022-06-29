# es-vue-template-2.0

扩展屏小程序初始化模板

> extent screen 简称 （ES） 容器可以理解为一个精简版的浏览器，针对TV端特殊的遥控器交互模式，从底层做了大量优化工作，在启动速度、可复用列表组件、渲染效率、动画速度、 网络通信等等都提供了超高的性能表现。提供了接近 Web 的开发体验。目前上层支持了Vue界面框架，前端开发人员可以通过它，将前端代码转换为终端的原生 指令，进行原生终端 App 的开发。

## 开发调试流程

以下操作都需要通过cmd/terminal窗口进入到项目所在目录下

## 安装

```
yarn install
```

### 运行调试

```
npm run dev
npm run debug
```

### adb连接电视

```
adb connect 192.168.X.X
```

> 电视ip

### 安装容器

```
adb install -r /Downloads/eskit-debugger.apk
```

> 下载的开发版容器所在目录，安装后打开应用

### 容器设置DEBUG_HOST

```
adb shell am broadcast -a tv.eskit.debugger.ACTION_CHANGE_DEBUG_SERVER --es ip 192.168.90.143
```

> 此处是电脑ip，然后用遥控器点击“加载测试代码”即可看到界面

### 如何看错误性的log

用chrome浏览器打开chrome://inspect/ 勾选Discover network targets，配置加入电脑38989端口，例如：192.168.x.x:38989，然后inspect查看log调试

### 调试中不刷新如何解决

如果调试中出现修改代码保存后电视不刷新现象，需要检查adb连接情况或者设备是否在线 在cmd/terminal窗口输入 adb devices ，如果没有连接中设备需要输入 adb connect 192.168.X.X(电视ip)
重新连接，如果设备显示 offline 需要执行adb disconnect后重新连接或重启电视

## 发布流程

```
npm run vendor
npm run esbuild
```

> 找到根目录下 /dist/android 文件夹，打包成.zip文件, 并进入开发者平台上传代码包

##    

## [开发者平台](http://mp.es.hiliad.com/)

成为开发者详情请参考 [[开发者说明]](http://developer.es.hiliad.com/developer/apply/)

[扩展屏文档中心](http://developer.es.hiliad.com/)
