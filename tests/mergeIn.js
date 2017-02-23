'use strict';
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const Immutable = require('immutable');
const Timm = require('timm');

const sObj = require('../shared/simpleObj');
const obj = require('../shared/object');

const imObj = Immutable.fromJS(obj);
const imSObj = Immutable.fromJS(sObj);
const tmObj = Timm.clone(obj);
const tmSObj = Timm.clone(sObj);

suite.add('Immutable#mergeIn', function() {
  imObj.mergeIn(['relationships', 'employees', 'data', '1'], imSObj);
})
.add('Timm#mergeIn', function() {
  Timm.merge(tmObj, tmSObj);
})
.on('cycle', function(e) {
  console.log(String(e.target));
})
.on('complete', function() {
  console.log(`Winner is ${this.filter('fastest').map('name')}`);
})
.run({ async: true });
