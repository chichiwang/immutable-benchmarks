'use strict';
const Benchmark = require('benchmark');
const suite = suite = new Benchmark.Suite;

const Immutable = require('immutable');
const Seamless = require('seamless-immutable');
const Timm = require('timm');

const obj = require('../shared/object');

suite.add('Immutable#fromJS', function() {
  Immutable.fromJS(obj);
})
.add('Seamless', function() {
  Seamless(obj);
})
.add('Timm#clone', function() {
  Timm.clone(obj);
})
.on('cycle', function(e) {
  console.log(String(e.target));
})
.on('complete', function() {
  console.log(`Winner is ${this.filter('fastest').map('name')}`);
})
.run({ async: true });
