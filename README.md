## Berth

This project is a testing / creation ground for visual / interactive web experiences, using Phaser 3.

Many thanks to [Photon Storm](https://github.com/photonstorm) for offering such a great framework to play with! [Phaser 3](https://github.com/photonstorm/phaser) kicks ass and is a lot of fun to code with!

Special thanks to [nkholski](https://github.com/nkholski/phaser3-es6-webpack) for providing an informative place to start with Webpack / Babel configuration, specifically for Phaser 3 : [phaser3-es6-webpack](https://github.com/nkholski/phaser3-es6-webpack)

### Pour Quel

The objective is to have a framework that assists in creating prototypes, in effort to learn and execute various concepts or fancies, as well build examples to draw from.

As a bonus, I've taken this project as an opportunity to explore React - good time to knock one out and get a firm grasp of React development principles.

There are 3 components : **Games**, **Web** and **Public**.

#### Games
- For writing game prototype source code
- Each game / prototype is packaged and sent to **Public** via webpack / babel (packaging instructions below)

#### Web
- Contains Express server and React client source code

#### Public
- Contains base HTML, client scripts, and all scripts / assets from packaged games

### L'App

#### Install
```
git clone git@github.com:coleman-benjamin/berth.git
cd berth
npm install
```

#### Generate prototype base
```
Coming soon!
```

#### Package Game
##### dev
```
npm run dev-game -- --game=[module_name]
```
##### build
```
npm run build-game -- --game=[module_name]
```

#### Package Client
##### dev
```
npm run dev-client
```
##### build
```
npm run build-client
```

#### Serve
```
npm run web
```
