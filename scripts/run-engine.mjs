#!/usr/bin/env node
import path from 'path'
import fs from 'fs'
import util from 'util'
import {exec,execSync} from 'child_process'
import {chdir,cwd,argv} from 'process'
import assert from 'assert'
import readline from 'readline'
import {createGzip} from 'zlib'
import {pipeline} from 'stream'
import {parseProps,writeProps} from './libs/propertiesUtil.mjs'


const enginePathCustom = `${process.env.HOME}/Workspace/HuanProjects/Hippy4tv/examples/android-demo`
const enginePathRelative = '../Hippy4tv/examples/android-demo'
const appPathRelative = '../spark_android'
const appPathCustom = '../spark_android'
const androidHome = '/Users/zhaopeng/Workspace/Android/sdk'
console.log('------------------------------------------------------------------------')

const buildParams={
    //是否打包更新vue
    isBuildVue : false,
    //是否打包更新引擎
    isBuildEngine : true,
    //是否发布引擎
    isPublishEngine: false,
    //是否发布MavenLocal
    isMavenLocal: false,
    //是否打包更新APK
    isBuildAPk : true,
    //是否运行APK
    isRunAPK : true,
    //安卓打包的渠道
    channel:'General',
    //release还是debug
    release: true,
    //引擎版本
    engineVersionName:'0.20.1-SNAPSHOT'

}

argv.forEach((val, index) => {
    console.log(`args:${index}: ${val}`);
    if(index > 1){
        let eq = val.indexOf('=')
        if(val.indexOf('=') > -1){
            let key = val.substr(0,eq)
            let value = val.substr(eq+1,val.length - eq)
            switch (key){
                case 'release':
                    buildParams.release = (value === 'true')
                    break;
                case 'buildEngine':
                    buildParams.isBuildEngine = (value === 'true')
                    break;
                case 'channel':
                    buildParams.channel = value
                    break;
            }
        }
    }

});


console.log('\x1B[44m%s\x1B[0m',`Build Params :${JSON.stringify(buildParams)}`)
console.log('------------------------------------------------------------------------')
assert(sdkValid(),"请设置AndroidSDK环境变量")
const realEnginePath = checkEngine()
const apkPath = checkAPK();

process.env.ENV_RELEASE = buildParams.release ? 'true' : 'false'
console.log('\x1B[44m%s\x1B[0m',`环境变量 :${process.env.PATH}`)
console.log('\x1B[44m%s\x1B[0m',`JAVA_HOME :${process.env.JAVA_HOME}`)
console.log('\x1B[44m%s\x1B[0m',`AndroidSDK :${process.env.ANDROID_SDK_ROOT}`)
console.log('------------------------------------------------------------------------')


 buildVue()
 buildEngine()
if(!buildParams.isBuildEngine){
    buildAPK(buildParams.isRunAPK)
}


function buildVue(){
    if(buildParams.isBuildVue) {
        console.log('\x1B[44m%s\x1B[0m','###################BuildVue###################')
        console.log('workdir:' + process.cwd())
        try {
            fs.accessSync('/dist/android/vendor.js')
        } catch {
            execSync('npm run vendor')
        }
        let vb = exec(`npm run build-app`, (error, stdout, stderr) => {
            assert(!error, "VUE打包错误：" + error)
            // do_gzip('/dist/android','/dist/android.zip').catch((result)=>{
            //     console.log('do_gzip work done:'+result)
            // })
            //fs.copyFileSync(`/dist/android`,path.resolve(apkPath,'/app/src/main/assets'))
        })

        readline.createInterface({
            input: vb.stdout,
            output: process.stdout
        })
    }
}
 function buildEngine(){
    if(buildParams.isBuildEngine) {
        console.log('\x1B[44m%s\x1B[0m','###################BuildEngine###################')
        chdir(realEnginePath)
        //写gradle.properties
        let gradlePath = path.resolve(realEnginePath,'../../android/sdk/gradle.properties')
        console.log('_____________________ ConfigGradle _____________________')
        parseProps(gradlePath,(error,data)=>{
            if(buildParams.release){
                data.set('V8_RELEASE','x5-lite')
                // data.set('VERSION_CODE',2)
                data.set('VERSION_NAME',buildParams.engineVersionName)
            }else{
                if(data.has('V8_RELEASE')){
                    data.delete('V8_RELEASE')
                }
            }
            writeProps(data,gradlePath)
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~ ConfigGradle done ~~~~~~~~~~~~~~~~~~~~~~~~')
            let buff = exec(`./gradlew  android-sdk:build  --stacktrace`, (error, stdout, stderr) => {
                assert(!error, "引擎打包错误：" + error)
                console.log('------------------------------------------------------------------------')
                let engineLib = path.resolve('../../android/sdk/build/outputs/aar',buildParams.release ?  'android-sdk-release.aar' :'android-sdk-debug.aar').toString()
                console.log(`engineBuildPath:${engineLib}`)
                let aarName = buildParams.release ? 'hippy4tv_release.aar':'hippy4tv_debug.aar'
                fs.copyFileSync(engineLib, path.resolve(apkPath, './_libs',(buildParams.release? './release' : './debug'), aarName))
                if(buildParams.isPublishEngine){
                    console.log('\x1B[44m%s\x1B[0m','################### PublishMaven ###################')
                    let maven = buildParams.isMavenLocal ? ':android-sdk:publishMavenAarPublicationToMavenLocal' : ':android-sdk:publishAllPublicationsToMavenRepository'
                    execSync(`./gradlew  ${maven}`)
                    console.log('\x1B[44m%s\x1B[0m','~~~~~~~~~~~~~~~~~~~~~~~~ PublishMavenSuccess ~~~~~~~~~~~~~~~~~~~~~~~~')

                }
                console.log('\x1B[44m%s\x1B[0m','~~~~~~~~~~~~~~~~~~~~~~~~ BuildEngineSuccess ~~~~~~~~~~~~~~~~~~~~~~~~')
                buildAPK(buildParams.isRunAPK)
            })
            readline.createInterface({
                input: buff.stdout,
                output: process.stdout
            })

        })
    }
}

 function buildAPK(isRun){
    if(buildParams.isBuildAPk){
        console.log('\x1B[44m%s\x1B[0m','################### BuildAPK ###################')
        chdir(apkPath)
        let channel = buildParams.channel
        let release = buildParams.release;
        //app:clean
        let buildType = release ? 'Release' : 'Debug'
        let ab = exec(`./gradlew  app:assemble${channel}${buildType}  --stacktrace`,(error,stdout,stderr)=>{
            assert(!error,"APK打包错误："+error)
            let mid = `./${channel.toLowerCase()}/${buildType.toLowerCase()}`
            console.log('------------------------------------------------------------------------')
            let apk = path.resolve(apkPath,'./app/build/outputs/apk/',mid,'spark.apk')
            console.log(`buildAPK path:${apk} ,apkPath:${apkPath}`)
            console.log('\x1B[44m%s\x1B[0m','~~~~~~~~~~~~~~~~~~~~~~~~ BuildAPKSuccess ~~~~~~~~~~~~~~~~~~~~~~~~')
            if(isRun){
                installAPK(apk)
            }
            // fs.copyFileSync(engineLib,path.resolve(apkPath,'./_libs','hippy4tv.aar'))
        })
        readline.createInterface({
            input:ab.stdout,
            output:process.stdout
        })
    }
}

function installAPK(apk){
    console.log('\x1B[44m%s\x1B[0m','###################InstallAPK###################')
    exec(`adb install -r -t ${apk}`,(error,out)=>{
        assert(!error,`安装错误:\n${error}`)
        console.log(out)
        console.log('\x1B[44m%s\x1B[0m','~~~~~~~~~~~~~~~~~~~~~~~~InstallAPKSuccess~~~~~~~~~~~~~~~~~~~~~~~~')
        execSync(`adb shell am start -a tv.huan.spark.action.SPARK`)
    })
}



function sdkValid(){
    try{
        fs.accessSync(androidHome)
        process.env.ANDROID_SDK_ROOT = androidHome
        if(!process.env.JAVA_HOME){
            process.env.JAVA_HOME = '/Applications/Android Studio.app/Contents/jre/Contents/Home'
            console.log(`未指定JAVA_HOME,使用Android默认`)
        }
        return true
    }catch {
        return process.env.ANDROID_SDK_ROOT
    }

}

function checkEngine(){
    let realEnginePath ;
    try{
        fs.accessSync(enginePathCustom)
        realEnginePath = path.resolve(enginePathCustom)
    }catch{
        realEnginePath = path.resolve(enginePathRelative)
    }
    assert(realEnginePath,"未指定引擎目录")
    console.log('\x1B[44m%s\x1B[0m',`引擎目录 :${realEnginePath}`)
    return realEnginePath
}

function checkAPK(){
    let apkPath
    try{
        fs.accessSync(appPathCustom)
        apkPath = path.resolve(appPathCustom)
    }catch{
        apkPath = path.resolve(appPathRelative)
    }
    assert(apkPath,"未指定APK目录")
    console.log('\x1B[44m%s\x1B[0m',`APK目录 :${apkPath}`)
    return apkPath
}


async function do_gzip(input, output) {
    const gzip = createGzip();
    const source = fs.createReadStream(input);
    const destination = fs.createWriteStream(output);
    await pipeline(source, gzip, destination);
}
