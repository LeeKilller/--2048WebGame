import { gloablVar } from "../../scripts/global";


const throttle = (fun,delay = 200) => {
    let oldTime = Date.now();
    return (...args) => {
        //console.log(gloablVar);
        const newTime = Date.now();
        if(newTime - oldTime > delay && !gloablVar.hasItemMoved) {
            fun(...args);
            oldTime = newTime;
        }
    }
}

export default throttle;