const test = require('tape')
const exec = require('child_process').exec
const path = require('path')
const fs = require('fs')
const rm = require('rimraf')

const cwd = path.join(__dirname, 'native-module-cmake')

// See https://github.com/cmake-js/cmake-js/issues/186
if (process.platform !== 'win32' || process.arch !== 'ia32') {
  test('can prebuild a cmake-js native module for node', function (t) {
    rm.sync(path.join(cwd, 'prebuilds'))
    const file = 'native-v1.0.0-node-v83-' + process.platform + '-' + process.arch + '.tar.gz'
    const prebuild = path.join(cwd, 'prebuilds', file)
    // A quick, temporary fix for a node.js bug (https://github.com/prebuild/prebuild/pull/208#issuecomment-361108755)
    console.log()
    exec('npm run prebuild', { cwd }, function (error, stdout, stderr) {
      t.equal(error, null)
      t.equal(fs.existsSync(prebuild), true)
      t.end()
    })
  })

  test('can prebuild a cmake-js native module for electron', function (t) {
    rm.sync(path.join(cwd, 'prebuilds'))
    const file = 'native-v1.0.0-electron-v89-' + process.platform + '-' + process.arch + '.tar.gz'
    const prebuild = path.join(cwd, 'prebuilds', file)
    // A quick, temporary fix for a node.js bug (https://github.com/prebuild/prebuild/pull/208#issuecomment-361108755)
    console.log()
    exec('npm run prebuild-electron', { cwd }, function (error, stdout, stderr) {
      t.equal(error, null)
      t.equal(fs.existsSync(prebuild), true)
      t.end()
    })
  })
}
