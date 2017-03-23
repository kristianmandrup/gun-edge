import Gun from 'gun/gun'
import test from 'ava'

const gun = Gun();

test('keys', t => {
  var data = gun.get('data').put({
    violet: true,
    green: false
  })
  console.log('data', data)

  data.map().on(msg => {
    console.log(Object.keys(msg))
  })
})