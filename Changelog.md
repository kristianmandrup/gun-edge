## Changelog

### 0.7.0

First release:

- `Gun.create`

gun chain methods
- `.date(dateValue)`
- `.each()`
- `.live(cb, opt)` - listen to new values like `on` but without the meta data
- `.local(data, cb, opt)` - store locally only, no peer sync
- `.mapReduce(opts, cb)` - mapReduce on a bucket (see below)
- `.no(cb)`
- `.out(navOpts)`
- `.recurse(cb, filter)` - recursively navigate bucket graph/tree structure
- `.value(cb, opt)` - get the node value (no meta)

Async methods (use via Promise or async/await)
- `.valueAsync(cb, opt)` : async - get the value (no meta)
- `.valueAt(path, cb, opt)` : async - get the value at the `path` (no meta)
- `.mapAsync(transform, opt)` : async - map and optionally transform (broken in gun?)
- `.valAsync(cb, opt)`: async - value with meta