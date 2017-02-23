const Benchmark = require('benchmark');
const suite = suite = new Benchmark.Suite;

const Immutable = require('immutable');
const obj = require('../shared/object');
const imObj = Immutable.fromJS(obj);

suite.add('Immutable#fromJS', function() {
  imObj.toJS();
})
.on('cycle', function(e) {
  console.log(String(e.target));
})
.on('complete', function() {
  console.log(`Winner is ${this.filter('fastest').map('name')}`);
})
.run({ async: true });
