'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapReduce = mapReduce;

require('./live');

require('./fields');

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.mapReduce = function (opts, cb) {
  mapReduce(this, opts, cb);
};

function mapReduce(bucket, _ref, cb, putCb, opt) {
  var newField = _ref.newField,
      newValue = _ref.newValue,
      value = _ref.value,
      filter = _ref.filter,
      filters = _ref.filters,
      _ref$iterator = _ref.iterator,
      iterator = _ref$iterator === undefined ? 'val' : _ref$iterator,
      processWhile = _ref.processWhile,
      updateWhen = _ref.updateWhen,
      _ref$logging = _ref.logging,
      logging = _ref$logging === undefined ? false : _ref$logging;


  var oldProps = {};
  var newProps = {};
  var deleteFields = {};
  var visited = {};
  var updated = false;
  var allFields = bucket.fields();
  var processedFields = 0;

  function defaultProcessWhile(_ref2) {
    var field = _ref2.field,
        val = _ref2.val;

    var reVisit = visited[field];
    var decision = !reVisit;
    log('processWhile', reVisit, decision);
    return decision;
  }

  function defaultUpdateWhen(_ref3) {
    var field = _ref3.field,
        val = _ref3.val;

    var processedAll = processedFields >= allFields.length;
    var visitedAll = allFields.every(function (f) {
      return visited[f];
    });
    var decision = visitedAll && processedAll;
    log('updateWhen', visitedAll, processedAll, decision);
    return decision;
  }

  function logger(fun) {
    return function _log() {
      var _console;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (logging) (_console = console).log.apply(_console, [fun].concat(args));
    };
  }

  var log = logger(iterator);

  processWhile = processWhile || defaultProcessWhile;
  updateWhen = updateWhen || defaultUpdateWhen;

  function ensureFun(fun) {
    if (fun && typeof fun !== 'function') {
      return function (v) {
        return fun;
      };
    } else {
      return fun;
    }
  }

  var newFieldFun = ensureFun(newField);
  var newValueFun = ensureFun(newValue);
  var oldValueFun = ensureFun(value);

  function updateBucket() {
    log('put', oldProps);
    bucket.put(oldProps, putCb, opt);
    log('put', newProps);
    bucket.put(newProps, putCb, opt);

    var deleteKeys = Object.keys(deleteFields);
    if (deleteKeys.length > 0) {
      log('DELETE', deleteKeys);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = deleteKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dkey = _step.value;

          bucket.get(dkey).put(null, putCb, opt);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    if (cb) {
      cb(bucket);
      log('DONE');
    } else {
      throw Error('Missing callback', cb);
    }
  }

  log(allFields);

  processWhile = processWhile.bind(this);
  updateWhen = updateWhen.bind(this);

  bucket.map()[iterator](function (val, field) {
    log('iterate', {
      field: field,
      val: val
    });
    var newKey = newFieldFun ? newFieldFun(field, val) : field;
    var newValue = newValueFun ? newValueFun(val, field) : val;
    var oldValue = oldValueFun ? oldValueFun(val, field) : val;
    var delField = false;

    if (filters) {
      log('process filters', filters.length);
      delField = filters.reduce(function (filtered, filter) {
        return !filtered ? filter(field, val) : filtered;
      }, false);
    }

    if (filter && filter(field, val)) {
      delField = true;
    }

    log({
      newKey: newKey,
      newValue: newValue,
      oldValue: oldValue,
      delete: delField
    });

    var doReduce = processWhile({
      field: field,
      val: val
    });
    log('doReduce', doReduce);

    if (doReduce) {
      log('reduce', {
        field: field,
        val: val,
        processedFields: processedFields
      });
      if (delField) {
        deleteFields[field] = true;
      } else {
        oldProps[field] = oldValue;
        newProps[newKey] = newValue;
      }
      visited[field] = true;
      visited[newKey] = true;
      processedFields++;
    }
    var doUpdate = updateWhen({
      field: field,
      val: val
    });
    log('doUpdate', doUpdate, processedFields);
    if (doUpdate) {
      // on stopCondition
      if (!updated) {
        log('UPDATE BUCKET');
        updated = true;
        updateBucket();
      } else {
        log('ignore update');
      }
    }
  });
}
//# sourceMappingURL=map-reduce.js.map
