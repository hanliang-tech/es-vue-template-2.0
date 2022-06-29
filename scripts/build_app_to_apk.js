/* eslint-disable no-console */
const path = require('path');
const {
  cp,
  exec,
  test,
} = require('shelljs');

// Target demo project path
// if (!test('-d', DEMO_PATH)) {
//   console.log(`❌ Can not find demo project: ${example}`);
//   return;
// }
//替换成你的APK目录
const APK_ASSET_PATH='/Users/zhaopeng/Workspace/HuanTVProject/channel_zero_publish/app/src/main/assets/main/'


const execOptions = { stdio: 'inherit' };

console.log(`1/2 Start to build project `);
exec('npm run build-app', execOptions); // Build index js

console.log('2/2 Copy the built files to native');
cp('-Rf', './dist/android/*', APK_ASSET_PATH); // # Update the android project

console.log('👌 All done');
