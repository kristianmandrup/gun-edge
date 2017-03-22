import Gun from 'gun/gun'

Gun.create = function () {
  return Gun.apply(this, arguments);
};