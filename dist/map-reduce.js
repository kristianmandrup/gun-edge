'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapReduce = mapReduce;

require('./live');

require('./value');

require('./async');

require('./fields');

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.mapReduce = function (opts, cb) {
  mapReduce(this, opts, cb);
};

function mapReduce(bucket) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var cb = arguments[2];
  var putCb = arguments[3];
  var opt = arguments[4];


  bucket.fields(function (allFields) {
    console.log('allFields', allFields);
    options = Object.assign(options, {
      allFields: allFields
    });
    doMapReduce(bucket, options, cb, putCb, opt);
  });
}

function logger(fun, logging) {
  return function _log() {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (logging) (_console = console).log.apply(_console, [fun].concat(args));
  };
}

function doMapReduce(bucket, _ref, cb, putCb, opt) {
  var newField = _ref.newField,
      newValue = _ref.newValue,
      value = _ref.value,
      filter = _ref.filter,
      filters = _ref.filters,
      _ref$fields = _ref.fields,
      fields = _ref$fields === undefined ? [] : _ref$fields,
      _ref$ignoreFields = _ref.ignoreFields,
      ignoreFields = _ref$ignoreFields === undefined ? [] : _ref$ignoreFields,
      allFields = _ref.allFields,
      _ref$iterator = _ref.iterator,
      iterator = _ref$iterator === undefined ? 'val' : _ref$iterator,
      validField = _ref.validField,
      processWhile = _ref.processWhile,
      updateWhen = _ref.updateWhen,
      updateBucket = _ref.updateBucket,
      deleteFromBucket = _ref.deleteFromBucket,
      done = _ref.done,
      _ref$logging = _ref.logging,
      logging = _ref$logging === undefined ? false : _ref$logging;


  var ctx = {
    oldProps: {},
    newProps: {},
    filteredFields: {},
    visited: {},
    updated: false,
    processedFields: 0,
    allFields: allFields,
    fields: fields,
    ignoreFields: ignoreFields
  };

  var log = logger(iterator, logging);

  log('ctx', ctx);

  function defaultProcessWhile(_ref2) {
    var field = _ref2.field,
        val = _ref2.val,
        ctx = _ref2.ctx;

    var reVisit = ctx.visited[field];
    var decision = !reVisit;
    log('processWhile', reVisit, decision);
    return decision;
  }

  function defaultValidField(field, ctx) {
    var fields = ctx.fields,
        ignoreFields = ctx.ignoreFields;

    var valid = fields.length === 0 || fields.length > 0 && fields.indexOf(field) >= 0;
    var invalid = ignoreFields.length > 0 && ignoreFields.indexOf(field) >= 0;
    return valid && !invalid;
  }

  function defaultUpdateWhen(_ref3) {
    var field = _ref3.field,
        val = _ref3.val,
        ctx = _ref3.ctx;

    var processedAll = ctx.processedFields >= ctx.allFields.length;
    var visitedAll = ctx.allFields.every(function (f) {
      return ctx.visited[f];
    });
    var decision = visitedAll && processedAll;
    log('updateWhen', visitedAll, processedAll, decision);
    return decision;
  }

  function defaultDeleteFromBucket(bucket, ctx) {
    var deleteKeys = Object.keys(ctx.filteredFields);
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
  }

  function defaultUpdateBucket(bucket, ctx) {
    log('put', ctx.oldProps);
    bucket.put(ctx.oldProps, putCb, opt);
    log('put', ctx.newProps);
    bucket.put(ctx.newProps, putCb, opt);
  }

  function defaultDone(bucket, cb) {
    log('DONE');
    if (cb) {
      cb(bucket);
    } else {
      throw Error('Missing callback', cb);
    }
  }

  validField = validField || defaultValidField;
  processWhile = processWhile || defaultProcessWhile;
  updateWhen = updateWhen || defaultUpdateWhen;
  updateBucket = updateBucket || defaultUpdateBucket;
  deleteFromBucket = deleteFromBucket || defaultDeleteFromBucket;
  done = done || defaultDone;

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

  log(allFields);

  // processWhile = processWhile.bind(this)
  // updateWhen = updateWhen.bind(this)

  bucket.map()[iterator](function (val, field) {
    log('iterate', {
      field: field,
      val: val
    });
    if (!validField(field, ctx)) return;

    var newKey = newFieldFun ? newFieldFun(field, val) : field;
    var newValue = newValueFun ? newValueFun(val, field) : val;
    var oldValue = oldValueFun ? oldValueFun(val, field) : val;
    var doFilter = false;

    if (filters) {
      log('process filters', filters.length);
      doFilter = filters.reduce(function (filtered, filter) {
        return !filtered ? filter(field, val) : filtered;
      }, false);
    }

    if (filter && filter(field, val)) {
      doFilter = true;
    }

    log({
      newKey: newKey,
      newValue: newValue,
      oldValue: oldValue,
      doFilter: doFilter
    });

    var doReduce = processWhile({
      field: field,
      val: val,
      ctx: ctx
    });
    log('doReduce', doReduce);

    if (doReduce) {
      log('reduce', {
        field: field,
        val: val,
        processedFields: ctx.processedFields
      });
      if (doFilter) {
        ctx.filteredFields[field] = true;
      } else {
        ctx.oldProps[field] = oldValue;
        ctx.newProps[newKey] = newValue;
      }
      ctx.visited[field] = true;
      ctx.visited[newKey] = true;
      ctx.processedFields++;
    }
    var doUpdate = updateWhen({
      field: field,
      val: val,
      ctx: ctx
    });
    log('doUpdate', doUpdate, ctx.processedFields);
    if (doUpdate) {
      // on stopCondition
      if (!ctx.updated) {
        log('UPDATE BUCKET');
        ctx.updated = true;
        updateBucket(bucket, ctx);
        deleteFromBucket(bucket, ctx);
        done(bucket, cb);
      } else {
        log('ignore update');
      }
    }
  });
}
//# sourceMappingURL=map-reduce.js.map
