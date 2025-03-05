#!/usr/bin/env zx
const zx = require('zx/globals')

async function build() {
    $.verbose = true
    await $`webpack --config ./scripts/quicktvui-webpack.android.cjs`
}

build().catch((e) => {
    console.error(e)
})


