/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tile_1 = __webpack_require__(1);
	var SimpleGame = (function () {
	    function SimpleGame() {
	        var _this = this;
	        this.canMove = false;
	        this.moved = false;
	        this.relaunchMove = false;
	        this.win = false;
	        this.prepareTiles = function () {
	            var box = _this.game.add.graphics(0, 0);
	            for (var i = 0; i < _this.tilesNumber; i++) {
	                _this.tileSet[i] = [];
	                _this.tileSetUpdate[i] = [];
	                for (var j = 0; j < _this.tilesNumber; j++) {
	                    var x = i * _this.tileWidth;
	                    var y = j * _this.tileHeight;
	                    _this.tileSet[i][j] = { tile: tile_1.default, used: false, updated: false };
	                    _this.tileSetUpdate[i][j] = [];
	                    console.log(x, y);
	                    box.beginFill(0xbdc3c7);
	                    box.drawRect(x, y, _this.tileWidth, _this.tileHeight);
	                    box.lineStyle(1, 0xecf0f1, 1);
	                    box.endFill();
	                }
	            }
	        };
	        this.addTwo = function () {
	            do {
	                var randX = Math.floor((Math.random() * 4));
	                var randY = Math.floor((Math.random() * 4));
	            } while (_this.tileSet[randX][randY].used);
	            _this.tileSet[randX][randY].tile = new tile_1.default(_this.game, _this.tileHeight, _this.tileWidth, randX, randY, 2);
	            _this.tileSet[randX][randY].used = true;
	        };
	        this.create = function () {
	            _this.highestNumberText = _this.game.add.text(0, 0, '', {});
	            _this.scoreText = _this.game.add.text(0, 0, '', {});
	            _this.prepareTiles();
	            _this.addTwo();
	            _this.addTwo();
	            console.log(_this.highestNumberText);
	            _this.highestNumberText.text = _this.highestNumber.toString();
	            _this.cursors = _this.game.input.keyboard.createCursorKeys();
	            _this.canMove = true;
	        };
	        this.move = function (x, y) {
	            if (x < 0 || y < 0) {
	                _this.moveReverse(x, y);
	            }
	            else {
	                for (var i = 0; i < _this.tilesNumber; i++) {
	                    for (var j = 0; j < _this.tilesNumber; j++) {
	                        if (_this.tileSet[i][j].used) {
	                            _this.updateTile(i, j, x, y);
	                        }
	                    }
	                }
	            }
	        };
	        this.moveReverse = function (x, y) {
	            var max = _this.tilesNumber - 1;
	            for (var i = max; i >= 0; i--) {
	                for (var j = max; j >= 0; j--) {
	                    if (_this.tileSet[i][j].used) {
	                        _this.updateTile(i, j, x, y);
	                    }
	                }
	            }
	        };
	        this.updateTile = function (i, j, x, y) {
	            if ((j + y > -1 && j + y < 4) && (i + x > -1 && i + x < 4)) {
	                if (!_this.tileSet[i][j].updated && _this.tileSet[i + x][j + y].used && (_this.tileSet[i + x][j + y].tile.value === _this.tileSet[i][j].tile.value)) {
	                    _this.tileSet[i + x][j + y].tile.multiply();
	                    _this.tileSet[i + x][j + y].tile.value > _this.highestNumber ? _this.highestNumber = _this.tileSet[i + x][j + y].tile.value : '';
	                    _this.tileSet[i + x][j + y].updated = true;
	                    _this.tileSet[i][j].tile.deleteBox();
	                    _this.tileSet[i][j] = { tile: tile_1.default, used: false };
	                    _this.moved = true;
	                }
	                else if (!_this.tileSet[i + x][j + y].used) {
	                    _this.tileSet[i + x][j + y].updated = false;
	                    _this.tileSet[i][j].tile.updatePosition(i + x, j + y);
	                    _this.tileSet[i + x][j + y] = _this.tileSet[i][j];
	                    _this.tileSet[i][j] = { tile: tile_1.default, used: false };
	                    _this.moved = true;
	                }
	            }
	        };
	        this.update = function () {
	            _this.updateText();
	            _this.countScore();
	            if (_this.highestNumber === 2048 && !_this.win) {
	                alert("Gratulacje wygrałes. Możesz grać dalej");
	                _this.win = true;
	            }
	            if (_this.canMove) {
	                if (_this.cursors.left.isDown) {
	                    _this.canMove = false;
	                    for (var i = 0; i < _this.tilesNumber; i++) {
	                        _this.move(-1, 0);
	                    }
	                    _this.canMove = true;
	                }
	                else if (_this.cursors.right.isDown) {
	                    _this.canMove = false;
	                    for (var i = 0; i < _this.tilesNumber; i++) {
	                        _this.move(1, 0);
	                    }
	                    _this.canMove = true;
	                }
	                else if (_this.cursors.up.isDown) {
	                    _this.canMove = false;
	                    for (var i = 0; i < _this.tilesNumber; i++) {
	                        _this.move(0, -1);
	                    }
	                    _this.canMove = true;
	                }
	                else if (_this.cursors.down.isDown) {
	                    _this.canMove = false;
	                    for (var i = 0; i < _this.tilesNumber; i++) {
	                        _this.move(0, 1);
	                    }
	                    _this.canMove = true;
	                }
	            }
	            if (_this.moved && _this.cursors.down.isUp && _this.cursors.left.isUp && _this.cursors.up.isUp && _this.cursors.right.isUp) {
	                _this.relaunchMove = false;
	                _this.moved = false;
	                _this.addTwo();
	                _this.prepareTileSet();
	                console.log(_this.highestNumber);
	            }
	        };
	        this.prepareTileSet = function () {
	            for (var i = 0; i < _this.tilesNumber; i++) {
	                for (var j = 0; j < _this.tilesNumber; j++) {
	                    _this.tileSet[i][j].updated = false;
	                }
	            }
	        };
	        this.updateText = function () {
	            _this.highestNumberText.x = 10;
	            _this.highestNumberText.y = _this.tilesNumber * _this.tileHeight + 50;
	            _this.highestNumberText.text = 'Największa wartość: ' + _this.highestNumber.toString();
	        };
	        this.countScore = function () {
	            _this.score = 0;
	            for (var i = 0; i < _this.tilesNumber; i++) {
	                for (var j = 0; j < _this.tilesNumber; j++) {
	                    if (_this.tileSet[i][j].used) {
	                        _this.score += _this.tileSet[i][j].tile.value;
	                    }
	                }
	            }
	            _this.scoreText.x = 10;
	            _this.scoreText.y = _this.tilesNumber * _this.tileHeight + 100;
	            _this.scoreText.text = 'Wynik: ' + _this.score.toString();
	        };
	        this.game = new Phaser.Game(800, 800, Phaser.AUTO, 'content', { create: this.create, update: this.update }, true);
	        this.tileSet = [];
	        this.tileSetUpdate = [];
	        this.tilesNumber = 4;
	        this.tileHeight = 100;
	        this.tileWidth = 100;
	        this.score = 0;
	        this.highestNumber = 2;
	    }
	    return SimpleGame;
	}());
	window.onload = function () {
	    var game = new SimpleGame();
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Created by Olek on 18.08.2016.
	 */
	"use strict";
	var Tile = (function () {
	    function Tile(game, tileWidth, tileHeight, newX, newY, newValue) {
	        var _this = this;
	        this.draw = function () {
	            _this.box.beginFill(0xf39c12);
	            _this.box.drawRect(_this.x, _this.y, _this.tileWidth, _this.tileHeight);
	            _this.box.endFill();
	            _this.updateText();
	        };
	        this.updatePosition = function (newX, newY) {
	            _this.x = newX * _this.tileWidth;
	            _this.y = newY * _this.tileHeight;
	            _this.box.clear();
	            _this.draw();
	        };
	        this.updateText = function () {
	            _this.tileText.x = Math.floor(_this.x + _this.tileWidth / 2);
	            _this.tileText.y = Math.floor(_this.y + _this.tileHeight / 2);
	            _this.tileText.text = _this.value.toString();
	        };
	        this.multiply = function () {
	            _this.value = _this.value * 2;
	            _this.updateText();
	        };
	        this.deleteBox = function () {
	            _this.box.clear();
	            _this.tileText.text = "";
	        };
	        this.game = game;
	        this.tileHeight = tileHeight;
	        this.tileWidth = tileWidth;
	        this.x = newX * tileWidth;
	        this.y = newY * tileHeight;
	        this.value = newValue;
	        this.box = this.game.add.graphics(0, 0);
	        this.tileText = this.game.add.text(0, 0, '', {});
	        this.draw();
	    }
	    return Tile;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Tile;


/***/ }
/******/ ]);