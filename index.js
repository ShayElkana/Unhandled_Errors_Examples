'use strict'
if (process.pid) {
    console.log('This process is your pid ' + process.pid);
}

process.on('SIGTERM', signal => {
    console.log('process.on(SIGTERM) code: ' + signal)
    // process.abort()
    process.exit(100)
})

process.on('SIGINT', signal => {
    console.log('process.on(SIGINT) code: ' + signal)
    process.exit(1)
})

process.on('beforeExit', code => {
    console.log('[out] process.on(beforeExit) code: ' + code)
    setTimeout(() => {
        console.log('[in] process.on(beforeExit) code: ' + code)
        process.exit(200)
    }, 2000)
})

process.on('uncaughtException', err => {
    console.log('process.on(uncaughtException) error: ', err)
    process.exit(201)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('process.on(unhandledRejection) reason: ', reason, promise)
    process.exit(202)
})

process.on('exit', code => {
    console.log('process.on(exit) code: ' + code)
})

const errorFun = () => {
    throw new Error('myUncaughtException Error')
}

const errorPromise = () => {
    return new Promise((resolve, reject) => {
        reject('myPromiseRejection Error')
    })
}

let index = 0
console.log('start')

setInterval(() => {
    console.log((`tik ${index}`))
    index++
    // errorFun()
    // errorPromise()
}, 1000)

setTimeout(() => {
     console.log((`tik ${index}`))
}, 1000)