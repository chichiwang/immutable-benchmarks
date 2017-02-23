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

suite.add('Immutable#set', function() {
  imObj.set('shallow', newValue++);
})
.add('Seamless#set', function() {
  Seamless.set(smObj, 'shallow', newValue++);
})
.add('Timm#set', function() {
  Timm.set(tmObj, 'shallow', newValue++);
})
.on('cycle', function(e) {
  newValue = 0;
  console.log(String(e.target));
})
.on('complete', function() {
  console.log(`Winner is ${this.filter('fastest').map('name')}`);
})
.run({ async: true });
