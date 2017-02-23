'use strict';
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const Immutable = require('immutable');
const Seamless = require('seamless-immutable');
const Timm = require('timm');

const obj = require('../shared/simpleObj');

const imObj = Immutable.fromJS(obj);
const smObj = Seamless(obj);
const tmObj = Timm.clone(obj);

let newValue = 0;

suite.add('Immutable#setIn', function() {
  imObj.setIn(['deep', 'nested', 'value'], newValue++);
})
.add('Seamless#setIn', function() {
  Seamless.setIn(smObj, ['deep', 'nested', 'value'], newValue++);
})
.add('Timm#setIn', function() {
  Timm.setIn(tmObj, ['deep', 'nested', 'value'], newValue++);
})
.on('cycle', function(e) {
  newValue = 0;
  console.log(String(e.target));
})
.on('complete', function() {
  console.log(`Winner is ${this.filter('fastest').map('name')}`);
})
.run({ async: true });
