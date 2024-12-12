import clickDown from "./clickDown.js";
import clickLeft from "./clickLeft.js";
import clickRight from "./clickRight.js";
import clickUp from "./clickUp.js";
import { throttle } from "@/tools/FunctionalTools";
import randomCreateItem from "../randomCreateItem.js";
import { gloablVar } from "../global.js";
import { stateMatrix } from "../AfterMounted.js"


export {
    clickDown,
    clickLeft,
    clickRight,
    clickUp
}

const keyUpHandler = throttle((e) => {
    // console.log(e.key);

    if(e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        clickUp(stateMatrix);
    }

    if(e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        clickDown(stateMatrix);
    }

    if(e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        clickLeft(stateMatrix);
    }

    if(e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        clickRight(stateMatrix);
    }

    Promise.all(gloablVar.animationQue).then(()=>{
        gloablVar.animationQue = [];
        if (gloablVar.hasItemMoved) {
            randomCreateItem(stateMatrix, keyUpHandler);
            gloablVar.hasItemMoved = false;
        }
    })

    // setTimeout(()=>{
    //     if(gloablVar.hasItemMoved) {
    //         randomCreateItem(stateMatrix,keyUpHandler);
    //         gloablVar.hasItemMoved = false;
    //     }
    //     // checkEnd(stateMatrix,keyUpHandler);
    //     // console.log(stateMatrix.map(ele=>ele.map(ele=>ele?ele.value:0)));
    // },300)
})

export default keyUpHandler;