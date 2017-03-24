## Changelog

### 0.7.8

- Added `context` option for more fine-control
- Renamed `deleteFromBucket` to `filterBucket`
- Added more options to `ctx`
- pass `ctx` to all internal functions so they are independent of internal scope
- fix `.value` chain method to work with Gun `0.6.x` and higher, by using: `Gun.obj.copy(val)`

### 0.7.7

- `mapReduce` has loads of more options to customize.
- introduced more Promise based API chain methods

### 0.7.0

First release
