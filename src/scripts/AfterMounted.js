import keyUpHandler from "./handleClick/index.js";
import initContainer from "./initContainer.js";
import {
    clickDown,
    clickLeft,
    clickRight,
    clickUp
} from "./handleClick/index.js";
import randomCreateItem from "./randomCreateItem.js";
import { gloablVar } from "./global.js";
import { throttle } from "@/tools/FunctionalTools/index.js";

export const stateMatrix = Array(4).fill(null).map(() => Array(4).fill(0));

const AfterMounted = () => {
    const restart = document.querySelector("#restart");
    const cover = document.querySelector(".main-cover");
    const tryAgain = document.querySelector(".main-cover button");

    document.querySelector('#best').innerText = Number(localStorage.getItem('bestScore')) || 0;

    tryAgain.addEventListener('click', () => {
        cover.style.display = 'none';
        initContainer(stateMatrix);
        document.addEventListener('keyup', keyUpHandler)
    })

    restart.addEventListener('click', () => {
        initContainer(stateMatrix);
        //console.log('click');
    })

    document.querySelector(".main-win button").addEventListener('click', () => {
        document.querySelector('.main-win').style.display = 'none';
        initContainer(stateMatrix);
        document.addEventListener('keyup', keyUpHandler);
    })

    initContainer(stateMatrix);

    // const keyUpHandler = throttle((e) => {
    //     // console.log(e.key);

    //     if(e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
    //         clickUp(stateMatrix);
    //     }

    //     if(e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
    //         clickDown(stateMatrix);
    //     }

    //     if(e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
    //         clickLeft(stateMatrix);
    //     }

    //     if(e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
    //         clickRight(stateMatrix);
    //     }

    //     setTimeout(()=>{
    //         if(gloablVar.hasItemMoved) {
    //             randomCreateItem(stateMatrix,keyUpHandler);
    //             gloablVar.hasItemMoved = false;
    //         }
    //         // checkEnd(stateMatrix,keyUpHandler);
    //         // console.log(stateMatrix.map(ele=>ele.map(ele=>ele?ele.value:0)));
    //     },300)
    // })


    document.addEventListener('keyup', keyUpHandler)

    let startX, startY;

    const container = document.querySelector('#main-real-container');

    container.addEventListener('touchstart', (e) => {
        //console.log(e.touches[0]);
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    })

    container.addEventListener('touchend', throttle((e) => {
        //console.log('end', e.changedTouches[0]);
        const endX = e.changedTouches[0]?.pageX;
        const endY = e.changedTouches[0]?.pageY;
        const distanceX = endX - startX;
        const distanceY = endY - startY;
        if (startX != null) {
            if (Math.abs(distanceX) > Math.abs(distanceY)) {
                if (distanceX > 0) {
                    clickRight(stateMatrix);
                } else {
                    clickLeft(stateMatrix);
                }
            } else {
                if (distanceY > 0) {
                    clickDown(stateMatrix);
                } else {
                    clickUp(stateMatrix);
                }
            }

            setTimeout(() => {
                if (gloablVar.hasItemMoved) {
                    randomCreateItem(stateMatrix, keyUpHandler);
                    gloablVar.hasItemMoved = false;
                }
                // checkEnd(stateMatrix,keyUpHandler);
                // console.log(stateMatrix.map(ele=>ele.map(ele=>ele?ele.value:0)));
            }, 100)

        }
    }));

    container.addEventListener('touchmove',(e) => {
        e.preventDefault();
    })

    /**
     * 使用数组存放节点及其数值信息
     * 0 0 2 4
     * 4 8 2 0
     * 2 0 2 0
     * 0 0 0 0
     * 逻辑上，先合并，再移动要好处理的多。
     * 一样的，分生命周期：触发->动画->停止
     * 关键是移动到什么地方，是否发生合并逻辑
     * 方块行为：纯移动、不移动但合并，移动被合并，移动且合并。
     * 需要注意的是，移动同时触发。上一个方块移至重合后，再发生合并逻辑，意思就是合并由被合并方块触发，但是动画却发生在合并方块上
     * 自底向上遍历，保存一个moveTarget，遇到一个非零元素则向上搜寻是否包含能够合并的元素
     * 若没有，则将他移动到moveTarget，并将moveTarget+1
     * 若有，则将它移动到moveTarget，同时将可合并元素移动到moveTarget，并触发合并动画，并将moveTarget+1
     * 从能够合并元素后继续遍历
     */

}

export default AfterMounted;