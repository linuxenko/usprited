[![Donate](https://img.shields.io/badge/donate-3$-green.svg?style=flat-square)](https://www.linuxenko.pro/donate.html#?amount=3)

[![](https://cdn.rawgit.com/linuxenko/linuxenko.github.io/master/showcase/usprited/logo.png)](https://cdn.rawgit.com/linuxenko/linuxenko.github.io/master/showcase/usprited/logo.png)

### About

  Try it with [online demo](http://linuxenko.github.io/showcase/usprited/)

 uSpritEd is a full featured sprite editor for web browser. Development were inspired
 by another sprite editors i often using. uSprited is a collection all the cool features
 from another sprite editors.

[![](https://cdn.rawgit.com/linuxenko/linuxenko.github.io/master/showcase/usprited/demo.gif)](https://cdn.rawgit.com/linuxenko/linuxenko.github.io/master/showcase/usprited/demo.gif)

### Features

 * Automatically area detection capability.Auto detection and partial detection of the sprites on images with any background color. Manual correction of the selected regions support.
 * Sprite editor. Sprite highlighting, manually correct, clear sprites, naming and so on.
 * Retina 2x images support.
 * Support of any image formats web browser support.
 * Support popular export formats : CSS and JSON.



##### Technologies

 Developed using HTML5 Canvas, Drag & Drop features.
 Presentation part of uSprited developed using React DOM framework.
 Sprite detection mechanism based on [rextract.js](https://github.com/linuxenko/rextract.js).
 Webpack as build tool.

##### Installation

Webpack have to be installed, if not yet:

```
npm install webpack -g
```

Then clone repository and build it by running following commands: 

```
npm install
npm build
```
It's all. Now "./dist" directory contains application.

Run webserver

```
npm start
```

Now you can open [http://localhost:8080/](http://localhost:8080/).


### License

MIT
 
Copyright (c) 2016 Svetlana Linuxenko
