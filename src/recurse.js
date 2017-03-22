import Gun from 'gun/gun'

Gun.chain.recurse = function (cb, filter) {
  if (!(filter instanceof Object)) {
    filter = {};
  }
  this.val(cb);
  this.map().val(function (data) {
    if (!(data instanceof Object)) {
      return;
    }
    var soul = Gun.is.node.soul(data);
    if (filter[soul]) {
      return;
    }
    filter[soul] = true;
    this.recurse(cb, filter);
  });
  return this;
};