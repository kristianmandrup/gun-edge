'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.addMapReduce = addMapReduce;
exports.mapReduce = mapReduce;

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addMapReduce(_ref) {
  var chain = _ref.chain;

  chain.mapReduce = function (opts, cb, putCb, opt) {
    mapReduce(this, opts, cb, putCb, opt);
  };
  return chain;
}

function mapReduce(bucket) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var cb = arguments[2];
  var putCb = arguments[3];
  var opt = arguments[4];

  bucket.fields(function (allFields) {
    options = (0, _assign2.default)(options, {
      allFields: allFields
    });
    doMapReduce(bucket, options, cb, putCb, opt);
  });
}

function defaultLogger(fun, logging) {
  return function () {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (logging) (_console = console).log.apply(_console, [fun].concat(args));
  };
}

function doMapReduce(bucket, _ref2, cb, putCb, opt) {
  var newField = _ref2.newField,
      newValue = _ref2.newValue,
      value = _ref2.value,
      transform = _ref2.transform,
      filter = _ref2.filter,
      filters = _ref2.filters,
      _ref2$fields = _ref2.fields,
      fields = _ref2$fields === undefined ? [] : _ref2$fields,
      _ref2$ignoreFields = _ref2.ignoreFields,
      ignoreFields = _ref2$ignoreFields === undefined ? [] : _ref2$ignoreFields,
      allFields = _ref2.allFields,
      _ref2$iterator = _ref2.iterator,
      iterator = _ref2$iterator === undefined ? 'val' : _ref2$iterator,
      validField = _ref2.validField,
      processWhile = _ref2.processWhile,
      updateWhen = _ref2.updateWhen,
      updateBucket = _ref2.updateBucket,
      filterBucket = _ref2.filterBucket,
      saveChanges = _ref2.saveChanges,
      done = _ref2.done,
      _ref2$logging = _ref2.logging,
      logging = _ref2$logging === undefined ? false : _ref2$logging,
      logger = _ref2.logger,
      context = _ref2.context;


  var ctx = {
    oldProps: {},
    newProps: {},
    filteredFields: {},
    visited: {},
    updated: false,
    processedFields: 0,
    allFields: allFields,
    fields: fields,
    ignoreFields: ignoreFields,
    iterator: iterator,
    context: context,
    putCb: putCb,
    opt: opt
  };

  transform = transform || function (field, val) {
    return {};
  };

  logger = logger || defaultLogger;

  var log = logger(iterator, logging);

  log('ctx', ctx);

  function defaultProcessWhile(_ref3) {
    var field = _ref3.field,
        val = _ref3.val,
        ctx = _ref3.ctx;

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

  function defaultUpdateWhen(_ref4) {
    var field = _ref4.field,
        val = _ref4.val,
        ctx = _ref4.ctx;

    var processedAll = ctx.processedFields >= ctx.allFields.length;
    var visitedAll = ctx.allFields.every(function (f) {
      return ctx.visited[f];
    });
    var decision = visitedAll && processedAll;
    log('updateWhen', visitedAll, processedAll, decision);
    return decision;
  }

  function defaultSaveChanges(bucket, changesObj, ctx) {
    bucket.put(changesObj, ctx.putCb, ctx.opt);
  }

  function defaultFilterBucket(bucket, ctx) {
    var deleteKeys = (0, _keys2.default)(ctx.filteredFields);
    if (deleteKeys.length > 0) {
      log('FILTER', deleteKeys);
      var deleteObj = deleteKeys.reduce(function (obj, key) {
        obj[key] = null;
        return obj;
      }, {});
      log('deleteObj', deleteObj);
      ctx.saveChanges(bucket, deleteObj, ctx);
    }
  }

  function defaultUpdateBucket(bucket, ctx) {
    log('UPDATE', props);
    var props = (0, _assign2.default)(ctx.oldProps, ctx.newProps);
    ctx.saveChanges(bucket, props, ctx);
  }

  function defaultDone(bucket, cb, ctx) {
    log('DONE');
    if (cb) {
      cb(bucket, ctx);
    } else {
      throw Error(ctx.iterator + ': missing callback (in done)');
    }
  }

  validField = validField || defaultValidField;
  processWhile = processWhile || defaultProcessWhile;
  updateWhen = updateWhen || defaultUpdateWhen;
  updateBucket = updateBucket || defaultUpdateBucket;
  filterBucket = filterBucket || defaultFilterBucket;
  saveChanges = saveChanges || defaultSaveChanges;
  done = done || defaultDone;

  ctx.saveChanges = saveChanges;

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

    var newKey = newFieldFun ? newFieldFun(field, val, ctx) : field;
    var newValue = newValueFun ? newValueFun(val, field, ctx) : val;
    var newObj = transform(field, val, ctx);

    var oldValue = oldValueFun ? oldValueFun(val, field, ctx) : val;
    var doFilter = false;

    if (filters) {
      log('process filters', filters.length);
      doFilter = filters.reduce(function (filtered, filter) {
        return !filtered ? filter(field, val, ctx) : filtered;
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
        ctx.newProps = (0, _assign2.default)(ctx.newProps, newObj);
        ctx.newProps[newKey] = newValue;

        ctx.oldProps[field] = oldValue;
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
      if (!ctx.updated) {
        log('UPDATE BUCKET');
        ctx.updated = true;
        updateBucket(bucket, ctx);
        filterBucket(bucket, ctx);
        done(bucket, cb, ctx);
      } else {
        log('ignore update');
      }
    }
  });
}
//# sourceMappingURL=map-reduce.js.map
