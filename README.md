## Berth

This project is a testing / creation ground for visual and interactive web experiences, using Phaser 3.

Many thanks to [Photon Storm](https://github.com/photonstorm) for offering such a great framework to play with! [Phaser 3](https://github.com/photonstorm/phaser) kicks ass and is a lot of fun to code with!

Special thanks to [nkholski](https://github.com/nkholski) for providing an informative place to start with Webpack / Babel configuration, specifically for Phaser 3 : [phaser3-es6-webpack](https://github.com/nkholski/phaser3-es6-webpack)

### Pour Quel

The objective is to have a framework that assists in creating prototypes, in effort to learn and execute various concepts or fancies, as well build examples to draw from.

As a bonus, I've taken this project as an opportunity to explore React - good time to knock one out and get a firm grasp on React development principles.

There are 3 components : **Games**, **Client** and **Server**.

#### Games
- Game prototype source code

#### Client
- React client source code

#### Server
- Express server based on a pattern I've used and simplified upon for many APIs, this time with ES6
- The `/public` destination for **Games** and **Client** packages
- Filesystem data storage for game meta data (JSON)

### L'App

#### Install
```
git clone git@github.com:coleman-benjamin/berth.git
cd berth
npm install
```

#### Generate base prototype
```
# In the works
```

#### Package Game
```
# Let me know when there's a nicer way to pass args via NPM
#
npm run game -- --game=[module_name]
```

See `/games/src/example`. 

Run `npm run game --game=example`.

#### Package Client
```
npm run client
```

#### Development packaging

Prefix with `dev-`, e.g. `npm run dev-client` to create unminified packages for development purposes.