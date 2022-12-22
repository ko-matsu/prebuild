const test = require('tape')
const exec = require('child_process').exec
const path = require('path')
const fs = require('fs')
const rm = require('rimraf')

const cwd = path.join(__dirname, 'native-module-napi-cmake')

// See https://github.com/cmake-js/cmake-js/issues/186
if (process.platform !== 'win32' || process.arch !== 'ia32') {
  test('can prebuild a cmake napi module for node', function (t) {
    rm.sync(path.join(cwd, 'prebuilds'))
    const file = 'native-v1.0.0-napi-v1-' + process.platform + '-' + process.arch + '.tar.gz'
    const prebuild = path.join(cwd, 'prebuilds', file)
    // A quick, temporary fix for a node.js bug (https://github.com/prebuild/prebuild/pull/208#issuecomment-361108755)
    console.log()
    exec('npm run prebuild', { cwd }, function (error, stdout, stderr) {
      t.equal(error, null)
      t.equal(fs.existsSync(prebuild), true)
      t.end()
    })
  })

  test('can prebuild a cmake napi module for node with prepack script', function (t) {
    rm.sync(path.join(cwd, 'prebuilds'))
    const file = 'native-v1.0.0-napi-v1-' + process.platform + '-' + process.arch + '.tar.gz'
    const prebuild = path.join(cwd, 'prebuilds', file)
    // A quick, temporary fix for a node.js bug (https://github.com/prebuild/prebuild/pull/208#issuecomment-361108755)
    console.log()
    exec('npm run prebuild-prepack', { cwd }, function (error, stdout, stderr) {
      t.equal(error, null)
      t.equal(fs.existsSync(prebuild), true)
      t.end()
    })
  })
}
