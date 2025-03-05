#!/usr/bin/env zx
const compressing = require('compressing')
const zx = require('zx/globals')
const fs = require('node:fs')
const path = require('path')

async function pack() {
    $.verbose = true;
    await $`webpack --config ./scripts/quicktvui-webpack.android.cjs`
    const cwd = process.cwd()
    const dist = path.join(cwd, './dist')
    const android = path.join(cwd, './dist/android')
    const pkgFile = path.join(cwd, './package.json')
    const packages = JSON.parse(fs.readFileSync(pkgFile, 'utf8'))
    const rpkPath = path.resolve(dist, encodeURIComponent(packages.name) + '.rpk')
    await compressing.zip.compressDir(android, rpkPath)
}

pack().catch((e) => {
    console.error(e)
})


