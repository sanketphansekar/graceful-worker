var { EventEmitter } = require('events');


let stopworker = false;

const events = {
    READY_TO_STOP: 'ready-to-stop'
}

const stopEventEmitter = new EventEmitter()

exports.start = async function start(items = []) {

    // Using for in because it simplifies use for async/await
    for (let item in items) {
        console.log(item)

        /*
        * Stop the worker when flag is set to true and emit an event that worker is stopped 
        * and you can stop the node process
        */
        if (stopworker) {
            console.log('Ready to stop, no more processing')
            stopEventEmitter.emit(events.READY_TO_STOP)
            return;
        }

        console.log('Processing new record', item)

        // For testing purpose it will take 5 second to process a single record
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('DONE: Processing record', item)
                resolve()
            }, 5 * 1000)
        })
    }
}

exports.stop = async function stop() {
    return new Promise((resolve, reject) => {
        stopEventEmitter.on(events.READY_TO_STOP, () => {
            resolve()
        })

        // Adding delay to set boolean to false to give enough time to apply above event handler
        setTimeout(() => {
            stopworker = true
        }, 1000)
    })
}
