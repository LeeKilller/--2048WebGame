const cache = new Map();


const run = (fun, ...args) => {
    if(fun === undefined) {
        const oldFun = cache.get('oldFun');
        const oldArgs = cache.get('oldArgs');
        oldFun(...oldArgs);
        return;
    }

    cache.set('oldFun',fun);
    cache.set('oldArgs',args);

    try {
        fun(...args);
    } catch (err) {
        if (err instanceof Promise) {
            err.then((res) => {
                // console.log(res);
                fun(...args);
            }).catch((err) => {
                try {
                    fun(...args);
                } catch (err2) {
                    run(fun, ...args);
                }
            })
        } else {
            console.error(err);
        }
    }

}

export default run;