'use strict';
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const Immutable = require('immutable');
const Seamless = require('seamless-immutable');
const Timm = require('timm');

const obj = require('../shared/object');

const imObj = Immutable.fromJS(obj);
const smObj = Seamless(obj); 
const tmObj = Timm.clone(obj);

suite.add('Immutable#get', function() {
  imObj.get('id');
})
.add('Vanilla JS shallow read on Seamless object', function() {
  smObj.id;
})
.add('Vanilla JS shallow read on Timm object', function() {
  tmObj.id;
})
.on('cycle', function(e) {
  console.log(String(e.target));
})
.on('complete', function() {
  console.log(`Winner is ${this.filter('fastest').map('name')}`);
})
.run({ async: true });
