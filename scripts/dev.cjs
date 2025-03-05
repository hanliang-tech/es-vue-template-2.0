#!/usr/bin/env zx
const zx = require('zx/globals')

async function dev() {
    $.verbose = true;
    await $`hippy-dev -c ./scripts/quicktvui-webpack.dev.cjs`
}

dev().catch((e) => {
    console.error(e)
})


