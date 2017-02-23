'use strict';
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const _ = require('lodash');
const DeepEqual = require('deep-equal');

const Immutable = require('immutable');
const Seamless = require('seamless-immutable');
const Timm = require('timm');

const obj = require('../shared/object');
const sObj = require('../shared/simpleObj');

const imObj = Immutable.fromJS(obj);
const imSObj = Immutable.fromJS(sObj);
const imObjC = Immutable.fromJS(obj);
const imObjM = imObj.setIn(['relationships', 'settings', 'data', 'id'], 2);

const smObj = Seamless(obj);
const smSObj = Seamless(sObj);
const smObjC = Seamless(obj);

const tmObj = Timm.clone(obj);
const tmSObj = Timm.clone(sObj);
const tmObjC = Timm.clone(obj);
const tmObjM = Timm.setIn(tmObj, ['relationships', 'settings', 'data', 'id'], 2);

suite.add('Immutable#is on obvious fail', function() {
  Immutable.is(imObj, imSObj);
})
suite.add('Immutable#is on clone', function() {
  Immutable.is(imObj, imObjC);
})
.add('_.isEqual on obvious fail Seamless Objects', function() {
  _.isEqual(smObj, smSObj);
})
.add('_.isEqual on cloned Seamless Objects', function() {
  _.isEqual(smObj, smObjC);
})
.add('_.isEqual on obvious fail Timm Objects', function() {
  _.isEqual(tmObj, tmSObj);
})
.add('_.isEqual on cloned Timm Objects', function() {
  _.isEqual(tmObj, tmObjC);
})
.add('deep-equal on obvious fail Seamless Objects', function() {
  DeepEqual(smObj, smSObj);
})
.add('deep-equal on cloned Seamless Objects', function() {
  DeepEqual(smObj, smObjC);
})
.add('deep-equal on obvious fail Timm Objects', function() {
  DeepEqual(tmObj, tmSObj);
})
.add('deep-equal on cloned Timm Objects', function() {
  DeepEqual(tmObj, tmObjC);
})
// JSON.stringify is not a reliable method of deep diffing
// .add('JSON.stringify() on obvious fail Seamless Objects', function() {
//   JSON.stringify(smObj) === JSON.stringify(smSObj);
// })
// .add('JSON.stringify() on cloned Seamless Objects', function() {
//   JSON.stringify(smObj) === JSON.stringify(smObjC);
// })
// .add('JSON.stringify() on obvious fail Timm Objects', function() {
//   JSON.stringify(tmObj) === JSON.stringify(tmSObj);
// })
// .add('JSON.stringify() on cloned Timm Objects', function() {
//   JSON.stringify(tmObj) === JSON.stringify(tmObjC);
// })
.add('Immutable#is on mutated object', function() {
  Immutable.is(imObj, imObjM);
})
.add('deep-equal on mutated Timm objects', function() {
  DeepEqual(tmObj, tmObjM);
})
.on('cycle', function(e) {
  console.log(String(e.target));
})
.on('complete', function() {
  console.log(`Winner is ${this.filter('fastest').map('name')}`);
})
.run({ async: true });
