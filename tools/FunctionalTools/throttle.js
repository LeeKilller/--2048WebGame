const throttle = (fun,delay = 500) => {
    let oldTime = Date.now();
    return (...args) => {
        const newTime = Date.now();
        if(newTime - oldTime > delay) {
            fun(...args);
            oldTime = newTime;
        }
    }
}

export default throttle;